var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var modelHelpers = require('./modelHelpers.js');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String,
    expiration: Number
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.token;
    delete obj.password;
    delete obj.expiration;

    return obj;
};
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

exports.schema = userSchema;
exports.model = User;