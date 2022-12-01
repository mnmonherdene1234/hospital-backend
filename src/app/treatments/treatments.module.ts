import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Treatment, TreatmentSchema } from 'src/schemas/treatment.schema';
import { BonusModule } from '../bonus/bonus.module';
import { CustomersModule } from '../customers/customers.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { ResourcesModule } from '../resources/resources.module';
import { ServicesModule } from '../services/services.module';
import { UsersModule } from '../users/users.module';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Treatment.schemaName, schema: TreatmentSchema },
    ]),
    UsersModule,
    forwardRef(() => DoctorsModule),
    forwardRef(() => CustomersModule),
    forwardRef(() => ServicesModule),
    forwardRef(() => BonusModule),
    ResourcesModule,
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
  exports: [TreatmentsService, MongooseModule],
})
export class TreatmentsModule {}
