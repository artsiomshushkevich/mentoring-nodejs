'use strict';

import {User} from '../database/models/';

// const user = new User();

export default class UsersController {
    getAll(req, res) {
        User.findAll()
            .then((users) => res.json(users));
        //res.json(user.getAll());        
    }
}