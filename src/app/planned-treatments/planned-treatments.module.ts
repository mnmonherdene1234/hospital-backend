import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlannedTreatment,
  PlannedTreatmentSchema,
} from 'src/schemas/planned-treatment';
import { UsersModule } from '../users/users.module';
import { PlannedTreatmentsController } from './planned-treatments.controller';
import { PlannedTreatmentsService } from './planned-treatments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlannedTreatment.schemaName, schema: PlannedTreatmentSchema },
    ]),
    UsersModule,
  ],
  controllers: [PlannedTreatmentsController],
  providers: [PlannedTreatmentsService],
  exports: [PlannedTreatmentsService, MongooseModule],
})
export class PlannedTreatmentsModule {}
