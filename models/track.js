var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelHelpers = require('./modelHelpers.js');

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

trackSchema.method('toJSON', modelHelpers.toJSON);

var Track = mongoose.model('Track', trackSchema);

exports.schema = trackSchema;
exports.model = Track;
