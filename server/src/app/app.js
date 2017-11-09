import express from 'express';
import routers from './routers';
import bodyParser from 'body-parser';
import customCookieParser from './middlewares/custom-cookie-parser';
import customQueryParser from './middlewares/custom-query-parser';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {default as jwt} from 'jsonwebtoken';
import mockedUsers from './mocks/users';
import {default as _} from 'lodash';

const config = require('./config/conig.json');

const app = express();

app.use(customCookieParser);
app.use(customQueryParser);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/api/auth', function (req, res) {
    const searchObject = {
        username: req.body.username,
        password: req.body.password
    };

    const user = _.find(mockedUsers, searchObject);

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
        res.sendStatus(403)
    }
});

// app.use(passport.initialize());

// passport.use(new LocalStrategy({
//     function(username, password, done) {
//         const hardcodedUsername = 'admin';
//         const hardcodedpassword = '12345678';

//         if (username === hardcodedUsername && password === hardcodedPassword) {
//             return done(null, {username: hardcodedUsername, password: hardcodedPassword });
//         } 

//         return done(null, false, {mesasge: 'you are one the wrong side'});
//     }
// }))

// app.post('/auth', passport.authenticate('local'), function(req, res) {

// });

app.use('/api/products', routers.productsRouter);
app.use('/api/users/', routers.usersRouter);

export default app;