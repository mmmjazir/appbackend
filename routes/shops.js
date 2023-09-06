const express = require('express')
const {getShops,getShop,createShop,deleteShop,updateShop,getAllShops} = require('../controllers/shopController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all shops for public
router.get('/public',getAllShops)

// GET all shops
router.get('/',getShops)

// GET a single shop
router.get('/:id',getShop)

// POST a new shop
router.post('/', createShop)

// Delete a shop
router.delete('/:id',deleteShop)

// Update a shop
router.patch('/:id',updateShop)

module.exports = router
