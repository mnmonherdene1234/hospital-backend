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
  О = '1-О',
  A = '2-А',
  B = '3-В',
  AB = '4-АВ',
  Undefined = 'UNDIFINED',
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
  family_status: Gender;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: String,
  })
  image: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
