const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {getShopsForAll,getPublicShop} = require('../controllers/publicShopController')

const router = express.Router()

router.use(requireAuth)


router.get('/',getShopsForAll)

router.get('/:id',getPublicShop)

module.exports = router

