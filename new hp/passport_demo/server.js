/**
 * server.js
 * purpose: passport authentication demo main file
 * createdAt: 06/01/2017 7:52 PM
 * Author: Hardik Patel
 */

/**
 * inject require package's
 */

const express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    configAuth = require('./passportConfig/auth'),
    { User } = require('./../models/user'),
    { config } = require('../utils/config'),
    mongoose = require('mongoose'),
    app = express();

/* mongoose connection */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

app.use(passport.initialize());
app.use(passport.session());



// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id)
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// code for google(use('google',new GoogleStrategy ))
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
}, (token, refreshToken, profile, done) => {

    // make asyncronous process
    // User.findOne won't fire untile we have all data back from google
    process.nextTick(() => {

        // find user base on their google id
        User.findOne({ 'google.id': profile.id }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {

                // if the user isnt in our database, create a new user
                let newUser = new User();

                // set all of the relevant inforamtion
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.name = profile.email[0].value; // pull the first email

                // save the user
                newUser.google.email = profile.email[0].value; // pull the first email

                // save the user
                newUser.save((err) => {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });
}));


app.get('/hello', (req, res) => {
    res.send(`hello user ${config.port}`);
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/profile', failurRedirect: '/' }));
app.get('/profile', (req, res) => {
    res.send('thay gyu');
})
app.get('/', (req, res) => {
    res.send('raigyu bhai');
})
app.listen(config.port, () => { console.log(`server listen on port ${config.port}`) });