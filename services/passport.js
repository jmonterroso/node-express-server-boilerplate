const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};
//Create JWT strategy

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
//    see if th user id in the payload exists in our database
    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            //    if it does, call 'done' with that other
            done(null, user);
        } else {
            //    otherwise, call done without the user object
            done(null, false);
        }
    })
});

//tell passport to use this strategy
passport.use(jwtLogin);