var gravatar = require('gravatar');

exports.account = function (req, res) {
    var data = {
        user: {
            name: req.user.name,
            email: req.user.email,
            gravatar: gravatar.url(req.user.email, null, false)
        }
    };

    res.render('account', data);
};