import { Request, Response} from 'express';
import debug from 'debug';
import ProductService from '../services/product.service';

const log: debug.IDebugger = debug('app:product-controller');

class ProductController{
  async getAllProducts(_req: Request, res: Response){
    const products = await ProductService.list(0,0);
    return res.json(products);
  }

  async getProductById(req: Request, res: Response){
    const product = await ProductService.getById(req.params.id);
    return res.json(product);
  }

  async createProduct(req: Request, res: Response){
    const product = await ProductService.create(req.body);
    return res.json(product);
  }

  async putProductById(req: Request, res: Response){
    log(await ProductService.putById(req.params.id,req.body));  
    return res.status(204).send();
  }

  async patchProductById(req: Request, res: Response){
    log(await ProductService.patchById(req.params.id,req.body));  
    return res.status(204).send();
  }

  async deleteProductById(req: Request, res: Response){
    log(await ProductService.deleteById(req.params.id));
    return res.status(204).send();
  }
}

export default new ProductController();