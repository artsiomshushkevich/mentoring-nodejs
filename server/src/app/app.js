'use strict';

import express from 'express';
import routers from './routers';
import bodyParser from 'body-parser';
import passport from './config/passport';
import {default as expressSession} from 'express-session';
import path from 'path';
import mongoose from 'mongoose';

const config = require('./config/config.json');


const app = express();

mongoose.connect(config.mongodbUrl);
mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: config.secretSessionWord, 
    resave: true, 
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', routers.authRouter)
app.use('/api/products', routers.productsRouter);
app.use('/api/users', routers.usersRouter);

app.get('/', function (req, res) {
    res.render('auth', {user: req.user});
});

app.get('/error', function (req, res) {
    res.render('error');
});

export default app;