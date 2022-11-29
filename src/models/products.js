const mongoose = require('mongoose')

const productsCollectionName = 'productos'

const productsSchema = new mongoose.Schema(
    {
        timestamp: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
        photo: { type: String, required: true }
    }
);

const ProductsModel = mongoose.model(
    productsCollectionName,
    productsSchema
)

module.exports = {
    ProductsModel
};