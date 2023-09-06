const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopSchema = new Schema({
    shopname: {
      type: String,
      required: true
    },
    address: {
        type: String,
        required: true
    },
    user_id: {
       type: String,
       required:true
    }


})

module.exports = mongoose.model('Shop', shopSchema)