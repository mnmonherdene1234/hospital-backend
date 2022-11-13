import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import modelFind from '../utils/model-find';
import QueryDto from '../utils/query.dto';
import { createCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.schemaName)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: createCustomerDto) {
    return await new this.customerModel(createCustomerDto).save();
  }

  async findAll(query: QueryDto) {
    return await modelFind(this.customerModel, query);
  }

  async findOne(id: string) {
    return await this.customerModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async exists(id: string) {
    if (!(await this.customerModel.exists({ _id: id })))
      throw new NotFoundException('CUSTOMER_NOTFOUND');
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
