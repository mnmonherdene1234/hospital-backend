import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import {
  Customer,
  CustomerDocument,
  Gender,
} from 'src/schemas/customer.schema';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { createCustomerDto } from './dto/create-customer.dto';
import { CustomerSearchDto } from './dto/customer-search.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.schemaName)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Treatment.schemaName)
    private readonly treatmentModel: Model<TreatmentDocument>,
  ) {}

  async create(createCustomerDto: createCustomerDto) {
    const customer = await this.findByPhone(createCustomerDto.phone);
    if (customer) {
      createCustomerDto.updated_by = createCustomerDto.created_by;
      delete createCustomerDto.created_by;
      const updated = await this.update(
        customer.id,
        createCustomerDto as UpdateCustomerDto,
      );
      return await this.findOne(updated.id);
    }

    return await new this.customerModel(createCustomerDto).save();
  }

  async findAll() {
    return await this.customerModel
      .find()
      .populate(['created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.customerModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.findByIdAndUpdate(id, {
      $set: { ...updateCustomerDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    await this.treatmentModel.updateMany(
      { customer: id },
      { $set: { customer: null } },
    );
    return await this.customerModel.findByIdAndDelete(id);
  }

  async exists(id: string) {
    if (!(await this.customerModel.exists({ _id: id })))
      throw new NotFoundException('CUSTOMER_NOTFOUND');
  }

  async search(search: CustomerSearchDto) {
    return await this.customerModel.find({
      $or: [
        { first_name: { $regex: `${search.name}`, $options: 'i' } },
        { last_name: { $regex: `${search.name}`, $options: 'i' } },
        { phone: { $regex: `${search.phone}`, $options: 'i' } },
        { email: { $regex: `${search.email}`, $options: 'i' } },
      ],
    });
  }

  async findByPhone(phone: string) {
    return await this.customerModel.findOne({ phone });
  }

  async findByPhoneOrCreate(phone: string, userId: string) {
    let customer = await this.customerModel.findOne({ phone });
    if (customer) return customer;
    return await new this.customerModel({ phone, created_by: userId }).save();
  }

  async genderDonut() {
    const customers = await this.customerModel.find().select('gender');

    const male = customers.filter((e) => e.gender == Gender.Male).length;
    const female = customers.filter((e) => e.gender == Gender.Female).length;

    const total = male + female;

    const malePercent = (male * 100) / total;
    const femalePercent = (female * 100) / total;

    return {
      labels: ['Эрэгтэй', 'Эмэгтэй'],
      series: [malePercent, femalePercent],
    };
  }

  async count() {
    return await this.customerModel.count();
  }

  async findAllRegistered() {
    return await this.customerModel.find({
      gender: { $ne: Gender.Undefined },
    });
  }

  async findAllAdvice() {
    return await this.customerModel.find({
      gender: Gender.Undefined,
    });
  }

  async registeredCount(): Promise<number> {
    return await this.customerModel.count({
      gender: { $ne: Gender.Undefined },
    });
  }

  async adviceCount(): Promise<number> {
    return await this.customerModel.count({
      gender: Gender.Undefined,
    });
  }
}
