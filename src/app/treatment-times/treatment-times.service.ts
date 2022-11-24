import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TreatmentTime,
  TreatmentTimeDocument,
} from 'src/schemas/treatment-time.schema';
import { CustomersService } from '../customers/customers.service';
import { DoctorsService } from '../doctors/doctors.service';
import { CreateTreatmentTimeDto } from './dto/create-treatment-time.dto';
import { SearchTreatmentTimeDto } from './dto/search-treatment-time.dto';
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
    const now: Date = new Date();
    const startTime: Date = new Date(dto.start_time);

    if (startTime < now) throw new BadRequestException('PAST_TENSE');

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
    // buruu bichijee
    // paginiation
    //
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

  async todayCount(): Promise<number> {
    let startTime: Date = new Date();
    let endTime: Date = new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 999);

    return await this.treatmentTimeModel.count({
      start_time: { $gte: startTime },
      end_time: { $lte: endTime },
    });
  }

  async findByDate(startDate: Date, endDate: Date) {
    return await this.treatmentTimeModel.find({
      start_time: { $gte: startDate },
      end_time: { $lte: endDate },
    });
  }

  async findFuture() {
    return await this.treatmentTimeModel
      .find({
        start_time: { $gte: new Date() },
      })
      .populate(['doctor', 'customer', 'created_by', 'updated_by'])
      .sort('start_time');
  }

  async search(dto: SearchTreatmentTimeDto) {
    const { page, page_size } = dto;
    if (dto.start_date && dto.end_date) {
      var startDate = new Date(dto.start_date);
      startDate.setHours(0);
      startDate.setHours(0);
      startDate.setSeconds(0);

      var endDate = new Date(dto.end_date);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
    }

    const data = await this.treatmentTimeModel
      .find({
        start_time: { $gte: startDate },
        end_time: { $lte: endDate },
        'customer.phone': { $regex: `${dto.customer_phone}`, $options: 'i' },
        doctor: dto.doctor,
      })
      .skip((+page - 1) * +page_size)
      .limit(+page_size);

    return {
      data,
      meta: {
        page,
        page_size,
      },
    };
  }
}
