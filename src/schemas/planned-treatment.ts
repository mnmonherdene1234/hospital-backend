import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { BaseSchema } from './utils/base.schema';
import { Service } from './service.schema';
import { Customer } from './customer.schema';
import transform from './utils/transform';

export type PlannedTreatmentDocument = PlannedTreatment & Document;

@Schema(transform)
export class PlannedTreatment extends BaseSchema {
  static schemaName: string = 'planned-treatments';

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer.schemaName,
  })
  customer: Customer;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Service.schemaName,
  })
  basic_service: Service;

  @Prop({
    type: Number,
    default: 0,
  })
  basic_input: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Service.schemaName,
  })
  additional_service: Service;

  @Prop({
    type: Number,
    default: 0,
  })
  additional_input: number;

  @Prop({
    type: Date,
    default: now(),
  })
  date: Date;
}

export const PlannedTreatmentSchema =
  SchemaFactory.createForClass(PlannedTreatment);
