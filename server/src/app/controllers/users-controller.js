'use strict';

import User from '../models/user';

export default class UsersController {
    async getAll(req, res) {
        const users = await User.find({});
        res.json(users);        
    }
}