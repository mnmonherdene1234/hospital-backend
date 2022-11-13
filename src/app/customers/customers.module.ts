import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';
import { CustomersController } from './customers.controller';
import { CustomersInfoController } from './customers.info.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.schemaName, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController, CustomersInfoController],
  providers: [CustomersService],
  exports: [CustomersService, MongooseModule],
})
export class CustomersModule {}
