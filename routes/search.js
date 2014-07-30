var request = require('request');
var qs = require('querystring');

exports.search = function (req, res) {
    search({
        url: 'http://api.deezer.com/search?',
        searchQuery: req.query.q,
        res: res,
        successCallback: searchSuccess,
        errorCallback: searchError
    });
};

exports.searchByAlbum = function (req, res) {
    search({
        url: 'http://api.deezer.com/search/album?',
        searchQuery: req.query.q,
        res: res,
        successCallback: searchSuccess,
        errorCallback: searchError
    });
};

exports.searchByArtist = function (req, res) {
    search({
        url: 'http://api.deezer.com/search/album?',
        searchQuery: req.query.q,
        res: res,
        successCallback: searchSuccess,
        errorCallback: searchError
    });
};

function search(options) {
    options.url += qs.stringify({
        q: options.searchQuery
    });
    request({
            uri: options.url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                options.successCallback(options.res, JSON.parse(body));
            } else {
                options.errorCallback(options.res, error, response, body);
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