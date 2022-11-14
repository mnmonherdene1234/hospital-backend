import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type CustomerDocument = Customer & Document;

@Schema(transform)
export class Customer extends BaseSchema {
  static schemaName: string = 'customers';

  @Prop({
    type: String,
    default: 'Нэргүй',
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  phone: string;

  @Prop({
    type: String,
  })
  email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
