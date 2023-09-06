const Medicine = require('../models/medicineModel')
const mongoose = require('mongoose')


//get all medicines for public

const getMedicinesForAll = async (req, res) => {
  
    const medicines = await Medicine.find({}).sort({ createdAt: -1 });
    res.status(200).json(medicines);

};

// get all medicines
const getMedicines = async (req, res) => {
  // const user_id = req.user._id
    const shop_id = req.query.shop_id

    const medicines = await Medicine.find({shop_id}).sort({createdAt: -1})

    res.status(200).json(medicines)
  
}

// get a single medicine
const getMedicine = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Medicine'})
  }

  const medicine = await Medicine.findById(id)

  if (!medicine) {
    return res.status(404).json({error: 'No such medicine'})
  }
  
  res.status(200).json(medicine)
}


// create new shop
const createMedicine = async (req, res) => {
  const {medicinename, medicinedetails, available, price, shop_id } = req.body

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

  // add doc to db
  try {
    const medicine = await Medicine.create({medicinename, medicinedetails, available, price, shop_id})
    res.status(200).json(medicine)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a medicine
const deleteMedicine = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such medicine'})
  }

  const medicine = await Medicine.findOneAndDelete({_id: id})

  if (!medicine) {
    return res.status(400).json({error: 'No such medicine'})
  }

  res.status(200).json(medicine)
}

// update a shop
const updateMedicine = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such medicine'})
  }

  const medicine = await Medicine.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!medicine) {
    return res.status(400).json({error: 'No such medicine'})
  }

  res.status(200).json(medicine)
}


module.exports = {
  getMedicines,
  getMedicine,
  createMedicine,
  deleteMedicine,
  updateMedicine,
  getMedicinesForAll
}