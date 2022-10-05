import { CRUD } from '../../common/interfaces/crud.interface';
import messagesDao from '../dao/messages.dao';
import { CreateMessage } from '../dto/createMessage.dto';
import { UpdateMessage } from '../dto/updateMessage.dto';

class MessageService implements CRUD{
  async create(resource: CreateMessage){
    return await messagesDao.create(resource);
  }
  async list(limit: number, page: number){
    return await messagesDao.getMessages(limit,page);
  }
  async getById(id: string){
    return await messagesDao.getMessageById(id);
  }
  async putById (id: string, resource: UpdateMessage){
    const response = await messagesDao.updateMessageById(id,resource);
    return response;
  }
  async patchById (id: string, resource: UpdateMessage){
    return await messagesDao.updateMessageById(id,resource);
  }
  async deleteById(id: string){
    return await messagesDao.deleteMessageById(id);
  }
}

export default new MessageService();