import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

export class UserRoutes extends CommonRoutesConfig{
  constructor(app: express.Application){
    super(app,'UserRoutes');
  };
  configureRoutes(){
    this.app.route('/users')
    .get((req: express.Request, res: express.Response)=>{
      return res.send('GET users');
    });

    return this.app;
  };
};
