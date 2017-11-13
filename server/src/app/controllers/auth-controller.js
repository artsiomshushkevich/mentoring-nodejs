import {default as jwt} from 'jsonwebtoken';
import {default as _} from 'lodash';
import mockedUsers from '../mocks/users';

const config = require ('../config/conig.json');

export default class AuthController {
    authenticateViaCustomStrategy(req, res) {
        const searchEntry = {
            username: req.body.username
        };
    
        const user = _.find(mockedUsers, searchEntry);
    
        if (user) {
            const token = jwt.sign({username: user.username, id: user.id}, config.secretWord);
    
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
            res.status(403).json({message: 'User with such credentials has not found!'})
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