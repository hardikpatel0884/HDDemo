/**
 * localPassport.js
 * use to authenticate user locally
 * */
const express = require('express'), /* express */
    passport = require('passport'), /* passport */
    mongoose = require('mongoose'), /* mongoose */
    GoogleStrategy=require('passport-google-oauth').OAuth2Strategy, /* passport-local */
    configAuth = require('./passportConfig/auth'),
    { config } = require('../utils/config'), /* local configuration's */
    bodyParser=require('body-parser'), /* body-parser to parse request body */
    {User}=require('./../models/user'), /* user model */
    app = express();

/* mongoose connection */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// serialize user object
passport.serializeUser((user, done) => {
    done(null, user);
});

// deserialize user object
passport.deserializeUser((user, done) => {
    done(null, user);
});

// add body parser
app.use(bodyParser.json());

passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
    }, (accessToken, refreshToken, profile, done)=> {
        User.findOrCreate({ googleId: profile.id },(err, user)=> {
            console.log(user)
            return done(err, user);
        });
    }
));


app.get('/auth/login/google',passport.authenticate('google', { successRedirect: '/profile', failurRedirect: '/' }));

app.get('/profile',(req,res)=>{
    res.status(200).send("login success").end();
})

app.get('/',(req,res)=>{
    res.status(401).send("un authorise user").end();
})

/** start server on specific port */
app.listen(config.port, () => { console.log(`app reun on port ${config.port}`) })