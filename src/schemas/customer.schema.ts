import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type CustomerDocument = Customer & Document;

@Schema(transform)
export class Customer extends BaseSchema {
  static schemaName: string = 'customers';

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  phone: string;

  @Prop({
    type: String,
  })
  email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
