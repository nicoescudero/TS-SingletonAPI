import mongooseService from '../../common/services/mongoose.service';
import { Product } from '../dto/product.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class ProductDao{
  private Schema = mongooseService.getMongoose().Schema;
  private productSchema = new this.Schema({
    name: String,
    description: String,
    price: Number
  });
  
  private Product = mongooseService.getMongoose().model('Product', this.productSchema);

  constructor(){
    log('daoProduct');
  }

  async getProduct(id: string){
    try {
      const product = await this.Product.findById({ _id: id}).exec();
      return product;      
    } catch (error) {
      return error;
    }
  }

  async getListProduct(limit: number, page: number){
    try {
      const products = await this.Product.find().limit(limit).skip(limit * page).exec();
      return products;      
    } catch (error) {
      return error;
    }
  }

  async addProduct(productFields: Product){
    const product = new this.Product({
      name: productFields.name,
      description: productFields.description,
      price: productFields.price
    });
    await product.save();
    return product;
  }

  async updateProduct(id: string, productFields: Product){
    try {
      const product = await this.Product.findOneAndUpdate({_id: id},{ $set: productFields},{new: true}).exec();
      return product;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id: string){
    try {
      const product = await this.Product.findOneAndDelete({_id: id}).exec();
      return product;
    } catch (error) {
      return error;
    }
  }
}

export default new ProductDao();