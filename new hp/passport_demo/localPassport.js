/**
 * localPassport.js
 * use to authenticate user locally
 * */
const express = require('express'), /* express */
    passport = require('passport'), /* passport */
    mongoose = require('mongoose'), /* mongoose */
    LocalStrategy = require('passport-local').Strategy, /* passport-local */
    {config} = require('../utils/config'), /* local configuration's */
    bodyParser = require('body-parser'), /* body-parser to parse request body */
    {User} = require('./../models/user'), /* user model */
    bcrypt = require('bcryptjs'),
    app = express(),
    path = require('path'),
    fs = require('fs');

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

// inject body parser in application request
app.use(bodyParser.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extend: true}));
app.set('view_engine', 'hbs'); // adding view engine
const views = path.join(__dirname + '/../views/'); // define path to the view directory

// configure authentication
passport.use(new LocalStrategy((username, password, done) => {
    // find user base on their email(username)
    User.findOne({'email': username}, (err, user) => {

        // check for any error
        if (err) {
            return done(err);
            /*returning error*/
        }

        // check for not error and no user
        if (!user) {
            console.log('no user found');
            return done(null, false);
        }

        // check for valid user
        /*if (user.password !== password) {
            console.log('password do not match',);
            return done(null, false);
        }*/
        if (!bcrypt.compare(password, user.password)) {
            console.log('password do not match');
            return done(null, false);
        }

        // finally return valid user
        return done(null, user);
    });
}));


/**
 * GET /login
 * to render login page(UI) to the user
 * */
app.get('/login', (req, res) => {
    res.sendFile(views + "login.html");
});

/** start authentication login
 * POST /auth/login
 * @param {String} username email address of user
 * @param {String} password password of user
 * */
app.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/done', /* redirect when user successfully authenticated */
    faiurRedirect: '/fail', /* redirect when fail to authenticate */
}));

/**
 * when user authentication success
 * GET /done
 * */
app.get('/done', (req, res) => {
    console.log(req.user);
    res.sendFile(views + "profile.html");
    //res.status(200).send("success").end();
});

/**
 * when user authentication fail
 * GET /fail
 * */
app.get('/fail', (req, res) => {
    res.status(401).send('something wrong').end();
});

/**
 * check available user list in database
 * GET /users
 * @return {Collection} users collection
 * */
app.get('/users', (req, res) => {

    User.find().then((todos) => {
        res.status(200).send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

/**
 * check user base on their email
 * GET /at/{email}
 * @param {String} email email of user
 * @return {Object} user object
 * */
app.get('/at/:email', (req, res) => {
    findMyUser(req.params.email, (err, user) => {
        if (err) {
            res.send(err).end()
        }
        res.send(user);
    });
});

app.post('/hash', (req, res) => {
    let string = req.body.string;
    // async process
    /*bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(string,salt,(err,hash)=>{
            res.status(200)
                .header('hp_Key',hash)
                .send('work done')
                .end();
        });
    });*/

    //sync process
    let hash = bcrypt.hashSync(Date.now().toString(), bcrypt.genSaltSync(10));
    res.status(200)
        .header('hp_Key', hash)
        .send('work done')
        .end();
    // res.send('somthing wrong');
});

/**
 * Temp testing
 * */
app.get('/temp', (req, res) => {
    //let name = req.body.name;
    //getHasing(name, (respo) => {
    //    res.send("Your hashing string is " + respo).end();
    //});

    console.log(req)
    res.send(JSON.parse(
        req));
});

/**
 * getHasing
 * genrate hash value of given string
 * @param {String} text plane text
 * @callback {String} response send back hashing value of text
 * @callback {Boolean} response comparision of plane text and hashing value
 * */
getHasing = (text, response) => {
    var salt = bcrypt.genSaltSync(10);
    var hashString = bcrypt.hashSync(text, salt);

    bcrypt.compare(text, hashString, (err, rsp) => {
        console.log("compare " + rsp)
        response(rsp);
    })

};

/** start server on specific port */
app.listen(config.port, () => {
    console.log(`app reun on port ${config.port}`)
})