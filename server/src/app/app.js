import express from 'express';
import routers from './routers';
import bodyParser from 'body-parser';
import passport from './config/passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {default as jwt} from 'jsonwebtoken';
import mockedUsers from './mocks/users';
import {default as _} from 'lodash';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {default as expressSession} from 'express-session';
import path from 'path';

passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = _.find(mockedUsers, {username, password});

        if (user) {
            return done(null, user);
        }

        return done(null, false, {message: 'you are one the wrong side'});
    }
));

const config = require('./config/conig.json');

const app = express();

// app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressSession({secret: "asdasdasdadas", resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/api/auth/local', passport.authenticate('local', {session: false}), function(req, res) {
    res.sendStatus(200);
});



app.get('/api/auth/google', 
passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback', passport.authenticate('google'), function(req, res) {
    res.redirect('/')
});


app.get('/api/auth/facebook', passport.authenticate('facebook'));

app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/error',
}), function(req, res) {
    res.redirect('/')
});


app.get('/api/auth/twitter', passport.authenticate('twitter'));

app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/error',
}),function(req, res) {
    res.redirect('/')
});


app.use('/api/products', routers.productsRouter);
app.use('/api/users/', routers.usersRouter);


app.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

export default app;