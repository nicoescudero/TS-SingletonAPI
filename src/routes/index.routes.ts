import express from 'express';
import debug from 'debug';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { UserRoutes } from '../users/users.routes.config';

const debugLog: debug.IDebugger = debug('app');

export class MyRoutes{
  private routes: Array <CommonRoutesConfig> = [];
  
  constructor(app: express.Application){
    const userRoutes = new UserRoutes(app);
    this.routes.push(userRoutes);
  }

  loadRoutes(){
    this.routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
      route.configureRoutes();
    });
  }
}