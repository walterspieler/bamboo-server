const Product = require('./products.schema');

class ProductsService {
  async createProduct(product) {
    const newProduct = new Product({ ...product });
    return await new Promise((resolve, reject) => {
      newProduct.save((err, u) => {
        if (err) {
          reject(err);
        }
        resolve(u);
      });
    }).catch(err=> {throw(err)});
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async listProducts() {
    return await Product.find();
  }

  async updateProduct(id, dto) {
    return await Product.findByIdAndUpdate(id, { $set: dto });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

}
module.exports = new ProductsService();
