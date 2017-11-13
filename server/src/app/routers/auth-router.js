'use strict';

import express from 'express';
import AuthController from '../controllers/auth-controller';
import passport from '../config/passport';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/', authController.authenticateViaCustomStrategy);

authRouter.post('/local', passport.authenticate('local',{
    failureRedirect: '/error'
}), authController.authenticateViaLocalStrategy);

authRouter.get('/google', passport.authenticate('google', {scope: ['profile']}));
authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/error'
}), authController.authenticateViaGoogleStrategy);

authRouter.get('/facebook', passport.authenticate('facebook'));
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/error',
}), authController.authenticateViaFacebookStrategy);

authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/error',
}), authController.authenticateViaTwitterStrategy);

export default authRouter;