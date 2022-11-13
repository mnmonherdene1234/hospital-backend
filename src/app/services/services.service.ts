import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Service, ServiceDocument } from 'src/schemas/service.schema';
import modelFind from '../utils/model-find';
import QueryDto from '../utils/query.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    return await new this.serviceModel(createServiceDto).save();
  }

  async findAll(query: QueryDto) {
    return await modelFind(this.serviceModel, query);
  }

  async findOne(id: string) {
    return await this.serviceModel.findById(id);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return await this.serviceModel.findByIdAndUpdate(id, {
      $set: { ...updateServiceDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.serviceModel.findByIdAndDelete(id);
  }
}