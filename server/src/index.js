'use strict';

const config = require('../config/config.json');
import models from './models';

console.log(config.name);

let user = new models.User();
let product = new models.Product();