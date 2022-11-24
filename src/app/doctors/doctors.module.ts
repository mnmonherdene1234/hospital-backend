import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/schemas/doctor.schema';
import { TreatmentTimesModule } from '../treatment-times/treatment-times.module';
import { TreatmentsModule } from '../treatments/treatments.module';
import { UsersModule } from '../users/users.module';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.schemaName, schema: DoctorSchema },
    ]),
    forwardRef(() => TreatmentsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => TreatmentTimesModule),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService, MongooseModule],
})
export class DoctorsModule {}
