var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
    title: String,
    link: String,
    duration: Number,
    rank: Number,
    preview: String,
    artist: {
        id: Number,
        name: String,
        link: String,
        picture: String,
        tracklist: String,
        type: String
    },
    album: {
        id: Number,
        title: String,
        cover: String,
        tracklist: String,
        type: String
    }
});

trackSchema.method('toJSON', function () {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

var Track = mongoose.model('Track', trackSchema);

module.exports = Track;