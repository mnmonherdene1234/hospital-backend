import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TreatmentTime,
  TreatmentTimeDocument,
} from 'src/schemas/treatment-time.schema';
import { CustomersService } from '../customers/customers.service';
import { DoctorsService } from '../doctors/doctors.service';
import { CreateTreatmentTimeDto } from './dto/create-treatment-time.dto';
import { UpdateTreatmentTimeDto } from './dto/update-treatment-time.dto';

@Injectable()
export class TreatmentTimesService {
  constructor(
    @InjectModel(TreatmentTime.schemaName)
    private readonly treatmentTimeModel: Model<TreatmentTimeDocument>,
    private readonly doctorsService: DoctorsService,
    private readonly customersService: CustomersService,
  ) {}

  async create(dto: CreateTreatmentTimeDto) {
    this.doctorsService.exists(dto.doctor);
    const customer = await this.customersService.findByPhoneOrCreate(
      dto.customer_phone,
      dto.created_by,
    );
    dto.customer = customer.id;
    return await new this.treatmentTimeModel(dto).save();
  }

  async findAll() {
    return await this.treatmentTimeModel
      .find()
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.treatmentTimeModel
      .findById(id)
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
  }

  async update(id: string, dto: UpdateTreatmentTimeDto) {
    this.doctorsService.exists(dto.doctor);
    const customer = await this.customersService.findByPhoneOrCreate(
      dto.customer_phone,
      dto.created_by,
    );
    dto.customer = customer.id;
    return await this.treatmentTimeModel.findByIdAndUpdate(id, {
      $set: { ...dto },
    });
  }

  async remove(id: string) {
    return await this.treatmentTimeModel.findByIdAndDelete(id);
  }
}
