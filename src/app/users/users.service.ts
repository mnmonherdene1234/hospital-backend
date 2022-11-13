import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Role, User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import modelFind from '../utils/model-find';
import QueryDto from '../utils/query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.schemaName)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    return await new this.userModel({ ...createUserDto, password }).save();
  }

  async findAll(query: QueryDto) {
    return await modelFind(this.userModel, query);
  }

  async findOne(id: string) {
    return await this.userModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async findByUsername(username: string): Promise<any | undefined> {
    return await this.userModel.findOne({ username });
  }

  async exists(id: string) {
    if (!(await this.userModel.exists({ _id: id })))
      throw new NotFoundException('USER_NOTFOUND');
  }

  async count() {
    return await this.userModel.count();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(updateUserDto.password, salt);

      return await this.userModel.findByIdAndUpdate(id, {
        $set: { ...updateUserDto, password, updated_at: now() },
      });
    }

    return await this.userModel.findByIdAndUpdate(id, {
      $set: { ...updateUserDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
