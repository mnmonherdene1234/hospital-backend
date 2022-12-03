import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from 'src/schemas/resource.schema';
import { ServicesModule } from '../services/services.module';
import { UsersModule } from '../users/users.module';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resource.schemaName, schema: ResourceSchema },
    ]),
    UsersModule,
    ServicesModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [MongooseModule, ResourcesService],
})
export class ResourcesModule {}
