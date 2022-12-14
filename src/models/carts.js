import mongoose from 'mongoose';
import { ProductsModel } from './products';

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

export const CartModel = mongoose.model(
    cartsCollectionName,
    cartsSchema
)