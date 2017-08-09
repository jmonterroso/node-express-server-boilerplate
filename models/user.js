const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model

const UserSchema = new Schema({
    //reference to js type String
    email: {type: String, unique: true, lowercase: true},
    password: String
});
//create the model class

const ModelClass = mongoose.model('user', UserSchema);

// export the model
module.exports = ModelClass;