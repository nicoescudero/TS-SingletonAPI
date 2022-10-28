import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import productController from './controller/product.controller';

export class ProducRoutes extends CommonRoutesConfig{
  constructor(app: express.Application){
    super(app, 'ProductRoutes');
  }
  configureRoutes() {
    this.app.route('/products')
    .get(productController.getAllProducts)
    .post(productController.createProduct);
    this.app.route('/products/:id')
    .get(productController.getProductById)
    .put(productController.putProductById)
    .patch(productController.patchProductById)
    .delete(productController.deleteProductById);
    return this.app;
  }
}
