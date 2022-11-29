const express = require('express');

const { createCart, deleteCartById, getAllProductsInCart, addProductToCart, deleteProductInCart } = require('../controller/controller.cart')
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

module.exports = routerCart