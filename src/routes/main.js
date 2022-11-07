const { Router } = require('express')
const routerProducts = require('./products')
const routerCart = require('./cart')

const router = Router()

router.use('/productos', routerProducts);
router.use('/carrito', routerCart)

module.exports = router