import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Service, ServiceDocument } from 'src/schemas/service.schema';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.schemaName)
    private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel(Treatment.schemaName)
    private readonly treatmentModel: Model<TreatmentDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    return await new this.serviceModel(createServiceDto).save();
  }

  async findAll() {
    return await this.serviceModel
      .find()
      .populate(['created_by', 'updated_by', 'services']);
  }

  async findOne(id: string) {
    return await this.serviceModel
      .findById(id)
      .populate(['created_by', 'updated_by', 'services']);
  }

  async exists(id: string | string[]): Promise<void> {
    if (Array.isArray(id)) {
      const services = await this.serviceModel.find({ _id: { $in: id } });
      if (services.length !== id.length)
        throw new NotFoundException('SERVICE_NOTFOUND');
    }

    if (!(await this.serviceModel.exists({ _id: id })))
      throw new NotFoundException('SERVICE_NOTFOUND');
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return await this.serviceModel.findByIdAndUpdate(id, {
      $set: { ...updateServiceDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    await this.treatmentModel.updateMany(
      { customer: id },
      { $set: { customer: null } },
    );
    return await this.serviceModel.findByIdAndDelete(id);
  }

  async findByIds(ids: string[]) {
    return await this.serviceModel.find({ _id: { $in: ids } });
  }
}
