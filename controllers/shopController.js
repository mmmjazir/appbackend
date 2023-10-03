const Shop = require('../models/shopModel');
const mongoose = require('mongoose');


// get all shops
const getShops = async (req, res) => {
  const sellerrole = req.user.role ;
  const user_id = req.user._id;
  
  if(sellerrole !== 'seller'){
    return res.status(400).json({ error: 'you must have seller role to fetch' });
  }

  const shops = await Shop.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(shops);
};

// get a single shop
const getShop = async (req, res) => {
  const { id } = req.params;
  const sellerrole = req.user.role ;
  const user_id = req.user._id ;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Shop' });
  }
  if(sellerrole !== 'seller'){
    return res.status(400).json({ error: 'you must have seller role to fetch' });
  }

  try{
    
  const shop = await Shop.findById(id);
  const shop_userid = shop.user_id
  if(shop_userid != user_id ){
    return res.status(400).json({ error: 'You are not allowed to fetch that data' });
  }

  if (!shop) {
    return res.status(404).json({ error: 'No such shop' });
  }

  res.status(200).json(shop);

 }catch(error){
    res.status(400).json({error: error.message})
  }
};

// create new shop
const createShop = async (req, res) => {
  const { shopname, address, city, latitude, longitude } = req.body;

 const sellerrole = req.user.role ;

  let emptyFields = [];

  if (!shopname) {
    emptyFields.push('shopname');
  }
  if (!address) {
    emptyFields.push('address');
  }
  if (!city) {
    emptyFields.push('city')
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  if(sellerrole !== 'seller'){
    return res.status(400).json({ error: 'you must have seller role to do this action' });
  }

  // add doc to db
   
    const user_id = req.user._id;

    const existingShop = await Shop.findOne({ user_id });
    if (existingShop) {
      return res.status(400).json({ error: 'You already have a shop.' });
    }
   try {
    const shop = await Shop.create({
      shopname,
      address,
      city,
      latitude,
      longitude,
      user_id,
    });
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a shop
const deleteShop = async (req, res) => {
  const { id } = req.params;
  const sellerrole = req.user.role 
  const user_id = req.user._id ;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such shop' });
  }

  if(sellerrole !== 'seller' ){
    return res.status(400).json({ error: 'you must have seller role to do this action' });
  }
  
  try{
    const findshop = await Shop.findOne({ user_id }) ;
    const shop_id = findshop._id ;

    if(shop_id != id ){
      return res.status(400).json({error: 'you dont have access to do this action'})
    }

   const shop = await Shop.findOneAndDelete({ _id: id });

  if (!shop) {
    return res.status(400).json({ error: 'No such shop' });
  }

  res.status(200).json(shop); 

  }catch(error){
    res.status(400).json({error: error.message})
  }
};

// update a shop
const updateShop = async (req, res) => {
  const { id } = req.params;
  const sellerrole = req.user.role 
  const user_id = req.user._id ;

 const {shopname, address, city, latitude, longitude} = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such shop' });
  }

  let emptyFields = [];

  if (!shopname) {
    emptyFields.push('shopname');
  }
  if (!address) {
    emptyFields.push('address');
  }
  if (!city) {
    emptyFields.push('city')
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  if(sellerrole !== 'seller' ){
    return res.status(400).json({ error: 'you must have seller role to do this action' });
  }

  
  try{
   
    const findshop = await Shop.findOne({ user_id }) ;
    const shop_id = findshop._id ;
    
    if(shop_id != id ){
      return res.status(400).json({error: 'you dont have access to do this action'})
    }


   const shop = await Shop.findOneAndUpdate({ _id: id }, {
    shopname, address, city, latitude, longitude},
  );

  if (!shop) {
    return res.status(400).json({ error: 'No such shop' });
  }

  res.status(200).json(shop);

 }catch(error){
    res.status(400).json({error: error.message})
  }
};

module.exports = {
  getShops,
  getShop,
  createShop,
  deleteShop,
  updateShop,
};
