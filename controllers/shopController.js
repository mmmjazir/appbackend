const Shop = require('../models/shopModel')
const mongoose = require('mongoose')

//get ALL Shops For Public
const getAllShops = async (req, res) => {

  const shops = await Shop.find({}).sort({createdAt: -1})

  res.status(200).json(shops)
}


// get all shops
const getShops = async (req, res) => {
  const user_id = req.user._id

  const shops = await Shop.find({user_id}).sort({createdAt: -1})

  res.status(200).json(shops)
}

// get a single shop
const getShop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Shop'})
  }

  const shop = await Shop.findById(id)

  if (!shop) {
    return res.status(404).json({error: 'No such shop'})
  }
  
  res.status(200).json(shop)
}


// create new shop
const createShop = async (req, res) => {
  const {shopname, address} = req.body

  let emptyFields = []

  if(!shopname) {
    emptyFields.push('shopname')
  }
  if(!address) {
    emptyFields.push('address')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const shop = await Shop.create({shopname, address, user_id})
    res.status(200).json(shop)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a shop
const deleteShop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such shop'})
  }

  const shop = await Shop.findOneAndDelete({_id: id})

  if (!shop) {
    return res.status(400).json({error: 'No such shop'})
  }

  res.status(200).json(shop)
}

// update a shop
const updateShop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such shop'})
  }

  const shop = await Shop.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!shop) {
    return res.status(400).json({error: 'No such shop'})
  }

  res.status(200).json(shop)
}


module.exports = {
  getShops,
  getShop,
  createShop,
  deleteShop,
  updateShop,
  getAllShops
}