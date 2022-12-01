import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Bonus, BonusDocument } from 'src/schemas/bonus.schema';
import { CreateBonusDto } from './dto/create-bonus';
import { UpdateBonusDto } from './dto/update-bonus';

@Injectable()
export class BonusService {
  constructor(
    @InjectModel(Bonus.schemaName)
    private readonly bonusModel: Model<BonusDocument>,
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
      .populate(['created_by', 'updated_by'])
      .sort('-created_at');
  }

  async update(id: string, dto: UpdateBonusDto) {
    return await this.bonusModel.findByIdAndUpdate(id, {
      $set: { ...dto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.bonusModel.findByIdAndDelete(id);
  }
}
