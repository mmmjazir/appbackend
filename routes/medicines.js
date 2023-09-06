const express = require('express')
const {getMedicines,getMedicine,createMedicine,deleteMedicine,updateMedicine,getMedicinesForAll} = require('../controllers/medicineController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all medicines for public
router.get('/public',getMedicinesForAll)

// GET all medicines
router.get('/',getMedicines)

// GET a single medicine
router.get('/:id',getMedicine)

// POST a new medicine
router.post('/', createMedicine)

// Delete a medicine
router.delete('/:id',deleteMedicine)

// Update a medicine
router.patch('/:id',updateMedicine)

module.exports = router
