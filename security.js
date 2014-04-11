var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    },
    function (identifier, profile, done) {
        return done(null, profile);
    }
));

exports.googleAuth = passport.authenticate('google', { failureRedirect: '/login' });

exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};