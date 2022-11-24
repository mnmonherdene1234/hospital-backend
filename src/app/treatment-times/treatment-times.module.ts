import { forwardRef, Global, Module } from '@nestjs/common';
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
    forwardRef(() => CustomersModule),
    forwardRef(() => DoctorsModule),
  ],
  controllers: [TreatmentTimesController],
  providers: [TreatmentTimesService],
  exports: [MongooseModule, TreatmentTimesService],
})
export class TreatmentTimesModule {}
