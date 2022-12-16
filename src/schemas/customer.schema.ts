import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Bonus } from './bonus.schema';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type CustomerDocument = Customer & Document;

export enum CustomerType {
  All = 'ALL',
  Registered = 'REGISTERED',
  Advice = 'ADVICE',
}

export enum Gender {
  All = 'ALL',
  Male = 'MALE',
  Female = 'FEMALE',
  Undefined = 'UNDIFINED',
}

export enum FamilyStatus {
  NotMarried = 'NOT_MARRIED',
  Merried = 'MARRIED',
  Undefined = 'UNDIFINED',
}

export enum BloodType {
  O = '1-O',
  A = '2-A',
  B = '3-B',
  AB = '4-AB',
  Undefined = 'UNDIFINED',
}

export enum Rate {
  All = 'ALL',
  Good = 'GOOD',
  Bad = 'BAD',
}

@Schema(transform)
export class Customer extends BaseSchema {
  static schemaName: string = 'customers';

  @Prop({
    type: String,
    default: '-',
  })
  first_name: string;

  @Prop({
    type: String,
    default: '-',
  })
  last_name: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  phone: string;

  @Prop({
    type: String,
  })
  registration_number: string;

  @Prop({
    type: String,
  })
  employment: string;

  @Prop({
    type: String,
  })
  desc: string;

  @Prop({
    type: Date,
  })
  birthday: Date;

  @Prop({
    enum: Gender,
    default: Gender.Undefined,
  })
  gender: Gender;

  @Prop({
    enum: BloodType,
    default: BloodType.Undefined,
  })
  blood_type: BloodType;

  @Prop({
    enum: Rate,
    default: Rate.Good,
  })
  rate: Rate;

  @Prop({
    type: String,
    default:
      'https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png',
  })
  image: string;

  @Prop({
    type: [String],
    default: [],
  })
  images: string[];

  @Prop({
    type: [String],
    default: [],
  })
  food_advice_images: string[];

  @Prop({
    type: [String],
    default: [],
  })
  skin_care_images: string[];

  @Prop({
    type: Number,
    default: 0,
  })
  total: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Bonus.schemaName,
    default: null,
  })
  bonus: Bonus;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
