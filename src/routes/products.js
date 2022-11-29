const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProductById, deleteById } = require('../controller/controller.products');

const routerProducts = express.Router();

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));

routerProducts.route('/:id')
    .get(getProductById)
    .put(updateProductById)
    .delete(deleteById)

routerProducts.route('/')
    .get(getAllProducts)
    .post(createProduct)

module.exports = routerProducts