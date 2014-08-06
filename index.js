var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var cors = require('cors');
var passport = require('passport');

var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/ubeat';
mongoose.connect(mongoUri);

var security = require('./security');
var login = require('./routes/login');
var user = require('./routes/user');
var search = require('./routes/search');
var playlist = require('./routes/playlists');

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(session({
    secret: 'ubeat_session_secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

app.get('/', login.login);
app.get('/login', login.login);
app.get('/auth/google', login.loginWithGoogle, security.googleAuth);
app.get('/auth/google/return', security.googleAuth, login.loginWithGoogleCallback);
app.get('/logout', login.logout);
app.get('/search', search.search);

app.get('/search/album', search.searchByAlbum);
app.get('/search/artist', search.searchByArtist);
app.get('/search/track', search.searchByTrack);

app.get('/users', user.allUsers);
app.get('/users/:id', user.findById);
app.get('/account', security.isAuthenticated, user.account);

app.get('/playlists', playlist.findAll);
app.post('/playlists', playlist.create);
app.get('/playlists/:id', playlist.findById);
app.put('/playlists/:id', playlist.update);

var port = process.env.PORT || 3000;
app.listen(port);
