const fs = require('fs');

class Cart {
    constructor(filename) {
        this.file = filename;
    }

    async getData() {
        const data = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(data);
    }

    async saveData(data) {
        await fs.promises.writeFile(this.file, JSON.stringify(data, null, '\t'));
    }

    async save(newCart) {
        const carts = await this.getData();

        carts.push(newCart);

        await this.saveData(carts);

        return newCart;
    }

    async deleteCartById(id) {
        const carts = await this.getData();

        const nuevoArray = carts.filter(
            (cart) => cart.id != id
        );

        await this.saveData(nuevoArray);
    }

    async getById(id) {
        const carts = await this.getData();

        const indice = carts.findIndex((cart) => {
            if (cart.id === id) return true;
            else return false;
        });

        if (indice === -1) return null;

        return carts[indice];
    }

    async Update(id, cart) {
        const carts = await this.getData();

        const indice = carts.findIndex((cart) => cart.id === id);

        carts.splice(indice, 1, cart);

        await this.saveData(carts);
    }
    async getAllProds(id) {
        const carts = await this.getData();
        const indice = carts.findIndex((cart) => cart.id === id);

        const { ...prods } = carts[indice].prods
        return prods;
    }
    async deleteProdById(id, id_prod) {
        const carts = await this.getData();
        const indiceCart = carts.findIndex((cart) => cart.id === id);
        const indiceProd = carts[indiceCart].prods.findIndex((prod) => prod.id === id_prod);

        carts[indiceCart].prods.splice(indiceProd, 1);

        await this.saveData(carts);
    }
}

const CartController = new Cart('src/data/cart.json');

module.exports = {
    CartController: CartController,
};
