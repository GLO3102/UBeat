var request = require('request');
var qs = require('querystring');

exports.search = function (req, res) {
    search('http://api.deezer.com/search?', req.query.q, res);
};

exports.searchByAlbum = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q, res);

};

exports.searchByArtist = function (req, res) {
    search('http://api.deezer.com/search/artist?', req.query.q, res);

};

function search(url, searchQuery, res) {
    url += qs.stringify({
        q: searchQuery
    });
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
    res.status(200).send(body.data);
}

function searchError(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}