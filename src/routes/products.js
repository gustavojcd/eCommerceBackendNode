import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteById } from '../controller/controller.products';

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

export default routerProducts;