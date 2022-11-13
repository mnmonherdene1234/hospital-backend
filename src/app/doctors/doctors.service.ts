import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import modelFind from '../utils/model-find';
import QueryDto from '../utils/query.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    return await new this.doctorModel(createDoctorDto).save();
  }

  async findAll(query: QueryDto) {
    return await modelFind(this.doctorModel, query);
  }

  async findOne(id: string) {
    return await this.doctorModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorModel.findByIdAndUpdate(id, {
      $set: { ...updateDoctorDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    return await this.doctorModel.findByIdAndDelete(id);
  }
}
