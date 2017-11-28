var url = require('url');
var UserModel = require('../models/user').model;
var jwt = require('jwt-simple');

exports.isAuthenticated = function (req, res, next) {
    var token = exports.retrieveToken(req);

    if (token) {
        try {
            var decoded = jwt.decode(token, 'UBEAT_TOKEN_SECRET');

            if (decoded.exp <= Date.now()) {
                return res.status(401).send({
                    errorCode: 'ACCESS_DENIED',
                    message: 'Access token is expired'
                });
            }

            UserModel.findOne({ '_id': decoded.iss }, function (err, user) {
                if (!err) {
                    if (user) {
                        req.user = user;
                        return next()
                    } else {
                        return res.status(401).send({
                            errorCode: 'ACCESS_DENIED',
                            message: 'User associated with token was not found'
                        });
                    }
                }
            });
        } catch (err) {
            return res.status(401).send({
                errorCode: 'ACCESS_DENIED',
                message: 'Error retrieving user associated with token'
            });
        }

    } else {
        return res.status(401).send({
            errorCode: 'ACCESS_DENIED',
            message: 'Access token is missing'
        });
    }
};

exports.retrieveToken = function (req) {
    var parsed_url = url.parse(req.url, true);

    return (req.body && req.body.access_token) ||
        parsed_url.query.access_token ||
        req.headers['authorization'];
};
