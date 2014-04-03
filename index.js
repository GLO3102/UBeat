var express = require('express')
    , cors = require('cors')
    , passport = require('passport')
    , gravatar = require('gravatar')
    , util = require('util')
    , GoogleStrategy = require('passport-google').Strategy;


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

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'ubeat_session_secret' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors(corsOptions));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
    res.render('login', { user: req.user });
});

app.get('/account', ensureAuthenticated, function (req, res) {
    var email = req.user.emails[0].value;

    var data = {
        user: {
            name: req.user.displayName,
            email: email,
            gravatar: gravatar.url(email, null, https = false)
        }
    }

    res.render('account', data);
});

app.get('/login', function (req, res) {
    req.session = req.query.redirectUrl;
    res.render('login', { user: req.user });
});

app.get('/auth/google', function (req, res, next) {
    req.session.redirect = req.query.redirect;
    next();
}, passport.authenticate('google'));

app.get('/auth/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect(req.session.redirect || '/');
        delete req.session.redirect;
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on " + port);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}