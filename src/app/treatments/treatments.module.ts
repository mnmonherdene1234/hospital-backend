import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Treatment, TreatmentSchema } from 'src/schemas/treatment.schema';
import { CustomersModule } from '../customers/customers.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { ServicesModule } from '../services/services.module';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Treatment.schemaName, schema: TreatmentSchema },
    ]),
    DoctorsModule,
    CustomersModule,
    ServicesModule,
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
  exports: [TreatmentsService, MongooseModule],
})
export class TreatmentsModule {}
