import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Anything, AnythingDocument } from 'src/schemas/anything.schema';

@Injectable()
export class AnythingService {
  constructor(
    @InjectModel(Anything.schemaName)
    private readonly anythingModel: Model<AnythingDocument>,
  ) {}

  async create(dto: any) {
    return await new this.anythingModel(dto).save();
  }

  async findAll() {
    return await this.anythingModel
      .find()
      .populate(['created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.anythingModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async update(id: string, dto: any) {
    const anything = await this.findOne(id);
    dto.any = {
      ...anything.any,
      ...dto.any,
    };

    return await this.anythingModel.findByIdAndUpdate(id, {
      $set: { ...dto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.anythingModel.findByIdAndDelete(id);
  }

  async findCustomerQ1(customer_id: string) {
    return await this.anythingModel.findOne({
      'any.customer_id': customer_id,
      'any.type': 'q1',
    });
  }

  async findCustomerQ2(customer_id: string) {
    return await this.anythingModel.findOne({
      'any.customer_id': customer_id,
      'any.type': 'q2',
    });
  }
}
