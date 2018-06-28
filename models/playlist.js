const mongoose = require('mongoose')
const Schema = mongoose.Schema
const modelHelpers = require('./modelHelpers.js')

const trackSchema = require('./track').schema
const userSchema = require('./user').schema

const playlistSchema = new Schema()
playlistSchema.add({
  name: String,
  owner: {
    id: String,
    email: String,
    name: String
  },
  tracks: [trackSchema]
})

playlistSchema.method('toJSON', modelHelpers.toJSON)

const Playlist = mongoose.model('Playlist', playlistSchema)

exports.schema = playlistSchema
exports.model = Playlist
