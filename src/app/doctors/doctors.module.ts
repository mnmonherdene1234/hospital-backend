import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/schemas/doctor.schema';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.schemaName, schema: DoctorSchema },
    ]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService, MongooseModule],
})
export class DoctorsModule {}
