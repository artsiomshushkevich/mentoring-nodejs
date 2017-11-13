import express from 'express';
import routers from './routers';
import bodyParser from 'body-parser';
import passport from './config/passport';
import {default as expressSession} from 'express-session';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: "qwertyu123", 
    resave: true, 
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// app.post('/api/auth/local', passport.authenticate('local', {session: false}), function(req, res) {
//     res.sendStatus(200);
// });
app.use('/api/auth', routers.authRouter)
app.use('/api/products', routers.productsRouter);
app.use('/api/users', routers.usersRouter);

app.get('/', function (req, res) {
    res.render('auth', {user: req.user});
});

export default app;