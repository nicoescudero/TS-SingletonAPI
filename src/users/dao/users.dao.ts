import mongooseService from '../../common/services/mongoose.service';
import { CreateUser } from '../dto/createUser.dto';
import { UpdateUser } from '../dto/updateUsers.dto';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao{
  private Schema = mongooseService.getMongoose().Schema;
  private userSchema = new this.Schema({
    username: String,
    password: {type: String, select: false},
    email: String
  });

  private User = mongooseService.getMongoose().model('User',this.userSchema);
  
  constructor(){
    log('daoUser');
  }

  async addUser(data: CreateUser){
    data.password = await argon2.hash(data.password);
    const user = new this.User({
      username: data.username,
      email: data.email,
      password: data.password
    });
    await user.save();
    return user;
  }

  async getUsers(limit: number, page: number){
    const users = await this.User.find().limit(limit).skip(limit * page).exec();
    return users;
  }

  async getUserById(id: string){
    const user = await this.User.findOne({_id: id}).exec();
    return user;
  }

  async getUserByEmal(email: string){
    const user = await this.User.findOne({email: email}).exec();
    return user;  
  }

  async updateUser(id: string, userFields: UpdateUser){
   try {
    const user = await this.User.findOneAndUpdate({ _id: id},{ $set: userFields }, {new: true}).exec();
    return user;
   } catch (error) {
    return error;
   }
  }

  async deleteUser(id: string){
    try {
      const user = await this.User.findOneAndDelete({_id: id}).exec();
      return user;
    } catch (error) {
      return error;
    }
  }
}

export default new UsersDao();