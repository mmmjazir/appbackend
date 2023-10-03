const Shop = require('../models/shopModel');
const mongoose = require('mongoose');


// get ALL Shops For Public
const getShopsForAll = async (req, res) => {
    const shops = await Shop.find({}).sort({ createdAt: -1 });
  
    res.status(200).json(shops);
  };
  
// get a single shop
const getPublicShop = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Shop' });
  }

  const shop = await Shop.findById(id);

  if (!shop) {
    return res.status(404).json({ error: 'No such shop' });
  }

  res.status(200).json(shop);
};

module.exports = {getShopsForAll, getPublicShop}