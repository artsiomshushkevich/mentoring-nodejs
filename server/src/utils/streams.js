const minimist = require('minimist');
const through = require('through2');
const request = require('request');
const fs = require('fs');
const path = require('path');

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

    process.stdin.pipe(through(transformCallback)).pipe(process.stdout);
}


//transform();
//inputOutput(__dirname + '/streams.js');


// const argv = minimist(process.argv);

// function doAction(argv) {
//     if (argv.action) {

//     }
// }
