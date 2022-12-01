import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, now, Types } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import {
  TreatmentTime,
  TreatmentTimeDocument,
} from 'src/schemas/treatment-time.schema';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
import { TreatmentTimesService } from '../treatment-times/treatment-times.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { FindAvailableDoctorsDto } from './dto/find-available.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.schemaName)
    private readonly doctorModel: Model<DoctorDocument>,
    @InjectModel(Treatment.schemaName)
    private readonly treatmentModel: Model<TreatmentDocument>,
    @Inject(forwardRef(() => TreatmentTimesService))
    private readonly treatmentTimesService: TreatmentTimesService,
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

  async restlessDoctors(start: Date, end: Date) {
    const day = start.getDay();
    const doctors = await this.findAll();
    let restlessDoctors: Omit<
      Document<unknown, any, DoctorDocument> &
        Doctor &
        Document & {
          _id: Types.ObjectId;
        },
      never
    >[] = [];

    doctors.forEach(async (doctor) => {
      const doctorDay = doctor.working_hours[day];
      if (!doctorDay?.start_time || !doctorDay?.end_time) return;

      const doctorStartTime: Date = new Date(start);
      const [startHours, startMinutes, startSeconds] =
        doctorDay.start_time.split(':');
      doctorStartTime.setHours(+startHours);
      doctorStartTime.setMinutes(+startMinutes);
      doctorStartTime.setSeconds(+startSeconds);

      const doctorEndTime: Date = new Date(end);
      const [endHours, endMinutes, endSeconds] = doctorDay.end_time.split(':');
      doctorEndTime.setHours(+endHours);
      doctorEndTime.setMinutes(+endMinutes);
      doctorEndTime.setSeconds(+endSeconds);

      if (start >= doctorStartTime && end <= doctorEndTime) {
        restlessDoctors.push(doctor);
      }
    });

    return restlessDoctors;
  }

  async available(findAvailableDoctorsDto: FindAvailableDoctorsDto) {
    const startTime: Date = new Date(findAvailableDoctorsDto.start_time);
    const endTime: Date = new Date(findAvailableDoctorsDto.end_time);

    return await this.restlessDoctors(startTime, endTime);
  }
}
