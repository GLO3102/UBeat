var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var cors = require('cors');
var passport = require('passport');

var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/ubeat';
mongoose.connect(mongoUri);

var authentication = require('./middleware/authentication');
var user = require('./routes/user');
var search = require('./routes/search');
var lookup = require('./routes/lookup');
var playlist = require('./routes/playlists');

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETEx', 'UPDATE'],
    credentials: true
};

var tokenSecret = 'UBEAT_TOKEN_SECRET' || process.env.TOKEN_SECRET;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('jwtTokenSecret', tokenSecret);

require('./middleware/passport')(passport, app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'ubeat_session_secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

/*
 app.get('/', authentication.home);
 app.get('/login', login.login);
 app.get('/auth/google', login.loginWithGoogle, security.googleAuth);
 app.get('/auth/google/return', security.googleAuth, login.loginWithGoogleCallback);
 app.get('/logout', login.logout);
 */

app.get('/search', search.search);
app.get('/search/album', search.searchByAlbum);
app.get('/search/artist', search.searchByArtist);
app.get('/search/track', search.searchByTrack);

app.get('/users', user.allUsers);
app.get('/users/:id', user.findById);
//app.get('/account', security.isAuthenticated, user.account);

app.get('/album/:id', lookup.getAlbum);
app.get('/album/:id/tracks', lookup.getAlbumTracks);
app.get('/artist/:id', lookup.getArtist);
app.get('/playlists', playlist.getPlaylists);
app.post('/playlists', playlist.createPlaylist);
app.post('/playlists/:id/tracks', playlist.addTrackToPlaylist);
app.delete('/playlists/:playlistId/tracks/:trackId', playlist.removeTrackFromPlaylist);
app.get('/playlists/:id', playlist.findPlaylistById);
app.put('/playlists/:id', playlist.updatePlaylist);


app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/token',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/token', function(req, res) {
    res.send(req.user);
});

app.get('/tokenInfo', authentication.isAuthenticated, function(req, res) {
    res.send(req.user);
});

app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});


app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/welcome',
    failureRedirect: '/signup',
    failureFlash: true
}));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/welcome', function (req, res) {
    if (req.user) {
        res.status(200).send({
            message: 'USER_SIGNED_UP_SUCCESSFULLY',
            user: {
                id: req.user._id,
                email : req.user.email,
                name: req.user.name
            }
        });
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

var port = process.env.PORT || 3000;
app.listen(port);
