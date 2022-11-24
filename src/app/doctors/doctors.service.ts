import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import {
  TreatmentTime,
  TreatmentTimeDocument,
} from 'src/schemas/treatment-time.schema';
import { Treatment, TreatmentDocument } from 'src/schemas/treatment.schema';
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
    @InjectModel(TreatmentTime.schemaName)
    private readonly treatmentTimesModel: Model<TreatmentTimeDocument>,
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

  async available(findAvailableDoctorsDto: FindAvailableDoctorsDto) {
    const startTime: Date = new Date(findAvailableDoctorsDto.start_time);
    const endTime: Date = new Date(findAvailableDoctorsDto.end_time);
    const day = startTime.getDay();
    const doctors = await this.findAll();
    let restCheckedDoctors = [];

    doctors.forEach(async (doctor) => {
      const doctorDay = doctor.working_hours[day - 1];
      if (!doctorDay?.start_time || !doctorDay?.end_time) return;

      const doctorStartTime: Date = new Date(startTime);
      const [startHours, startMinutes, startSeconds] =
        doctorDay.start_time.split(':');
      doctorStartTime.setHours(+startHours);
      doctorStartTime.setMinutes(+startMinutes);
      doctorStartTime.setSeconds(+startSeconds);

      const doctorEndTime: Date = new Date(endTime);
      const [endHours, endMinutes, endSeconds] = doctorDay.end_time.split(':');
      doctorEndTime.setHours(+endHours);
      doctorEndTime.setMinutes(+endMinutes);
      doctorEndTime.setSeconds(+endSeconds);

      if (startTime >= doctorStartTime && endTime <= doctorEndTime) {
        restCheckedDoctors.push(doctor);
      }
    });

    const treatmentTimes = await this.treatmentTimesModel.find({
      $or: [
        { end_time: { $lte: endTime, $gte: startTime } },
        { start_time: { $gte: startTime, $lte: endTime } },
        {
          start_time: { $gte: startTime },
          end_time: { $lte: endTime },
        },
        {
          start_time: { $lte: startTime },
          end_time: { $gte: endTime },
        },
      ],
    });

    let busyDoctorsIds: string[] = [];

    treatmentTimes.forEach(async (treatmentTime) => {
      busyDoctorsIds.push(treatmentTime.doctor as unknown as string);
    });

    let availableDoctors = [];

    for (let i = 0; i < restCheckedDoctors.length; i++) {
      let isBusy = false;
      for (let k = 0; k < busyDoctorsIds.length; k++) {
        if (restCheckedDoctors[i].id == busyDoctorsIds[k]) {
          isBusy = true;
          break;
        }
      }

      if (!isBusy) {
        availableDoctors.push(restCheckedDoctors[i]);
      }
    }

    return availableDoctors;
  }
}
