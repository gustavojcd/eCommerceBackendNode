const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { CartController } = require('../controller/cart')
const { ProductsController } = require('../controller/products')
const routerCart = express.Router();

routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }));

routerCart.route('/:id')
    .delete(async (req, res, next) => {
        try {
            const { id } = req.params;
            await CartController.deleteCartById(id);
        } catch (err) {
            next(err);
        }
    })
routerCart.route('/')
    .post(async (req, res, next) => {
        try {
            const newCart = {
                id: uuidv4(),
                timestamp: Date.now(),
                prods: []
            };

            const result = await CartController.save(newCart);

            res.json({ id: result.id });
        } catch (err) {
            next(err);
        }
    })
routerCart.route('/:id/productos')
    .get(async (req, res, next) => {
        try {
            const { id } = req.params;

            const prods = await CartController.getAllProds(id)

            res.json({ prods })
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { id } = req.params;
            const { idProd } = req.body;

            const cart = await CartController.getById(id)
            const producto = await ProductsController.getById(idProd);

            cart.prods.push(producto);

            await CartController.Update(id, cart)
        } catch (err) {
            next(err);
        }
    })
routerCart.route('/:id/productos/:id_prod')
    .delete(async (req, res, next) => {
        try {
            const { id } = req.params;
            const { id_prod } = req.params;

            await CartController.deleteProdById(id, id_prod);
        } catch (err) {
            next(err);
        }
    })

module.exports = routerCart