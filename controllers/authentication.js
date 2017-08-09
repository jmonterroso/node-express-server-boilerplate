const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function (req, res, next) {
    //see if a user with the given email exists
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }
    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        //if a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }
        //if a user with email does not exist, create and save user record
        //saved in memory
        const user = new User({
            email: email,
            password: password
        });

        //save the record to the database, it's async
        user.save(function (err) {
            if (err) {
                return next(err)
            }

            //respond to request indicating the user was created
            res.json({token: tokenForUser(user)});
        });

    });

    console.log(req.body, 'req.body '); //deleteinbuild


};

exports.signin = function (req, res, next) {
//        User has already had their email and password auth'd
//    we just need to give them a token
    console.log(req.user, 'req.user '); //deleteinbuild
    res.send({token: tokenForUser(req.user)})


};