var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistSchema = new Schema({
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

playlistSchema.method('toJSON', function () {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

var Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;