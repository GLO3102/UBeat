var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var modelHelpers = require('./modelHelpers.js');
var _ = require('underscore');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String,
    expiration: Number,
    following: [userSchema]
});

userSchema.methods.toDTO = function (following) {
    var obj = this.toObject();

    var dto = {
        id: obj._id,
        name: obj.name,
        email: obj.email
    };

    if (following) {
        dto.following = obj.following;
    }

    return dto;
};

userSchema.methods.isFollowingUser = function (userId) {
    for (var i = 0; i < this.following.length; i++) {
        if (this.following[i].id == userId) {
            return true;
        }
    }
    return false;
};

userSchema.methods.unfollow = function (userId) {
    this.following = _.without(this.following, _.findWhere(this.following, {
        id: userId
    }));
};

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.method('toJSON', modelHelpers.toJSON);

var User = mongoose.model('User', userSchema);

exports.schema = userSchema;
exports.model = User;