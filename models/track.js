const mongoose = require('mongoose')
const Schema = mongoose.Schema
const modelHelpers = require('./modelHelpers.js')

const trackSchema = new Schema({
  artistId: Number,
  collectionId: Number,
  trackId: Number,
  artistName: String,
  collectionName: String,
  trackName: String,
  collectionCensoredName: String,
  trackCensoredName: String,
  artistViewUrl: String,
  collectionViewUrl: String,
  trackViewUrl: String,
  previewUrl: String,
  artworkUrl30: String,
  artworkUrl60: String,
  artworkUrl100: String,
  collectionPrice: Number,
  trackPrice: Number,
  releaseDate: Date,
  discCount: Number,
  discNumber: Number,
  trackCount: Number,
  trackNumber: Number,
  trackTimeMillis: Number,
  country: String,
  currency: String,
  primaryGenreName: String
})

trackSchema.method('toJSON', modelHelpers.toJSON)

const Track = mongoose.model('Track', trackSchema)

exports.schema = trackSchema
exports.model = Track
