import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from './customer.schema';
import { Doctor } from './doctor.schema';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type TreatmentTimeDocument = TreatmentTime & Document;

@Schema(transform)
export class TreatmentTime extends BaseSchema {
  static schemaName: string = 'treatment_times';

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Doctor.schemaName,
  })
  doctor: Doctor;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer.schemaName,
  })
  customer: Customer;

  @Prop({
    required: true,
    type: Date,
  })
  start_time: Date;

  @Prop({
    required: true,
    type: Date,
  })
  end_time: Date;
}

export const TreatmentTimeSchema = SchemaFactory.createForClass(TreatmentTime);
