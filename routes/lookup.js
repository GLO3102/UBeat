var request = require('request');
var qs = require('querystring');

var lookupEndPoint = 'http://itunes.apple.com/lookup?';

exports.getAlbum = function (req, res) {
    lookup({
        id: req.params.id,
        entity: 'album'
    }, res);
};

exports.getAlbumTracks = function (req, res) {
    lookup({
        id: req.params.id,
        entity: 'song'
    }, res);
};

exports.getArtist = function (req, res) {
    lookup({
        id: req.params.id,
        entity: 'musicArtist'
    }, res);
};

exports.getArtistAlbums = function (req, res) {
    lookup({
        id: req.params.id,
        entity: 'album'
    }, res);
};

function lookup(parameters, res) {
    var url = lookupEndPoint + qs.stringify(parameters);
    console.log(url);
    request({
            uri: url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                lookupSuccess(res, JSON.parse(body));
            } else {
                lookupError(res, error, response, body);
            }
        }
    );
}

function lookupSuccess(res, body) {
    res.status(200).send(body);
}

function lookupError(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}
