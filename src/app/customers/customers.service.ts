import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import QueryDto from '../utils/query.dto';
import { createCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: createCustomerDto) {
    return await new this.customerModel(createCustomerDto).save();
  }

  async findAll(query: QueryDto) {
    const { filter, sort, pagination } = query;

    return await this.customerModel
      .find(filter)
      .skip((pagination?.page - 1) * pagination?.pageSize)
      .limit(pagination?.pageSize)
      .sort(sort)
      .populate(['created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.customerModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async search(value: any) {
    const regexp = new RegExp(value, 'i');
    return await this.customerModel.find({
      $or: [{ name: regexp }, { email: regexp }, { phone: regexp }],
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.findByIdAndUpdate(id, {
      $set: { ...updateCustomerDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.customerModel.findByIdAndDelete(id);
  }
}
