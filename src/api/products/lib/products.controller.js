const ProductsService = require('./products.service');
const errors = require('restify-errors');

module.exports = {
  async createProduct(req, res, next) {
    await ProductsService.createProduct(req.body.product).then(
      r => res.send(r)
      ).catch(err => res.send(400, err));
      next();
  },
  async getProduct(req, res, next) {
    res.send(await ProductsService.findById(req.params.id));
    next();
  },
  async listProducts(req, res, next) {
    res.send(await ProductsService.listProducts());
    next();
  },
  async updateProduct(req, res, next) {
    res.send(await ProductsService.updateProduct(req.params.id, req.body.product));
    next();
  },
  async deleteProduct(req, res, next) {
    await ProductsService.deleteProduct(req.params.id);
    res.send('Product deleted');
    next();
  },
};
