const { ProductsModel } = require('../models/products')
const { validarAdmin } = require('../middleware/validarAdmin');

const createProduct = async (req, res, next) => {
    try {
        const { name, description, code, stock, price, photo } = req.body;

        if (!name || !description || !code || !stock || !price || !photo) {
            return res.status(400).json({
                error: "Campos Vacios "
            })
        }

        const newProduct = await ProductsModel.create({
            timestamp: Date.now(),
            name,
            description,
            code,
            stock,
            price,
            photo
        });

        res.status(201).json({ msg: newProduct });
    } catch (err) {
        next(err);
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const productos = await ProductsModel.find();
        res.json({
            data: productos,
        });
    } catch (err) {
        next(err);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const producto = await ProductsModel.findById(id)
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
}

const updateProductById = (validarAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, code, stock, price, photo } = req.body

        const producto = await ProductsModel.findById(id);

        if (!producto)
            return res.status(404).json({
                msg: 'Product not found',
            });

        if (!name || !description || !code || !stock || !price || !photo) {
            return res.status(400).json({
                error: "Campos Vacios"
            })
        }

        const productUpdated = await ProductsModel.findByIdAndUpdate(
            id,
            { timestamp: Date.now(), name, description, code, stock, price, photo },
            { new: true }
        );

        res.json({
            data: productUpdated,
        });
    } catch (err) {
        next(err);
    }
})

const deleteById = (validarAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductsModel.findById(id)
        if (!product)
            return res.status(404).json({
                msg: 'Product not found',
            });
        await ProductsModel.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'Product deleted',
        });
    } catch (err) {
        next(err);
    }
})
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteById
}