import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Anything, AnythingSchema } from 'src/schemas/anything.schema';
import { UsersModule } from '../users/users.module';
import { AnythingController } from './anything.controller';
import { AnythingService } from './anything.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Anything.schemaName, schema: AnythingSchema },
    ]),
    UsersModule,
  ],
  controllers: [AnythingController],
  providers: [AnythingService],
  exports: [MongooseModule, AnythingService],
})
export class AnythingModule {}
