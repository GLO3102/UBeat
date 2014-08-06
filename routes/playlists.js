var Playlist = require('../models/playlist').model;
var User = require('../models/user').model;

exports.create = function (req, res) {
    User.findById('53d847f8bc75352a1c04dcd9', function (err, user) {
        if (!err) {
            var playlist = new Playlist({
                name: req.body.name,
                owner: user
            });
            playlist.save(function (err) {
                if (!err) {
                    res.status(201).send(playlist);
                } else {
                    console.error(err);
                }
            });
        } else {
            console.error(err);
        }
    });
};

exports.update = function (req, res) {
    Playlist.findById(req.params.id, function (err, playlist) {
        if (!err) {
            if (playlist) {
                console.log(req.body.tracks);
                playlist.tracks = req.body.tracks;
                playlist.save();
                res.status(200).send(playlist);
            } else {
                res.status(404).send({
                    errorCode: 'PLAYLIST_NOT_FOUND',
                    message: 'Playlist ' + req.params.id + ' was not found'
                });
            }
        } else {
            console.error(err);
            if (err.name === 'CastError') {
                res.status(404).send({
                    errorCode: 'PLAYLIST_NOT_FOUND',
                    message: 'Playlist ' + req.params.id + ' was not found'
                });
            } else {
                res.status(500).send(err);
            }
        }
    });
};

exports.findAll = function (req, res) {
    Playlist.find({}, function (err, playlists) {
        if (!err) {
            res.status(200).send(playlists || []);
        } else {
            console.log(err);
        }
    });
};

exports.findById = function (req, res) {
    Playlist.findById(req.params.id, function (err, playlist) {
        if (!err) {
            if (playlist) {
                res.status(200).send(playlist);
            } else {
                res.status(404).send({
                    errorCode: 'PLAYLIST_NOT_FOUND',
                    message: 'Playlist ' + req.params.id + ' was not found'
                });
            }
        } else {
            console.error(err);
            if (err.name === 'CastError') {
                res.status(404).send({
                    errorCode: 'PLAYLIST_NOT_FOUND',
                    message: 'Playlist ' + req.params.id + ' was not found'
                });
            } else {
                res.status(500).send(err);
            }
        }
    });
};
