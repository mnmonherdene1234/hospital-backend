import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer extends BaseSchema {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  phone: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
