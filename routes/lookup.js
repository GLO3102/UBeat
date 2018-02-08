var itunes = require('../common/itunes');

exports.getTrack = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'song'
    }, res, 'single');
};

exports.getAlbum = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'album'
    }, res, 'single');
};

exports.getAlbumTracks = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'song'
    }, res, 'many');
};

exports.getArtist = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'musicArtist'
    }, res, 'single');
};

exports.getArtistAlbums = function (req, res) {
    itunes.lookup({
        id: req.params.id,
        entity: 'album'
    }, res, 'many');
};