const minimist = require('minimist');
const through = require('through2');
const request = require('request');
const fs = require('fs');
const csv = require('csv');
const promisify = require('util.promisify');
const readdirAsync = promisify(fs.readdir);
const mergeStream = require('merge-stream');

const ACTIONS = {
    IO: 'io'
};

function inputOutput(filePath) {
    let reader = fs.createReadStream(filePath);
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
    let reader = fs.createReadStream(filePath);
    let isFirstRaw = true;
    let jsonFilePath = filePath.replace('.csv', '.json');
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
    const BUNDLE_NAME = 'bundle.css';
    const EXTERNAL_CSS_URL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

    readdirAsync(dirPath)
        .then((files) => {
            const cssFiles = files.filter(file => file.indexOf('.css') !== -1);
            const writer = fs.createWriteStream(dirPath + BUNDLE_NAME);

            let mergedStreams;
            cssFiles.forEach((file) => {
                const reader = fs.createReadStream(dirPath + file);

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

cssBundler(__dirname + '/temp/');
//transformFile(__dirname + '/MOCK_DATA.csv', true)

//transform();
//inputOutput(__dirname + '/streams.js');


// const argv = minimist(process.argv);

// function doAction(argv) {
//     if (argv.action) {

//     }
// }
