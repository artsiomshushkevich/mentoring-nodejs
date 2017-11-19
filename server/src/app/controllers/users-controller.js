'use strict';

import {User} from '../database/models/';

export default class UsersController {
    async getAll(req, res) {
        const users = await User.findAll();
        res.json(users);
    }  
}