import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bonus, BonusSchema } from 'src/schemas/bonus.schema';
import { UsersModule } from '../users/users.module';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bonus.schemaName, schema: BonusSchema },
    ]),
    UsersModule,
  ],
  controllers: [BonusController],
  providers: [BonusService],
  exports: [MongooseModule, BonusService],
})
export class BonusModule {}
