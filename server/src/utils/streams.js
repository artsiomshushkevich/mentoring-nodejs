const minimist = require('minimist');
const through = require('through2');
const request = require('request');
const fs = require('fs');
//const path = require('path');
const csv = require('csv');

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



transformFile(__dirname + '/MOCK_DATA.csv', true)

//transform();
//inputOutput(__dirname + '/streams.js');


// const argv = minimist(process.argv);

// function doAction(argv) {
//     if (argv.action) {

//     }
// }
