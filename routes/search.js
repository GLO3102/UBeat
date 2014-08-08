var itunes = require('../common/itunes');

exports.search = function (req, res) {
    itunes.search({
        term: req.query.q,
        media: 'music',
        limit: req.query.limit || 10
    }, res);
};

exports.searchByAlbum = function (req, res) {
    itunes.search({
        term: req.query.q,
        entity: 'album',
        media: 'music',
        attribute: 'albumTerm',
        limit: req.query.limit || 10
    }, res);
};

exports.searchByArtist = function (req, res) {
    itunes.search({
        term: req.query.q,
        entity: 'musicArtist',
        attribute: 'artistTerm',
        media: 'music',
        limit: req.query.limit || 10
    }, res);
};

exports.searchByTrack = function (req, res) {
    itunes.search({
        term: req.query.q,
        entity: 'song',
        media: 'music',
        attribute: 'songTerm',
        limit: req.query.limit || 10
    }, res);
};