var Playlist = require('../models/playlist').model;
var User = require('../models/user').model;

exports.create = function (req, res) {
    User.findById('53d847f8bc75352a1c04dcd9', function (err, user) {
        if (err) {
            console.error(err);
        } else {
            var playlist = new Playlist({
                name: req.body.name,
                owner: user
            });
            playlist.save(function (err) {
                if (!err) {
                    res.status(200).send(playlist);
                } else {
                    console.error(err);
                }
            });
        }
    });
};

exports.list = function (req, res) {
    Playlist.find({}, function (err, playlists) {
        if (!err) {
            res.status(200).send(playlists);
        } else {
            console.log(err);
        }
    });
};
