import UserModel from '../schema/user-schema.js';
import { ObjectId } from 'mongodb';

export class UserService {
  constructor() {}

  async create(user) {
    await UserModel.create(user);
  }

  async findAll() {
    return await UserModel.find({});
  }

  async find(id) {
    return await UserModel.findById(ObjectId(id));
  }
}
