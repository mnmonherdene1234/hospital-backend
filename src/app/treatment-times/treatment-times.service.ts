import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TreatmentTime,
  TreatmentTimeDocument,
} from 'src/schemas/treatment-time.schema';
import { CustomersService } from '../customers/customers.service';
import { CustomerSearchDto } from '../customers/dto/customer-search.dto';
import { DoctorsService } from '../doctors/doctors.service';
import { CreateTreatmentTimeDto } from './dto/create-treatment-time.dto';
import { SearchTreatmentTimeDto } from './dto/search-treatment-time.dto';
import { UpdateTreatmentTimeDto } from './dto/update-treatment-time.dto';
import { UserTimeDto, WeeklyTimesDto } from './dto/weekly-times.dto';

@Injectable()
export class TreatmentTimesService {
  constructor(
    @InjectModel(TreatmentTime.schemaName)
    private readonly treatmentTimeModel: Model<TreatmentTimeDocument>,
    @Inject(forwardRef(() => DoctorsService))
    private readonly doctorsService: DoctorsService,
    @Inject(forwardRef(() => CustomersService))
    private readonly customersService: CustomersService,
  ) {}

  async create(dto: CreateTreatmentTimeDto) {
    const now: Date = new Date();
    const startTime: Date = new Date(dto.start_time);
    const endTime: Date = new Date(dto.end_time);

    if (startTime < now) throw new BadRequestException('PAST_TENSE');

    this.doctorsService.exists(dto.doctor);

    const doctors = await this.doctorsService.restlessDoctors(
      startTime,
      endTime,
    );

    if (!doctors.some((doctor) => doctor?.id == dto.doctor))
      throw new BadRequestException('DOCTOR_IS_RESTING');

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
      .populate(['doctor', 'customer', 'created_by', 'updated_by'])
      .sort('-created_at')
      .limit(250);
  }

  async findOne(id: string) {
    return await this.treatmentTimeModel
      .findById(id)
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
  }

  async update(id: string, dto: UpdateTreatmentTimeDto) {
    await this.exists(id);
    const time = await this.findOne(id);

    const now: Date = new Date();
    const startTime: Date = new Date(dto.start_time);
    const endTime: Date = new Date(dto.end_time);
    const beforeEndTime: Date = new Date(time.end_time);

    if (endTime < now && beforeEndTime < now)
      throw new BadRequestException('PAST_TENSE');

    if (dto.customer_phone) {
      var customer = await this.customersService.findByPhoneOrCreate(
        dto.customer_phone,
        dto.created_by,
      );

      dto.customer = customer.id;
    }

    if (dto.doctor) {
      const availableDoctors = await this.doctorsService.restlessDoctors(
        startTime,
        endTime,
      );

      if (!availableDoctors.some((doctor) => doctor.id == dto.doctor)) {
        throw new BadRequestException('DOCTOR_IS_RESTING');
      }
    }

    return await this.treatmentTimeModel.findByIdAndUpdate(id, {
      $set: { ...dto },
    });
  }

  async remove(id: string) {
    await this.exists(id);
    const time = await this.treatmentTimeModel.findById(id);

    if (time.end_time < new Date()) throw new BadRequestException('PAST_TENSE');

    return await this.treatmentTimeModel.findByIdAndDelete(id);
  }

