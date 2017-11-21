'use strict';

import User from '../models/user';

export default class UsersController {
    async getAll(req, res) {
        const users = await User.find({});
        res.json(users);        
    }

    async removeOne(req, res) {
        const userId = req.params.id;
        const result = await User.remove({_id: userId});

        res.json({message: 'user successfully deleted'});
    }

    

}