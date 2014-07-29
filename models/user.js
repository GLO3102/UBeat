var userSchema = Schema({
    email: String,
    name: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;