  async exists(id: string) {
    return await this.treatmentTimeModel.exists({ _id: id });
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

  async todayTimes() {
    let startTime: Date = new Date();
    let endTime: Date = new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 999);

    return await this.treatmentTimeModel
      .find({
        start_time: { $gte: startTime },
        end_time: { $lte: endTime },
      })
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
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

    let filter: any = {};

    if (dto.start_date && dto.end_date) {
      var startDate = new Date(dto.start_date);
      startDate.setHours(0);
      startDate.setHours(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);

      var endDate = new Date(dto.end_date);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      endDate.setMilliseconds(0);
      filter.start_date = { $gte: startDate };
      filter.endDate = { $lte: endDate };
    }

    if (dto.customer_phone) {
      let search: CustomerSearchDto = new CustomerSearchDto();
      search.phone = dto.customer_phone;
      const customers = await this.customersService.search(search);
      let customersIds: string[] = [];
      customers.forEach((customer) => {
        customersIds.push(customer.id);
      });

      filter.customer = { $in: customersIds };
    }

    if (dto.doctor) {
      filter.doctor = dto.doctor;
    }

    const data = await this.treatmentTimeModel
      .find(filter)
      .skip((+page - 1) * +page_size)
      .limit(+page_size)
      .populate(['doctor', 'customer', 'created_by', 'updated_by'])
      .sort('start_time');

    const total = await this.treatmentTimeModel.count(filter);

    return {
      data,
      meta: {
        page,
        page_size,
        filter,
        total,
      },
    };
  }

  async weeklyTimes() {
    const now: Date = new Date();
    now.setHours(0, 0, 0, 0);
    const weekLater: Date = new Date();
    weekLater.setHours(23, 59, 59, 999);
    weekLater.setDate(now.getDate() + 6);

    const times = await this.treatmentTimeModel
      .find({
        start_time: { $gte: now },
        end_time: { $lte: weekLater },
      })
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);

    const weeklyTimes: WeeklyTimesDto[] = [];

    for (let i = 0; i <= 6; i++) {
      const startTime: Date = new Date();
      startTime.setHours(0, 0, 0, 0);
      startTime.setDate(startTime.getDate() + i);
      const endTime: Date = new Date(startTime);
      endTime.setDate(startTime.getDate() + 1);

      const weeklyTime: WeeklyTimesDto = {
        date: startTime,
        day: startTime.getDay(),
        times: [],
      };

      const filtered = times.filter(
        (time) =>
          new Date(time.start_time) >= startTime &&
          new Date(time.start_time) <= endTime,
      );

      for (const time of filtered) {
        const userTime: UserTimeDto = {
          image: time?.customer?.image,
          name: `${time?.customer?.first_name} ${time?.customer?.last_name}`,
          phone: time?.customer?.phone,
          start_time: time?.start_time,
          end_time: time?.end_time,
        };

        weeklyTime.times.push(userTime);
      }

      weeklyTimes.push(weeklyTime);
    }

    return weeklyTimes;
  }

  async findNotificationTimes() {
    const now: Date = new Date();
    const hourLater = new Date(now.setHours(now.getHours() + 1));

    const times = await this.treatmentTimeModel.find({
      start_time: { $lte: hourLater },
      seen: false,
      sent: false,
    });

    await this.treatmentTimeModel.updateMany(
      {
        seen: false,
        sent: false,
      },
      { $set: { sent: true } },
    );

    return times;
  }

  async notifications() {
    const now: Date = new Date();
    const hourLater = new Date(now.setHours(now.getHours() + 1));

    return await this.treatmentTimeModel
      .find({
        start_time: { $lte: hourLater },
      })
      .sort('-start_time')
      .limit(10)
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
  }

  async getNotification(id: string) {
    return await this.treatmentTimeModel
      .findByIdAndUpdate(id, {
        $set: { seen: true },
      })
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
  }

  /**
   * Treatment times find by start date and end date
   * @param start
   * @param end
   * @returns 'doctor', 'customer', 'created_by', 'updated_by' populated array of time
   */
  async findByTimeRange(start: Date, end: Date) {
    return await this.treatmentTimeModel
      .find({
        $or: [
          { end_time: { $lt: end, $gt: start } },
          { start_time: { $gt: start, $lt: end } },
          {
            start_time: { $gt: start },
            end_time: { $lt: end },
          },
          {
            start_time: { $lt: start },
            end_time: { $gt: end },
          },
        ],
      })
      .populate(['doctor', 'customer', 'created_by', 'updated_by']);
  }
}
