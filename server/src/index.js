'use strict';

const config = require('../config/config.json');
import * as models from './models';

console.log(config.name);

let user = new models.User();
let product = new models.Product();



