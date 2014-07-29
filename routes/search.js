var gravatar = require('gravatar');
var request = require('request');
var qs = require('querystring');

exports.search = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q,
        function(response, body) {
            res.status(200).send(body.data);
        },
        function(error, response, body) {
            console.error(error, response, body);
        }
    );
};

exports.searchByAlbum = function (req, res) {
    search(url, req.query.q,
        function(response, body) {
            res.status(200).send(body.data);
        },
        function(error, response, body) {
            console.error(error, response, body);
        }
    );
};

exports.searchByArtist = function (req, res) {
    search('http://api.deezer.com/search/album?', req.query.q,
        function(response, body) {
            res.status(200).send(body.data);
        },
        function(error, response, body) {
            console.error(error, response, body);
        }
    );
};

function search(url, searchQuery, success, error) {
    url += qs.stringify({
        q: searchQuery
    });
    request({
            uri: url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                success(response, JSON.parse(body))
            } else {
                error(error, response, body);
            }
        }
    );
}