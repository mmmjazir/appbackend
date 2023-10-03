const Medicine = require('../models/medicineModel')
const mongoose = require('mongoose')

const getMedicinesForAll = async (req, res) => {
  
    const medicines = await Medicine.find({}).sort({ createdAt: -1 });
    res.status(200).json(medicines);

};

const getPublicMedicine = async (req, res) => {
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



module.exports = {getMedicinesForAll, getPublicMedicine}