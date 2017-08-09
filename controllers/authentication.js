var User = require('../models/user');

exports.signup = function (req, res, next) {
    //see if a user with the given email exists
    const email = req.body.email;
    const password = req.body.password;
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
            res.json({success: true});
        });

    });

    console.log(req.body, 'req.body '); //deleteinbuild


}