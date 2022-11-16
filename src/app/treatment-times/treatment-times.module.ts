import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TreatmentTime,
  TreatmentTimeSchema,
} from 'src/schemas/treatment-time.schema';
import { CustomersModule } from '../customers/customers.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { UsersModule } from '../users/users.module';
import { TreatmentTimesController } from './treatment-times.controller';
import { TreatmentTimesService } from './treatment-times.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TreatmentTime.schemaName, schema: TreatmentTimeSchema },
    ]),
    UsersModule,
    DoctorsModule,
    CustomersModule,
  ],
  controllers: [TreatmentTimesController],
  providers: [TreatmentTimesService],
  exports: [TreatmentTimesService, MongooseModule],
})
export class TreatmentTimesModule {}
