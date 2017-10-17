const minimist = require('minimist');
const through = require('through2');
const request = require('request');
const fs = require('fs');
const csv = require('csv');
const mergeStream = require('merge-stream');
const path = require('path');
const promisify = require('util.promisify');

const readdirAsync = promisify(fs.readdir);

function inputOutput(filePath) {
    if (!filePath) {
        throw Error('ERROR! File path is not specified!'); 
        return;
    }

    let processedFilePath = path.resolve(filePath);
    let reader = fs.createReadStream(processedFilePath);
    reader.pipe(process.stdout);
}

function transform() {
    let transformCallback = function(chunk, encoding, callback) {
        let transformedChunk = chunk.map(charCode => String.fromCharCode(charCode).toUpperCase().charCodeAt(0));
        callback(null, transformedChunk);
    };

    process.stdin
        .pipe(through(transformCallback))
        .pipe(process.stdout);
}

function transformFile(filePath, shouldSave) {
    if (!filePath) {
        throw Error('ERROR! File path is not specified!'); 
        return;
    }

    if (filePath.indexOf('.csv') === -1) {
        throw Error('ERROR! Specified file path does not refer to csv-file');
        return;
    }

    let processedFilePath = path.resolve(filePath);
    let reader = fs.createReadStream(processedFilePath);
    let isFirstRaw = true;
    let jsonFilePath = processedFilePath.replace('.csv', '.json');
    let destinationStream = shouldSave ? fs.createWriteStream(jsonFilePath) : process.stdout;

    let transformCallback = function(chunk, encoding, callback) {
        if (isFirstRaw) {
            callback(null, '[' + JSON.stringify(chunk));
            isFirstRaw = false;
        } else {
            callback(null, ',' + JSON.stringify(chunk));
        }  
    };

    let flushCallback = function(callback) {
        callback(null, ']');
    };

    reader
        .pipe(csv.parse())
        .pipe(through.obj(transformCallback, flushCallback))
        .pipe(destinationStream);
}

function cssBundler(dirPath) {
    if (!dirPath) {
        throw Error('path is not specified');
        return;
    }

    const BUNDLE_NAME = 'bundle.css';
    const EXTERNAL_CSS_URL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
    const processedDirPath = path.resolve(dirPath);

    readdirAsync(processedDirPath)
        .then((files) => {
            const cssFiles = files.filter(file => file.indexOf('.css') !== -1);
            const writer = fs.createWriteStream(processedDirPath + '/' + BUNDLE_NAME);

            let mergedStreams;
            cssFiles.forEach((file) => {
                const reader = fs.createReadStream(processedDirPath + '/' + file);

                if (mergedStreams) {
                    mergedStreams.add(reader)
                } else {
                    mergedStreams = mergeStream(reader);
                }
            });
            
            mergedStreams.add(request(EXTERNAL_CSS_URL));
            mergedStreams.pipe(writer);
        });
}

function printHelpMessage() {
    console.log(`
Available options:
    1. --action (-a) - type of action which should be invoked.
        Available values:
            1. io - sends data from file to process.stdout;
            2. transform - gets data from process.stdin, converts to upper-case and sends process.stdout;
            3. transform-file - gets data from .csv file and transforms it to .json.
            4. bundle-css - merges all css-files from dircetory into one
    2. --help (-h) - help information
    `);
}

function doAction(params) {
    const actions = {
        IO: 'io',
        TRANSFORM: 'transform',
        TRANSFORM_FILE: 'transform-file',
        BUNDLE_CSS: 'bundle-css',
    };

    switch (params.action) {
        case actions.IO: 
            inputOutput(params.file);
            break;
        case actions.TRANSFORM:
            transform();
            break;
        case actions.TRANSFORM_FILE: 
            transformFile(params.file, params.shouldSave);
            break;
        case actions.BUNDLE_CSS:
            cssBundler(params.path);
            break;
        default:
            printHelpMessage();
    }
}

function processInput(argv) {
    if (argv.help || argv.h) {
        printHelpMessage();
    } else if (argv.action) {
        let paramsObj = {
            action: argv.action,
            file: argv.file,
            path: argv.path,
            shouldSave: argv.shouldSave
        };

        doAction(paramsObj);
    } else {
        console.log('wrong input');
        printHelpMessage();
    }
}

if (require.main === module) {
    let argv = minimist(process.argv.slice(2), {
        alias: {
            'action': 'a',
            'help': 'h',
            'file': 'f',
            'path': 'p',
            'shouldSave': 's'
        }
    });
    
    processInput(argv);
} else {
    module.exports = processInput;
}

