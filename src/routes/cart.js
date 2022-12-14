import express from 'express'
import { createCart, deleteCartById, getAllProductsInCart, addProductToCart, deleteProductInCart } from '../controller/controller.cart'

const routerCart = express.Router();

routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }));

routerCart.route('/:id')
    .delete(deleteCartById)
routerCart.route('/')
    .post(createCart)
routerCart.route('/:id/productos')
    .get(getAllProductsInCart)
    .post(addProductToCart)
routerCart.route('/:id/productos/:id_prod')
    .delete(deleteProductInCart)

export default routerCart;