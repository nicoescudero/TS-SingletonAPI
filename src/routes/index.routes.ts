import express from 'express';
import debug from 'debug';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { UserRoutes } from '../users/users.routes.config';
import { MessageRoutes } from '../messages/messages.routes.config';
const debugLog: debug.IDebugger = debug('app');

export class MyRoutes{
  private routes: Array <CommonRoutesConfig> = [];
  
  constructor(app: express.Application){
    const userRoutes = new UserRoutes(app);
    const messageRoutes = new MessageRoutes(app); 
    this.routes.push(userRoutes);
    this.routes.push(messageRoutes);
  }

  loadRoutes(){
    this.routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
      route.configureRoutes();
    });
  }
}