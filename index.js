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
var login = require('./routes/login');
var signup = require('./routes/signup');
var user = require('./routes/user');
var search = require('./routes/search');
var lookup = require('./routes/lookup');
var playlist = require('./routes/playlists');
var status = require('./routes/status');

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

app.get('/status', status.getStatus);
app.get('/login', login.showLoginPage);
app.post('/login', passport.authenticate('local-login'), login.getToken);
app.get('/logout', login.logout);

app.get('/signup', signup.showSignupPage);
app.post('/signup', signup.passportSignup);
app.get('/welcome', signup.welcome);

app.get('/token', login.getToken);
app.get('/tokenInfo', authentication.isAuthenticated, login.getToken);


// Secure API 
app.get('/search', authentication.isAuthenticated, search.search);
app.get('/search/albums', authentication.isAuthenticated, search.searchByAlbum);
app.get('/search/artists', authentication.isAuthenticated, search.searchByArtist);
app.get('/search/tracks', authentication.isAuthenticated, search.searchByTrack);
app.get('/search/users', authentication.isAuthenticated, user.findByName);

app.get('/users', authentication.isAuthenticated, user.allUsers);
app.get('/users/:id', authentication.isAuthenticated, user.findById);

app.post('/follow', authentication.isAuthenticated, user.follow);
app.delete('/follow/:id', authentication.isAuthenticated, user.unfollow);

app.get('/albums/:id', authentication.isAuthenticated, lookup.getAlbum);
app.get('/albums/:id/tracks', authentication.isAuthenticated, lookup.getAlbumTracks);
app.get('/artists/:id', authentication.isAuthenticated, lookup.getArtist);
app.get('/artists/:id/albums', authentication.isAuthenticated, lookup.getArtistAlbums);
app.get('/playlists', authentication.isAuthenticated, playlist.getPlaylists);
app.post('/playlists', authentication.isAuthenticated, playlist.createPlaylist);
app.delete('/playlists/:id', authentication.isAuthenticated, playlist.removePlaylist);
app.post('/playlists/:id/tracks', authentication.isAuthenticated, playlist.addTrackToPlaylist);
app.delete('/playlists/:playlistId/tracks/:trackId', authentication.isAuthenticated, playlist.removeTrackFromPlaylist);
app.get('/playlists/:id', authentication.isAuthenticated, playlist.findPlaylistById);
app.put('/playlists/:id', authentication.isAuthenticated, playlist.updatePlaylist);

// Unsecure API (Will be removed after release 2)
app.get('/unsecure/search', search.search);
app.get('/unsecure/search/albums', search.searchByAlbum);
app.get('/unsecure/search/artists', search.searchByArtist);
app.get('/unsecure/search/tracks', search.searchByTrack);
app.get('/unsecure/search/users', user.findByName);

app.get('/unsecure/users', user.allUsers);
app.get('/unsecure/users/:id', user.findById);

app.post('/unsecure/follow', user.follow);
app.delete('/unsecure/follow/:id', user.unfollow);

app.get('/unsecure/albums/:id', lookup.getAlbum);
app.get('/unsecure/albums/:id/tracks', lookup.getAlbumTracks);
app.get('/unsecure/artists/:id', lookup.getArtist);
app.get('/unsecure/artists/:id/albums', lookup.getArtistAlbums);
app.get('/unsecure/playlists', playlist.getPlaylists);
app.post('/unsecure/playlists', playlist.createPlaylist);
app.delete('/unsecure/playlists/:id', playlist.removePlaylist);
app.post('/unsecure/playlists/:id/tracks', playlist.addTrackToPlaylist);
app.delete('/unsecure/playlists/:playlistId/tracks/:trackId', playlist.removeTrackFromPlaylist);
app.get('/unsecure/playlists/:id', playlist.findPlaylistById);
app.put('/unsecure/playlists/:id, playlist.updatePlaylist);

var port = process.env.PORT || 3000;
app.listen(port);
