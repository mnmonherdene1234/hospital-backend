import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from './customer.schema';
import { Doctor } from './doctor.schema';
import { Service } from './service.schema';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type TreatmentDocument = Treatment & Document;

@Schema(transform)
export class Treatment extends BaseSchema {
  static schemaName: string = 'treatments';

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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Service.schemaName }],
  })
  services: Service[];

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

  @Prop({
    required: true,
    type: Number,
  })
  price: number;
}

export const TreatmentSchema = SchemaFactory.createForClass(Treatment);
