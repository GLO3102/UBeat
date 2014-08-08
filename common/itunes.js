var request = require('request');
var qs = require('querystring');

var searchEndPoint = 'http://itunes.apple.com/search?';
var lookupEndPoint = 'http://itunes.apple.com/lookup?';

exports.search = function (parameters, res) {
    queryItunesApi(searchEndPoint + qs.stringify(parameters), res);
};

exports.lookup = function (parameters, res) {
    queryItunesApi(lookupEndPoint + qs.stringify(parameters), res);
};

function queryItunesApi(url, res) {
    console.log(url);
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


function successCallback(res, body) {
    res.status(200).send(body);
}

function errorCallback(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}
