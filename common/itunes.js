const request = require('request-promise')
const qs = require('querystring')

const searchEndPoint = 'http://itunes.apple.com/search?'
const lookupEndPoint = 'http://itunes.apple.com/lookup?'

exports.search = function(parameters, res) {
  queryItunesApi(searchEndPoint + qs.stringify(parameters), res)
}

exports.lookup = function(parameters, res, amount) {
  queryItunesApi(lookupEndPoint + qs.stringify(parameters), res, amount)
}

async function queryItunesApi(url, res, amount) {
  const { error, response, body } = request({ uri: url, method: 'GET' })
  if (!error && response.statusCode === 200) {
    successCallback(res, JSON.parse(body), amount)
  } else {
    errorCallback(res, error, response, body)
  }
}

function successCallback(res, body, amount) {
  if (amount == 'many') {
    body.results.splice(0, 1)
    body.resultCount--
    res.status(200).send(body)
  } else {
    res.status(200).send(body)
  }
}

function errorCallback(res, error, response, body) {
  console.error(error, body)
  res.status(response.statusCode).send(body)
}
