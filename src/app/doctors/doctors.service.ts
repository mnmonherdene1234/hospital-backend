import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.schemaName)
    private readonly doctorModel: Model<DoctorDocument>,
    @InjectModel(Treatment.schemaName)
    private readonly treatmentModel: Model<TreatmentDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    return await new this.doctorModel(createDoctorDto).save();
  }

  async findAll() {
    return await this.doctorModel.find().populate(['created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.doctorModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async exists(id: string) {
    if (!(await this.doctorModel.exists({ _id: id })))
      throw new NotFoundException('DOCTOR_NOTFOUND');
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorModel.findByIdAndUpdate(id, {
      $set: { ...updateDoctorDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    await this.treatmentModel.updateMany(
      { customer: id },
      { $set: { customer: null } },
    );
    return await this.doctorModel.findByIdAndDelete(id);
  }

  async count() {
    return await this.doctorModel.count();
  }
}
