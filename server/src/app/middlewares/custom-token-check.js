import {default as jwt} from 'jsonwebtoken';

const config = require('../config/conig.json');

export default function(req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, config.secretWord, (err, payload) => {
            if (err) {
               return res.status(500).json({message: 'Invalid authorization token!'});
            }

            next();
        });
    } else {
        res.status(401).json({message: 'Unauthorized access!'});
    }
};