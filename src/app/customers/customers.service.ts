import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import {
  Customer,
  CustomerDocument,
  CustomerType,
  Gender,
  Rate,
} from 'src/schemas/customer.schema';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerPaginationDto } from './dto/customer-pagination.dto';
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

  async create(createCustomerDto: CreateCustomerDto) {
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
      .populate(['created_by', 'updated_by'])
      .sort('-created_at');
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

  async pagination(pagination: CustomerPaginationDto) {
    const { page, page_size, gender, rate, type } = pagination;
    const filter: any = {};

    if (gender != Gender.All) filter.gender = gender;

    if (rate != Rate.All) filter.rate = rate;

    if (type == CustomerType.Registered)
      filter.gender = { $ne: Gender.Undefined };
    else if (type == CustomerType.Advice) filter.gender = Gender.Undefined;

    const data = await this.customerModel
      .find(filter)
      .skip((page - 1) * page_size)
      .limit(page_size)
      .populate(['created_by', 'updated_by'])
      .sort('-created_at');

    const total = await this.customerModel.count(filter);

    return {
      data,
      meta: {
        filter,
        page,
        page_size,
        total,
      },
    };
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

  calculateCustomerGrowth(newCount: number, oldCount: number) {
    const percent: number = +(
      100 * Math.abs((newCount - oldCount) / ((newCount + oldCount) / 2))
    ).toFixed(2);

    const distance: number = Math.abs(newCount - oldCount);

    return {
      new: newCount,
      old: oldCount,
      percent,
      distance,
    };
  }

  async weeklyGrowth() {
    const newCount: number = await this.customerModel.count();

    const now: Date = new Date();
    const weekAgo: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7,
    );
    const oldCount: number = await this.customerModel.count({
      created_at: { $lte: weekAgo },
    });

    return this.calculateCustomerGrowth(newCount, oldCount);
  }

  async monthlyGrowth() {
    const newCount: number = await this.customerModel.count();
    const monthAgo: Date = new Date();

    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0, 0, 0, 0);

    const oldCount: number = await this.customerModel.count({
      created_at: { $lte: monthAgo },
    });

    return this.calculateCustomerGrowth(newCount, oldCount);
  }

  async yearGrowth() {
    const newCount: number = await this.customerModel.count();
    const yearAgo: Date = new Date();

    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    yearAgo.setHours(0, 0, 0, 0);

    const oldCount: number = await this.customerModel.count({
      created_at: { $lte: yearAgo },
    });

    return this.calculateCustomerGrowth(newCount, oldCount);
  }
}
