import { CartModel } from '../models/carts'

export const createCart = async (req, res, next) => {
    try {

        await CartModel.create({
            timestamp: Date.now(),
        });

        res.json({ msg: "Cart was created" });
    } catch (err) {
        next(err);
    }
}
export const deleteCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await CartModel.findById(id)
        if (!cart)
            return res.status(404).json({
                msg: 'Cart not found',
            });
        await CartModel.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'Cart deleted',
        });
    } catch (err) {
        next(err);
    }
}
export const getAllProductsInCart = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cart = await CartModel.findById(id)
        
        res.json({ products: cart.prods })
    } catch (err) {
        next(err);
    }
}
export const addProductToCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { idProd } = req.body;

        const cart = await CartModel.findById(id)

        cart.prods.push(idProd);

        await CartModel.findByIdAndUpdate(
            id,
            cart,
            { new: true }
        )
        res.status(200).json({ msg: 'Product has been added to cart' })
    } catch (err) {
        next(err);
    }
}
export const deleteProductInCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_prod } = req.params;

        const cart = await CartModel.findById(id)
        if (!cart)
            return res.status(404).json({
                msg: 'Cart not found',
            });

        const indiceProd = cart.prods.findIndex((prod => prod === id_prod))
        if (!indiceProd)
            return res.status(404).json({
                msg: 'product not found in cart'
            })
        cart.prods.splice(indiceProd,1)
        await CartModel.findByIdAndUpdate(
            id, 
            cart,
            { new: true}
        );

        res.status(200).json({
            msg: 'Product from Cart has been deleted',
        });
    } catch (err) {
        next(err);
    }
}