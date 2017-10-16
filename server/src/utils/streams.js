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


//inputOutput(__dirname + '/streams.js');


// const argv = minimist(process.argv);

// function doAction(argv) {
//     if (argv.action) {

//     }
// }
