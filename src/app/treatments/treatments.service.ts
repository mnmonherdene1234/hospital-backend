import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { CustomersService } from '../customers/customers.service';
import { DoctorsService } from '../doctors/doctors.service';
import { ResourcesService } from '../resources/resources.service';
import { ServicesService } from '../services/services.service';
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
    private readonly resourcesService: ResourcesService,
  ) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    await this.doctorsService.exists(createTreatmentDto.doctor);
    await this.customersService.exists(createTreatmentDto.customer);
    await this.servicesService.exists(createTreatmentDto.services);
    const services = await this.servicesService.findByIds(
      createTreatmentDto.services,
    );
    createTreatmentDto.price = services.reduce(
      (pre, cur) => (pre += cur.price),
      0,
    );

    createTreatmentDto.services.forEach(async (service) => {
      const res = await this.servicesService.findOne(service);
      res.resources.forEach(async (resource) => {
        await this.resourcesService.decrease(
          resource.resource['id'],
          resource.quantity,
        );
      });
    });

    return await new this.treatmentModel(createTreatmentDto).save();
  }

  async findAll() {
    return await this.treatmentModel
      .find()
      .populate(['doctor', 'customer', 'services', 'created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.treatmentModel
      .findById(id)
      .populate(['doctor', 'customer', 'services', 'created_by', 'updated_by']);
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
    await this.exists(id);
    const treatment = await this.treatmentModel.findById(id);
    const now: Date = new Date();
    if (treatment.end_time > now) {
      const services = await this.servicesService.findByIds(
        treatment.services as unknown as string[],
      );

      services.forEach(async (service) => {
        service.resources.forEach(async (resource) => {
          await this.resourcesService.increase(
            resource.resource['id'],
            resource.quantity,
          );
        });
      });
    }
    return await this.treatmentModel.findByIdAndDelete(id);
  }

  async findByCustomer(id: string) {
    return await this.treatmentModel
      .find({ customer: id })
      .populate(['doctor', 'customer', 'services', 'created_by', 'updated_by']);
  }
}
