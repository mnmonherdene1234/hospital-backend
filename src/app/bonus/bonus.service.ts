import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, now } from 'mongoose';
import { Bonus, BonusDocument, BonusType } from 'src/schemas/bonus.schema';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CustomersService } from '../customers/customers.service';
import { TreatmentsService } from '../treatments/treatments.service';
import { CreateBonusDto } from './dto/create-bonus';
import { UpdateBonusDto } from './dto/update-bonus';

@Injectable()
export class BonusService {
  constructor(
    @InjectModel(Bonus.schemaName)
    private readonly bonusModel: Model<BonusDocument>,
    @InjectModel(Customer.schemaName)
    private readonly customerModel: Model<CustomerDocument>,
    private readonly treatmentsService: TreatmentsService,
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  async create(dto: CreateBonusDto) {
    return await new this.bonusModel(dto).save();
  }

  async findAll() {
    return await this.bonusModel
      .find()
      .populate(['created_by', 'updated_by'])
      .sort('-created_at');
  }

  async findOne(id: string) {
    return await this.bonusModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async update(id: string, dto: UpdateBonusDto) {
    return await this.bonusModel.findByIdAndUpdate(id, {
      $set: { ...dto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.bonusModel.findByIdAndDelete(id);
  }

  async exists(id: string | string[]): Promise<void> {
    if (Array.isArray(id)) {
      const services = await this.bonusModel.find({ _id: { $in: id } });
      if (services.length !== id.length)
        throw new NotFoundException('BONUS_NOTFOUND');
    }

    if (!(await this.bonusModel.exists({ _id: id })))
      throw new NotFoundException('BONUS_NOTFOUND');
  }

  async bonusCustomers(bonus_id: string) {
    await this.exists(bonus_id);
    return await this.customersService.findByBonus(bonus_id);
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async checkCustomersBonus() {
    const bonuses = await this.bonusModel.find();
    const customers = await this.customerModel.find();

    customers.forEach(async (customer) => {
      let bonus_id: any;
      let maxCondition: number = 0;

      bonuses.forEach((bonus) => {
        if (customer.total >= bonus.condition) {
          if (bonus.condition > maxCondition) {
            maxCondition = bonus.condition;
            bonus_id = bonus.id;
          }
        }
      });

      if (customer.bonus != bonus_id) {
        customer.bonus = bonus_id;
        await customer.save();
      }
    });
  }
}
