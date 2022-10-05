import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import messageController from './controller/message.controller';

export class MessageRoutes extends CommonRoutesConfig{
  constructor(app: express.Application){
    super(app,'Messages');
  }
  configureRoutes(){
    this.app.route('/message')
    .get(messageController.getMessageList)
    .post(messageController.createMessage);
    this.app.route('/message/:id')
    .get(messageController.getMessageById)
    .put(messageController.putMessageById)
    .patch(messageController.patchMessageById)
    .delete(messageController.deleteMessageByID);
    return this.app;
  }
}