const Medicine = require('../models/medicineModel')
const mongoose = require('mongoose')
const Shop = require('../models/shopModel');


// get all medicines
const getMedicines = async (req, res) => {
    const sellerrole = req.user.role ;
    const user_id = req.user._id ;
    
    if(sellerrole !== 'seller'){
      return res.status(400).json({ error: 'you must have seller role to fetch' });
    }
  
     try{
   
      const shop = await Shop.findOne({ user_id }) ;
      const shop_id = shop._id ;

      if(!shop){
        res.status(404).json({error: 'You dont have a shop, First create a shop'})
      }

     const medicines = await Medicine.find({shop_id}).sort({createdAt: -1})

      res.status(200).json(medicines)
    
   }catch(error) {
     res.status(400).json({error:error.message})
   }
}

// get a single medicine
const getMedicine = async (req, res) => {
  const { id } = req.params
  const sellerrole = req.user.role 
  const user_id = req.user._id ;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Medicine'})
  }

 if(sellerrole !== 'seller'){
    return res.status(400).json({ error: 'you must have seller role to do this action' });
  }

  try{

     const shop = await Shop.findOne({ user_id }) ;
     const user_shopid = shop._id ;
     const medicine = await Medicine.findById(id)
    
    if (!medicine) {
    return res.status(404).json({error: 'No such medicine'})
    } 
    
    const medicine_shopid = medicine.shop_id
   
    if(medicine_shopid != user_shopid ){
      return res.status(400).json({error: 'You cant fetch '})
    }
  
  res.status(200).json(medicine)

}catch(error) {
  res.status(400).json({error:error.message})
}
}


// create new shop
const createMedicine = async (req, res) => {
  const {medicinename, medicinedetails, available, price, shop_id } = req.body
  const sellerrole = req.user.role 
  const user_id = req.user._id ;
  
  let emptyFields = []

  if(!medicinename) {
    emptyFields.push('medicinename')
  }
  if(!medicinedetails) {
    emptyFields.push('medicinedetails')
  }
  if(available == false){
    emptyFields.push('available')
  }
  if(price == 0) {
    emptyFields.push('price')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  if(sellerrole !== 'seller' ){
      return res.status(400).json({ error: 'you must have seller role to do this action' });
    }
   
  // add doc to db
  try {
      
    const shop = await Shop.findOne({ user_id }) ;
     const user_shopid = shop._id ;
     if(user_shopid != shop_id ){
      return res.status(400).json({ error: 'You are not allowed to do this action' });
     }
    
     const medicine = await Medicine.create({medicinename, medicinedetails, available, price, shop_id})
    res.status(200).json(medicine)
       
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a medicine
const deleteMedicine = async (req, res) => {
  const { id } = req.params
  const sellerrole = req.user.role 
  const user_id = req.user._id ;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such medicine'})
  }  
  
  if(sellerrole !== 'seller' ){
    return res.status(400).json({ error: 'you must have seller role to do this action' });
  }
  
  try{
  
      const shop = await Shop.findOne({ user_id }) ;
      const shop_id = shop._id ;
      const findmedicinebyid = await Medicine.findById(id)
      const medicineshopid = findmedicinebyid.shop_id
    if(medicineshopid != shop_id){
      return res.status(400).json({ error: 'You are not allowed to do this action' });
    }
      const medicine = await Medicine.findOneAndDelete({_id: id})
    
     if (!medicine) {
     return res.status(400).json({error: 'No such medicine'})
   } 
  
   res.status(200).json(medicine)
   
     
  } catch(error){
    res.status(400).json({error: error.message})
  }
  

 
}

// update a shop
const updateMedicine = async (req, res) => {
  const { id } = req.params
  const sellerrole = req.user.role 
  const user_id = req.user._id ;
  const {medicinename, medicinedetails, available, price} = req.body
 
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such medicine'})
  }

  let emptyFields = []

  if(!medicinename) {
    emptyFields.push('medicinename')
  }
  if(!medicinedetails) {
    emptyFields.push('medicinedetails')
  }
  if(available == false){
    emptyFields.push('available')
  }
  if(price == 0) {
    emptyFields.push('price')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

   if(sellerrole !== 'seller' ){
    return res.status(400).json({ error: 'you must have seller role to do this action' });
  }

  try{
      const shop = await Shop.findOne({ user_id }) ;
      const shop_id = shop._id ;
      const findmedicinebyid = await Medicine.findById(id)
      const medicineshopid = findmedicinebyid.shop_id
      if(medicineshopid != shop_id){
        return res.status(400).json({ error: 'You are not allowed to do this action' });
      }
      const medicine = await Medicine.findOneAndUpdate({_id: id}, {
        medicinename, medicinedetails, available, price
      })

  if (!medicine) {
    return res.status(400).json({error: 'No such medicine'})
  }

  res.status(200).json(medicine)
 } catch(error){
  res.status(400).json({error: error.message})
 }

}


module.exports = {
  getMedicines,
  getMedicine,
  createMedicine,
  deleteMedicine,
  updateMedicine,
}