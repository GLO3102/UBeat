var User = require('../models/user.js').model;

exports.allUsers = function (req, res) {
    User.find({}, function (err, docs) {
            if (!err) {
                var users = [];
                for (var i = 0; i < docs.length; i++) {
                    users.push(docs[i].toDTO());
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
    try {
        User.findById(req.params.id, function (err, user) {
            if (!err) {
                if (user) {
                    if (!res.headerSent) {
                        res.status(200).send(user.toDTO(true));
                    }
                } else {
                    if (!res.headerSent) {
                        res.status(404).send({
                            errorCode: 'USER_NOT_FOUND',
                            message: 'User ' + req.params.id + ' was not found'
                        });
                    }
                }
            } else {
                console.error(err);
                if (err.name === 'CastError') {
                    if (!res.headerSent) {
                        res.status(404).send({
                            errorCode: 'USER_NOT_FOUND',
                            message: 'User ' + req.params.id + ' was not found'
                        });
                    }
                } else {
                    if (!res.headerSent) {
                        res.status(500).send(err);
                    }
                }
            }
        });
    } catch (e) {
        console.log(e);
        if (!res.headerSent) {
            res.send(500);
        }
    }

};

exports.findByName = function (req, res) {
    var name = req.query.q;
    User.find({
        name: new RegExp(name, 'i')
    }, function (err, users) {
        if (!err) {
            if (users) {
                var formattedUsers = [];
                for (var i = 0; i < users.length; i++) {
                    formattedUsers.push(users[i].toDTO(true));
                }
                res.status(200).send(formattedUsers);
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

exports.follow = function (req, res) {
    User.findById(req.body.id, function (err, userToFollow) {
        if (!err) {
            if (userToFollow) {
                if (!req.user.isFollowingUser(userToFollow.id)) {
                    req.user.following.push(userToFollow.toDTO(false));
                    req.user.save(function (err) {
                        if (!err) {
                            res.status(201).send(req.user.toDTO(true));
                        } else {
                            res.status(500).send('Impossible to follow.');
                            console.error(err);
                        }
                    });
                } else {
                    res.status(412).send({
                        errorCode: 'ALREADY_FOLLOWING_USER',
                        message: 'You already follow user ' + req.body.id
                    });
                }
            } else {
                res.status(404).send({
                    errorCode: 'USER_NOT_FOUND',
                    message: 'User with id ' + req.body.id + ' was not found'
                });
            }

        } else {
            console.error(err);
            res.send(500);
        }
    });
};

exports.unfollow = function (req, res) {
    var userId = req.params.id;
    if (req.user.isFollowingUser(userId)) {
        req.user.unfollow(userId);
        res.status(200).send(req.user.toDTO(true));
    } else {
        res.status(404).send({
            errorCode: 'USER_NOT_FOUND',
            message: 'User does not follow user with id ' + req.body.id
        });
    }
};
