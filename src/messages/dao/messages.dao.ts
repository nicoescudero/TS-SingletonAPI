import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';
import { CreateMessage } from '../dto/createMessage.dto';
import { UpdateMessage } from '../dto/updateMessage.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class MessagesDao{
  private Schema = mongooseService.getMongoose().Schema;
  private messageSchema = new this.Schema({
    emmiterID: String,
    receiverID: String,
    socketID: String,
    message: String,
  });
  private Message = mongooseService.getMongoose().model('Message',this.messageSchema);
  constructor(){
    log('daoMessage');
  }

  async create(data: CreateMessage){
    const message = new this.Message({
      emmiterID: data.emmiterID,
      receiverID: data.receiverID,
      socketID: data.socketID,
      message: data.message
    });
    message.save();
    return message;
  }
  async getMessages(limit: number, page: number){
    const messages = await this.Message.find().limit(limit).skip(limit * page).exec();
    return messages;
  }
  async getMessageById(id: string){
    const message = await this.Message.findById(id).exec();
    return message;  
  }
  async updateMessageById(id: string, messageFields: UpdateMessage){
    const message = await this.Message.findOneAndUpdate({ _id: id}, {$set: messageFields}, { new: true}).exec();
    return message;
  }
  async deleteMessageById(id: string){
    const response = await this.Message.findOneAndDelete({ _id: id}).exec();
    return response;  
  }
}

export default new MessagesDao();