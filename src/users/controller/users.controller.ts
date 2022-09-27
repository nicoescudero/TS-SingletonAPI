import express from 'express';
import debug from 'debug';
import UserService from '../services/users.service';
const log: debug.IDebugger = debug('app:user-controller');

class UserController{
  async getUsers(_req: express.Request, res: express.Response){
    const users = await UserService.list(100,0);
    return res.json(users);
  }
  
  async getUserById(req: express.Request, res: express.Response){
    const user = await UserService.getById(req.params.id);
    return res.json(user);
  }

  async createUser(req: express.Request, res: express.Response){
    const user = await UserService.create(req.body);
    return res.status(201).json(user);
  }

  async putUser(req: express.Request, res: express.Response){
    log(await UserService.putById(req.params.id, req.body));
    return res.status(204).send();
  }

  async patchUser(req: express.Request, res: express.Response){
    log(await UserService.patchById(req.params.id, req.body));
    return res.status(204).send();
  }

  async deleteUser(req: express.Request, res: express.Response){
    log(await UserService.deleteById(req.params.id));
    return res.status(204).send();
  }

}

export default new UserController();