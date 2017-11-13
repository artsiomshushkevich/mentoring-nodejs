'use strict';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import mockedUsers from '../mocks/users';
import {default as _} from 'lodash';

const config = require('./config.json');

passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = _.find(mockedUsers, {username, password});

        if (user) {
            return done(null, {displayName: user.username, provider: 'local'});
        }

        return done(null, false, {message: 'invalid credentials'});
    }
));

passport.use(new TwitterStrategy({
        consumerKey: config.twitterAuth.consumerKey,
        consumerSecret: config.twitterAuth.consumerSecret,
        callbackURL: config.twitterAuth.callbackURL
    },
    (token, tokenSecret, profile, done) => {
        return done(null, profile);
    }
));

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
  }
));

passport.use(new GoogleStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
  }
));

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL,
    scope: ['profile']
  },
  (accessToken, refreshToken, profile, done) => {  
      return done(null, profile);
  }
));

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((obj, callback) => {
    callback(null, obj);
});

export default passport;
