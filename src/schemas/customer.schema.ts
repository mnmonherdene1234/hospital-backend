import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type CustomerDocument = Customer & Document;

export enum Gender {
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
  Good = 'GOOD',
  Bad = 'BAD',
}

@Schema(transform)
export class Customer extends BaseSchema {
  static schemaName: string = 'customers';

  @Prop({
    type: String,
    default: 'Овог',
  })
  first_name: string;

  @Prop({
    type: String,
    default: 'Нэр',
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
    default: ""
  })
  email: string;

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
    enum: FamilyStatus,
    default: FamilyStatus.Undefined,
  })
  family_status: FamilyStatus;

  @Prop({
    enum: Rate,
    default: Rate.Good,
  })
  rate: Rate;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: String,
    default:
      'https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png',
  })
  image: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
