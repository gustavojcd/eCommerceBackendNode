const mongoose = require('mongoose')
const {ProductsModel} = require('./products')

const cartsCollectionName = 'carritos'

const cartsSchema = new mongoose.Schema(
    {
        timestamp: { type: Number, require: true },
        prods: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: ProductsModel
        }
    }
)

const CartModel = mongoose.model(
    cartsCollectionName,
    cartsSchema
)

module.exports = {
    CartModel
}