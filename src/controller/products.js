const fs = require('fs');

class Products {
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

  async save(newProduct) {
    const productos = await this.getData();

    productos.push(newProduct);

    await this.saveData(productos);

    return newProduct;
  }

  async getById(idProd) {
    const productos = await this.getData();

    const indice = productos.findIndex((unProducto) => {
      if (unProducto.id === idProd) return true;
      else return false;
    });

    if (indice === -1) return null;

    return productos[indice];
  }

  async getAll() {
    const products = await this.getData();

    return products;
  }

  async deleteById(id_prod) {
    const productos = await this.getData();

    const nuevoArray = productos.filter(
      (unProducto) => unProducto.id != id_prod
    );

    await this.saveData(nuevoArray);
  }

  async Update(id, newProduct) {
    const productos = await this.getAll();

    const indice = productos.findIndex((unProducto) => unProducto.id === id);

    if (indice < 0) throw new Error('no existe el producto');

    const productUpdated = {
      id,
      ...newProduct,
    };

    productos.splice(indice, 1, productUpdated);

    await this.saveData(productos);

    return productUpdated;
  }
}

const ProductsController = new Products('src/data/data.json');

module.exports = {
  ProductsController: ProductsController,
};
