'use strict';

import {default as jwt} from 'jsonwebtoken';
import {User} from '../database/models';

const config = require ('../config/config.json');

export default class AuthController {
    async authenticateViaCustomStrategy(req, res) {
        const searchEntry = {
            username: req.body.username,
            password: req.body.password
        };
    
        const user = await User.find(searchEntry);
    
        if (user) {
            const token = jwt.sign({username: user.username, id: user.id}, config.secretJWTWord);
    
            res.status(200).json({
                data: {
                    user: {
                        email: user.email,
                        username: user.username
                    }
                },
                token: token
            });
        } else {
            res.status(403).json({message: 'User with such credentials has not found!'});
        }
    }

    authenticateViaLocalStrategy(req, res) {
        res.redirect('/');
    }
    
    authenticateViaFacebookStrategy(req, res) {
        res.redirect('/');
    }

    authenticateViaGoogleStrategy(req, res) {
        res.redirect('/');
    }

    authenticateViaTwitterStrategy(req, res) {
        res.redirect('/');
    }
}