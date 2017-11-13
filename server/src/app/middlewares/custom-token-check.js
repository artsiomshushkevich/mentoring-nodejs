import {default as jwt} from 'jsonwebtoken';
const config = require('../config/conig.json');

export default function(req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, config.SECRET_WORD, (err, payload) => {
            if (err) {
                res.sendStatus(500);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};