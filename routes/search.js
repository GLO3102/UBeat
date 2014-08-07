var request = require('request');
var qs = require('querystring');

var searchEndPoint = 'http://itunes.apple.com/search?';

exports.search = function (req, res) {
    search({
        term: req.query.q,
        limit: req.query.limit || 10
    }, res);
};

exports.searchByAlbum = function (req, res) {
    search({
        term: req.query.q,
        entity: 'album',
        limit: req.query.limit || 10
    }, res);
};

exports.searchByArtist = function (req, res) {
    search({
        term: req.query.q,
        entity: 'musicArtist',
        limit: req.query.limit || 10
    }, res);
};

exports.searchByTrack = function (req, res) {
    search({
        term: req.query.q,
        entity: 'song',
        limit: req.query.limit || 10
    }, res);
};

function search(parameters, res) {
    var url = searchEndPoint + qs.stringify(parameters);
    console.log(url);
    request({
            uri: url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                searchSuccess(res, JSON.parse(body));
            } else {
                searchError(res, error, response, body);
            }
        }
    );
}

function searchSuccess(res, body) {
    res.status(200).send(body);
}

function searchError(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}
