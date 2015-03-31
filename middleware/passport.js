var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user').model;
var moment = require('moment');
var jwt = require('jwt-simple');

module.exports = function (passport, app) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            if (email) {
                email = email.toLowerCase();
            }

            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user || !user.validPassword(password)) {
                        return done(null, false);
                    } else {
                        var expires = moment().add(1, 'days').valueOf();
                        user.token = jwt.encode(
                            {
                                iss: user.id,
                                exp: expires
                            },
                            app.get('jwtTokenSecret')
                        );

                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            }
                            return done(null, user);
                        });
                    }
                });
            });
        }));

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            if (email) {
                email = email.toLowerCase();
            }

            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'email': email }, function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            return done(null, false);
                        } else {
                            var newUser = new User();

                            newUser.name = req.body.name;
                            newUser.email = email;
                            newUser.password = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }

                                return done(null, newUser);
                            });
                        }
                    });
                } else if (!req.user.email) {
                    var user = req.user;
                    user.email = email;
                    user.password = user.generateHash(password);
                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, user);
                    });
                } else {
                    return done(null, req.user);
                }
            });

        }));
};

