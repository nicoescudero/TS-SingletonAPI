import productDao from '../dao/product.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { Product } from '../dto/product.dto';

class ProductService implements CRUD{
  async create(resource: Product){
    return await productDao.addProduct(resource); 
  }
  async list(limit: number, page: number){
    return await productDao.getListProduct(limit, page);
  }
  async getById(id: string){
    return await productDao.getProduct(id);
  }
  async putById(id: string, resource: Product){
    return await productDao.updateProduct(id, resource);
  }
  async patchById(id: string, resource: Product){
    return await productDao.updateProduct(id, resource);
  }
  async deleteById(id: string){
    return await productDao.deleteProduct(id);
  }
}


export default new ProductService();