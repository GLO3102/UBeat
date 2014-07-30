var request = require('request');
var qs = require('querystring');

exports.search = function (req, res) {
    search('http://api.deezer.com/search?', req.query.q, searchSuccess, searchError);
};

exports.searchByAlbum = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q, searchSuccess, searchError);
};

exports.searchByArtist = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q, searchSuccess, searchError);
};

function search(url, searchQuery, successCallback, errorCallback) {
    url += qs.stringify({
        q: searchQuery
    });
    request({
            uri: url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                successCallback(response, JSON.parse(body));
            } else {
                errorCallback(error, response, body);
            }
        }
    );
}

function searchSuccess(response, body) {
    res.status(200).send(body.data);
}

function searchError(error, response, body) {
    console.error(error, body);
    res.status(response.status).send(body);
}