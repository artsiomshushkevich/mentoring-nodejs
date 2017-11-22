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

    async addOne(req, res) {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        try {
            var newUserModel = new User(newUser);
            const result = await newUserModel.save();
    
            res.json({message: 'user successfully created'});
        } catch(err) {
            res.status(500).json(err);
        }

    }
}