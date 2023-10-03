const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required:true,
  },
  latitude: {
    type: Number, // Add latitude field
    required: false, // Not required when using current location
  },
  longitude: {
    type: Number, // Add longitude field
    required: false, // Not required when using current location
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Shop', shopSchema);
