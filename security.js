var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var User = require('./models/user.js');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/',
        stateless: true
    },
    function (identifier, profile, done) {
        var email = profile.emails[0].value;
        User.findOne({ email: email },
            function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (!err && user !== null) {
                    done(null, user);
                } else {
                    user = new User({
                        email: email,
                        name: profile.name.givenName + ' ' + profile.name.familyName
                    });
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User saved.', user);
                            done(null, user);
                        }
                    });
                }
            });
    }
));

exports.googleAuth = passport.authenticate('google', { failureRedirect: '/login' });

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
