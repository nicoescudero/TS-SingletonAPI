import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import userController from './controller/users.controller';

export class UserRoutes extends CommonRoutesConfig{
  constructor(app: express.Application){
    super(app, 'UserRoutes');
  }
  
  configureRoutes(){
    this.app.route('/users')
    .get(userController.getUsers)
    .post(userController.createUser);
    this.app.route('/users/:id')
    .get(userController.getUserById)
    .put(userController.putUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser);
    return this.app;
  }
}
