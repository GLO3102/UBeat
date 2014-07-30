var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    name: String
});

userSchema.method('toJSON', function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

var User = mongoose.model('User', userSchema);

module.exports = User;