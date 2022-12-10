import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PlannedTreatment,
  PlannedTreatmentDocument,
} from 'src/schemas/planned-treatment';
import { CreatePlannedTreatmentDto } from './dto/create-planned-treatment';
import { UpdatePlannedTreatmentDto } from './dto/update-planned-treatment';

@Injectable()
export class PlannedTreatmentsService {
  constructor(
    @InjectModel(PlannedTreatment.schemaName)
    private readonly plannedTreatmentModel: Model<PlannedTreatmentDocument>,
  ) {}

  async create(dto: CreatePlannedTreatmentDto) {
    return await new this.plannedTreatmentModel(dto).save();
  }

  async findAll() {
    return await this.plannedTreatmentModel
      .find()
      .populate([
        'created_by',
        'updated_by',
        'customer',
        'basic_service',
        'additional_service',
      ]);
  }

  async findOne(id: string) {
    return await this.plannedTreatmentModel
      .findById(id)
      .populate([
        'created_by',
        'updated_by',
        'customer',
        'basic_service',
        'additional_service',
      ]);
  }

  async update(id: string, dto: UpdatePlannedTreatmentDto) {
    return await this.plannedTreatmentModel.findByIdAndUpdate(id, {
      $set: { ...dto },
    });
  }

  async remove(id: string) {
    return await this.plannedTreatmentModel.findByIdAndDelete(id);
  }
}
