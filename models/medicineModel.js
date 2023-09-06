const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medicineSchema = new Schema({
    medicinename: {
      type: String,
      required: true
    },
    medicinedetails: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    shop_id: {
        type: String,
        required:true
    }


})

module.exports = mongoose.model('Medicine', medicineSchema)