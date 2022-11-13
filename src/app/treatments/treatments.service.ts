import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { CustomersService } from '../customers/customers.service';
import { DoctorsService } from '../doctors/doctors.service';
import { ServicesService } from '../services/services.service';
import modelFind from '../utils/model-find';
import QueryDto from '../utils/query.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectModel(Treatment.schemaName)
    private readonly treatmentModel: Model<TreatmentDocument>,
    private readonly doctorsService: DoctorsService,
    private readonly customersService: CustomersService,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    await this.doctorsService.exists(createTreatmentDto.doctor);
    await this.customersService.exists(createTreatmentDto.customer);
    await this.servicesService.exists(createTreatmentDto.service);
    return await new this.treatmentModel(createTreatmentDto).save();
  }

  async findAll(query: QueryDto) {
    return await modelFind(this.treatmentModel, query);
  }

  async findOne(id: string) {
    return await this.treatmentModel
      .findById(id)
      .populate(['doctor', 'customer', 'service', 'created_by', 'updated_by']);
  }

  async exists(id: string) {
    if (!(await this.treatmentModel.exists({ _id: id })))
      throw new NotFoundException('TREATMENT_NOTFOUND');
  }

  async update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    return await this.treatmentModel.findByIdAndUpdate(id, {
      $set: { ...updateTreatmentDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.treatmentModel.findByIdAndDelete(id);
  }
}
