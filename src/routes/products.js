const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { ProductsController } = require('../controller/products');
const { validarAdmin } = require('../middleware/validarAdmin');
const routerProducts = express.Router();

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));

routerProducts.route('/:id')
    .get(async (req, res, next) => {
        try {
            const { id } = req.params
            const producto = await ProductsController.getById(id)
            if (!producto)
                return res.status(404).json({
                    msg: 'Product not found',
                });

            res.json({
                data: producto,
            });
        } catch (err) {
            next(err);
        }
    })
    .put(validarAdmin, async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, description, code, stock, price, photo } = req.body

            const producto = await ProductsController.getById(id);

            if (!producto)
                return res.status(404).json({
                    msg: 'Product not found',
                });

            if (!name || !description || !code || !stock || !price || !photo) {
                return res.status(400).json({
                    error: "Campos Vacios"
                })
            }

            const newProduct = {
                timestamp: Date.now(),
                name,
                description,
                code,
                stock,
                price,
                photo
            };

            const result = await ProductsController.Update(id, newProduct);

            res.json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .delete(validarAdmin, async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await ProductsController.getById(id)
            if (!product)
                return res.status(404).json({
                    msg: 'Product not found',
                });
            await ProductsController.deleteById(id);
            res.status(200).json({
                msg: 'Product deleted',
            });
        } catch (err) {
            next(err);
        }
    })

routerProducts.route('/')
    .get(async (req, res, next) => {
        try {
            const productos = await ProductsController.getAll();
            res.json({
                data: productos,
            });
        } catch (err) {
            next(err);
        }
    })
    .post(validarAdmin, async (req, res, next) => {
        try {
            const { name, description, code, stock, price, photo } = req.body;

            if (!name || !description || !code || !stock || !price || !photo) {
                return res.status(400).json({
                    error: "Campos Vacios "
                })
            }

            const newProduct = {
                id: uuidv4(),
                timestamp: Date.now(),
                name,
                description,
                code,
                stock,
                price,
                photo
            };

            const result = await ProductsController.save(newProduct);

            res.json({ msg: result });
        } catch (err) {
            next(err);
        }
    })

module.exports = routerProducts