var request = require('request');
var qs = require('querystring');

exports.search = function (req, res) {
    search('http://api.deezer.com/search?', req.query.q, res, searchSuccess, searchError);
};

exports.searchByAlbum = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q, res, searchSuccess, searchError);
};

exports.searchByArtist = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q, res, searchSuccess, searchError);
};

function search(url, searchQuery, res, successCallback, errorCallback) {
    url += qs.stringify({
        q: searchQuery
    });
    request({
            uri: url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                successCallback(res, JSON.parse(body));
            } else {
                errorCallback(res, error, response, body);
            }
        }
    );
}

function searchSuccess(res, body) {
    res.status(200).send(body.data);
}

function searchError(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}