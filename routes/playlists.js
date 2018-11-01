const Playlist = require('../models/playlist').model
const User = require('../models/user').model
const Track = require('../models/track').model
const _ = require('underscore')

exports.createPlaylist = async function(req, res) {
  try {
    const user = await User.findById(req.user.id)
    const playlist = new Playlist({
      name: req.body.name,
      owner: user.toJSON()
    })
    await playlist.save()
    res.status(201).send(playlist)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}

// Unsecure (Will be removed after release 2)
exports.createPlaylistUnsecure = async function(req, res) {
  try {
    const user = await User.findOne({ email: req.body.owner })
    if (user) {
      const playlist = new Playlist({
        name: req.body.name,
        owner: user.toJSON()
      })
      await playlist.save()
      res.status(201).send(playlist)
    } else {
      res.status(404).send({
        errorCode: 'USER_NOT_FOUND',
        message: `User with email "${req.body.owner}" does not exist.`
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}

exports.addTrackToPlaylist = async function(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (playlist) {
      if (req.body) {
        const track = new Track(req.body)
        playlist.tracks.push(track.toJSON())
        playlist.save()
        res.status(200).send(playlist)
      } else {
        res.status(412).send({
          errorCode: 'REQUEST_BODY_REQUIRED',
          message: 'Request body is missing'
        })
      }
    } else {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    }
  } catch (err) {
    console.error(err)
    if (err.name === 'CastError') {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    } else {
      res.status(500).send(err)
    }
  }
}

exports.removeTrackFromPlaylist = async function(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.playlistId)
    if (playlist) {
      const trackToRemove = playlist.tracks
        .filter(function(track) {
          return track.trackId == req.params.trackId
        })
        .pop()

      if (trackToRemove) {
        trackToRemove.remove()
        playlist.save()
        res.status(200).send(playlist)
      } else {
        res.status(404).send({
          errorCode: 'TRACK_NOT_FOUND',
          message: 'Track ' + req.params.trackId + ' was not found'
        })
      }
    } else {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.playlistId + ' was not found'
      })
    }
  } catch (err) {
    console.error(err)
    if (err.name === 'CastError') {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.playlistId + ' was not found'
      })
    } else {
      res.status(500).send(err)
    }
  }
}

exports.updatePlaylist = async function(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (playlist) {
      playlist.name = req.body.name
      playlist.tracks = req.body.tracks
      playlist.save()
      res.status(200).send(playlist)
    } else {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    }
  } catch (err) {
    console.error(err)
    if (err.name === 'CastError') {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    } else {
      res.status(500).send(err)
    }
  }
}

exports.removePlaylist = async function(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (playlist) {
      if (playlist.owner.id == req.user.id) {
        playlist.remove()
        res.status(200).send({
          message: 'Playlist ' + req.params.id + ' deleted successfully'
        })
      } else {
        res.status(412).send({
          errorCode: 'NOT_PLAYLIST_OWNER',
          message: 'Playlist can only be deleted by their owner'
        })
      }
    } else {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    }
  } catch (err) {
    console.error(err)
    if (err.name === 'CastError') {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    } else {
      res.status(500).send(err)
    }
  }
}

// Unsecure (Will be removed after release 2)
exports.removePlaylistUnsecure = async function(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (playlist) {
      playlist.remove()
      res.status(200).send({
        message: 'Playlist ' + req.params.id + ' deleted successfully'
      })
    } else {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    }
  } catch (err) {
    console.error(err)
    if (err.name === 'CastError') {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    } else {
      res.status(500).send(err)
    }
  }
}

exports.getPlaylists = async function(req, res) {
  try {
    const playlists = await Playlist.find({})
    res.status(200).send(playlists || [])
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.findPlaylistById = async function(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (playlist) {
      res.status(200).send(playlist)
    } else {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    }
  } catch (err) {
    console.error(err)
    if (err.name === 'CastError') {
      res.status(404).send({
        errorCode: 'PLAYLIST_NOT_FOUND',
        message: 'Playlist ' + req.params.id + ' was not found'
      })
    } else {
      res.status(500).send(err)
    }
  }
}
