var itunes = require('../common/itunes');

exports.getAlbum = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'album'
    }, res);
};

exports.getAlbumTracks = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'song'
    }, res);
};

exports.getArtist = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'musicArtist'
    }, res);
};

exports.getArtistAlbums = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'album'
    }, res);
};