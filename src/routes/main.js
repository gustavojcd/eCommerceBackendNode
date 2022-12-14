import { Router } from 'express'
import routerProducts from './products'
import routerCart from './cart'

const router = Router()

router.use('/productos', routerProducts);
router.use('/carrito', routerCart)

export default router;