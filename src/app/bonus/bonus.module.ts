import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bonus, BonusSchema } from 'src/schemas/bonus.schema';
import { CustomersModule } from '../customers/customers.module';
import { TreatmentsModule } from '../treatments/treatments.module';
import { UsersModule } from '../users/users.module';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bonus.schemaName, schema: BonusSchema },
    ]),
    UsersModule,
    forwardRef(() => CustomersModule),
    forwardRef(() => TreatmentsModule),
  ],
  controllers: [BonusController],
  providers: [BonusService],
  exports: [MongooseModule, BonusService],
})
export class BonusModule {}
