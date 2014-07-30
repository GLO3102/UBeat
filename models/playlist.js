var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistSchema = new Schema({
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

playlistSchema.method('toJSON', modelHelpers.toJSON);

var Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;