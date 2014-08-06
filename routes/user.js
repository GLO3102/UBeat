var gravatar = require('gravatar');
var User = require('../models/user.js').model;

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

exports.allUsers = function (req, res) {
    User.find({}, function (err, docs) {
            if (!err) {
                var users = [];
                for (var i = 0; i < docs.length; i++) {
                    users.push(docs[i].toJSON());
                }
                res.status(200).send(users);
            } else {
                console.error(err);
                res.status(500).send(err);
            }
        }
    );
};

exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!err) {
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({
                    errorCode: 'USER_NOT_FOUND',
                    message: 'User ' + req.params.id + ' was not found'
                });
            }
        } else {
            console.error(err);
            if (err.name === 'CastError') {
                res.status(404).send({
                    errorCode: 'USER_NOT_FOUND',
                    message: 'User ' + req.params.id + ' was not found'
                });
            } else {
                res.status(500).send(err);
            }
        }
    });
};