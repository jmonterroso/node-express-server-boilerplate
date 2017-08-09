const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model

const UserSchema = new Schema({
    //reference to js type String
    email: {type: String, unique: true, lowercase: true, required: true},
    password: String
});

//on save hook, encrypt password
//before saving a model, run this function
UserSchema.pre('save', function (next) {
    const user = this;
    //generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        //hash the password using the salt
        bcrypt.hash(user.password, salt, null,
            function (err, hash) {
                if (err) {
                    return next(err);
                }
                //overwrite the plain password and add the encrypted
                user.password = hash;
                next();
            }
        )
    })
});

//create the model class

const ModelClass = mongoose.model('user', UserSchema);

// export the model
module.exports = ModelClass;