import { CRUD } from '../../common/interfaces/crud.interface';
import UsersDao from '../dao/users.dao';
import { CreateUser } from '../dto/createUser.dto';
import { UpdateUser } from '../dto/updateUsers.dto';

class UserService implements CRUD{
  async create(resource: CreateUser){
    return await UsersDao.addUser(resource);
  }
  async getById(id: string){
    return await UsersDao.getUserById(id);
  }
  async list(limit: number, page: number){
    return await UsersDao.getUsers(limit,page);
  }
  async putById(id: string, resource: UpdateUser){
    return await UsersDao.updateUser(id, resource);
  }
  async patchById(id: string, resource: UpdateUser){
    return await UsersDao.updateUser(id, resource);
  }
  async deleteById(id: string){
    return await UsersDao.deleteUser(id);
  }
}

export default new UserService();