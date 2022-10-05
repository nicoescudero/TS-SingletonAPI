import debug from 'debug';
import { Request, Response } from 'express';
import messageService from '../services/message.service';

const log: debug.IDebugger = debug('app:message-controller');

class MessageController{
  async createMessage(req: Request, res: Response){
    const message = await messageService.create(req.body);
    return res.json(message);
  }
  async getMessageList(_req: Request, res: Response){
    const messageList = await messageService.list(100,0);
    return res.json(messageList);
  }
  async getMessageById(req: Request, res: Response){
    const message = await messageService.getById(req.params.id);
    return res.json(message);
  }
  async putMessageById(req: Request, res: Response){
    const message = await messageService.putById(req.params.id, req.body);
    return res.json(message);
  }
  async patchMessageById(req: Request, res: Response){
    const message = await messageService.patchById(req.params.id, req.body);
    return res.json(message);
  }
  async deleteMessageByID(req: Request, res: Response){
    log(await messageService.deleteById(req.params.id));
    return res.status(204).send();
  }
}

export default new MessageController();