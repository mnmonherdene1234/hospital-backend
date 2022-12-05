import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { BonusType } from 'src/schemas/bonus.schema';
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
    @Inject(forwardRef(() => CustomersService))
    private readonly customersService: CustomersService,
    private readonly servicesService: ServicesService,
    private readonly resourcesService: ResourcesService,
  ) {}

  async create(dto: CreateTreatmentDto) {
    await this.doctorsService.exists(dto.doctor);
    await this.customersService.exists(dto.customer);
    await this.servicesService.exists(dto.services);

    const services = await this.servicesService.findByIds(dto.services);

    dto.price = services.reduce((pre, cur) => (pre += cur.price), 0);

    const customer = await this.customersService.findOne(dto.customer);

    if (customer.bonus) {
      if (customer.bonus.type == BonusType.Price) {
        dto.discount = customer.bonus.discount;
        dto.price -= dto.discount;
      } else if (customer.bonus.type == BonusType.Percent) {
        const discount = (dto.price / 100) * customer.bonus.discount;
        dto.price -= discount;
        dto.discount = discount;
      } else {
        throw new BadRequestException('CUSTOMER_BONUS_TYPE_UNDEFINED');
      }

      dto.bonus = customer.bonus['id'];
    }

    dto.services.forEach(async (service) => {
      const res = await this.servicesService.findOne(service);
      res.resources.forEach(async (resource) => {
        await this.resourcesService.decrease(
          resource.resource['id'],
          resource.quantity,
        );
      });
    });

    return await new this.treatmentModel(dto).save();
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
    await this.exists(id);
    const treatment = await this.treatmentModel.findById(id);

    if (updateTreatmentDto.services) {
      // increase previous resources
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

      // decrease new resources
      updateTreatmentDto.services.forEach(async (service) => {
        const res = await this.servicesService.findOne(service);
        res.resources.forEach(async (resource) => {
          await this.resourcesService.decrease(
            resource.resource['id'],
            resource.quantity,
          );
        });
      });
    }

    return await this.treatmentModel.findByIdAndUpdate(id, {
      $set: { ...updateTreatmentDto, updated_at: now() },
    });
  }

  async remove(id: string) {
    await this.exists(id);
    const treatment = await this.treatmentModel.findById(id);
    const now: Date = new Date();

    if (treatment.end_time < now)
      throw new BadRequestException('COMPLETED_TREATMENT');

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

    return await this.treatmentModel.findByIdAndDelete(id);
  }

  async findByCustomer(id: string) {
    return await this.treatmentModel
      .find({ customer: id })
      .populate(['doctor', 'customer', 'services', 'created_by', 'updated_by']);
  }

  async customerTotal(customer_id: string) {
    const treatments = await this.treatmentModel.find({
      customer: customer_id,
    });

    let total: number = 0;

    treatments.forEach((treatment) => {
      total += treatment.price;
    });

    return total;
  }

  async servicesChart() {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() - 7);

    const treatments = await this.treatmentModel
      .find({
        created_at: { $gte: today },
      })
      .select(['services', 'created_at'])
      .populate('services');

    type ServiceType = {
      id: string;
      name: string;
      date: Date;
    };

    type GroupServiceType = {
      id: string;
      name: string;
      services: ServiceType[];
      count: number;
    };

    const services: ServiceType[] = [];

    treatments.forEach((treatment) => {
      treatment.services.forEach((service) => {
        services.push({
          id: service['id'],
          name: service.name,
          date: new Date(treatment.created_at),
        });
      });
    });

    const servicesIds: string[] = services.map((service) => service.id);
    const uniqueServicesIds: string[] = [...new Set(servicesIds)];

    const serviceGroups: GroupServiceType[] = [];

    uniqueServicesIds.forEach((uniqueId) => {
      const groupServices = services.filter(
        (service) => service.id === uniqueId,
      );
      serviceGroups.push({
        id: uniqueId,
        name: groupServices[0]?.name ?? 'NO_NAME',
        services: groupServices,
        count: groupServices.length,
      });
    });

    serviceGroups.sort((a, b) => (a.count < b.count ? 1 : -1));

    const top3 = serviceGroups.slice(0, 3);

    const days: string[] = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];

    const now: Date = new Date();
    now.setHours(0, 0, 0, 0);

    const dates: Date[] = [];
    const categories: string[] = [];

    for (let i = 7; i >= 1; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      categories.push(days[date.getDay()]);
      dates.push(date);
    }

    type SeriesType = {
      name: string;
      data: number[];
    };

    const series: SeriesType[] = [];

    top3.forEach((top) => {
      let topSeries: SeriesType = {
        name: top.name,
        data: [],
      };

      dates.forEach((date) => {
        const startDate: Date = new Date(date);
        const endDate: Date = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const count: number = services.filter(
          (service) =>
            service.date >= startDate &&
            service.date <= endDate &&
            service.id == top.id,
        ).length;

        topSeries.data.push(count);
      });

      series.push(topSeries);
    });

    if (!series) {
      series.push({
        name: 'Үйлчилгээ',
        data: [0, 0, 0, 0, 0, 0, 0],
      });
    }

    return {
      series,
      categories,
    };
  }
}
