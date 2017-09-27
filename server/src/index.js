'use strict';

const config = require('../config/config.json');
import models from './models';
import Importer from './importer';

//HW1
console.log(config.name);

let user = new models.User();
let product = new models.Product();

//HW2
let path = __dirname + '/data/';
let delay = 5000;

let importer = new Importer();

importer.dirWatcher
    .watch(path, delay)
    .on('dirwatcher:changed', () => {

  // console.log(importer.importSync(path));

    importer.import(path)
        .then((filesAsJson) => {
            console.log(filesAsJson);
        });
});

