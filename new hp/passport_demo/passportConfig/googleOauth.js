/**
 * googleOauth.js
 * Google authentication configuration file
 * use GoogleStrategy within passport, Strategies require a `verify` function
 * wich accept credentials(in this case, a token, tokenSecret, and Google profile)
 * and invoke a callback with user object
 * CreatedAt: 06/01/2018 8:05 PM
 * Author: Hardik Patel
 */

/**
 * load all things we need
 */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    { User } = require('./../../models/user'), // load up user module
    configAuth = require('./auth'),
    mongoose = require('mongoose');

module.exports = (passport) => {

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
}