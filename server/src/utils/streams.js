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

function transformFile(filePath) {
    let reader = fs.createReadStream(filePath);
    let isFirstRaw = true;

    let transformCallback = function(chunk, encoding, callback) {
        if (!isFirstRaw) {
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
        .pipe(process.stdout);
    
}

transformFile(__dirname + '/MOCK_DATA.csv')

//transform();
//inputOutput(__dirname + '/streams.js');


// const argv = minimist(process.argv);

// function doAction(argv) {
//     if (argv.action) {

//     }
// }
