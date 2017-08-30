var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelHelpers = require('./modelHelpers.js');

var trackSchema = require('./track').schema;
var userSchema = require('./user').schema;

var playlistSchema = new Schema();
playlistSchema.add({
    name: String,
    owner: {
        id: String,
        email: String,
        name: String
    },
    tracks: [trackSchema]
});

playlistSchema.method('toJSON', modelHelpers.toJSON);

var Playlist = mongoose.model('Playlist', playlistSchema);

exports.schema = playlistSchema;
exports.model = Playlist;
