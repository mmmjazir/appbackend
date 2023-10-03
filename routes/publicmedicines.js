const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {getMedicinesForAll,getPublicMedicine} = require('../controllers/publicMedicineController')

const router = express.Router()

router.use(requireAuth)


// GET all medicines for public
router.get('/',getMedicinesForAll)

router.get('/:id',getPublicMedicine)

module.exports = router