import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type ServiceDocument = Service & Document;

@Schema(transform)
export class Service extends BaseSchema {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
