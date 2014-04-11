var gravatar = require('gravatar');

exports.account = function (req, res) {
    var email = req.user.emails[0].value;

    var data = {
        user: {
            name: req.user.displayName,
            email: email,
            gravatar: gravatar.url(email, null, false)
        }
    };

    res.render('account', data);
};