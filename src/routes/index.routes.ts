import express from 'express';
import debug from 'debug';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { UserRoutes } from '../users/users.routes.config';
import { MessageRoutes } from '../messages/messages.routes.config';
import { ProducRoutes } from '../products/products.routes.config';

const debugLog: debug.IDebugger = debug('app');

export class MyRoutes{
  private routes: Array <CommonRoutesConfig> = [];
  
  constructor(app: express.Application){
    const userRoutes = new UserRoutes(app);
    const messageRoutes = new MessageRoutes(app);
    const productRoutes = new ProducRoutes(app); 
    this.routes.push(userRoutes);
    this.routes.push(messageRoutes);
    this.routes.push(productRoutes);
  }

  loadRoutes(){
    this.routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
      route.configureRoutes();
    });
  }
}