import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type DoctorDocument = Doctor & Document;

@Schema(transform)
export class Doctor extends BaseSchema {
  static schemaName: string = 'doctors';

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
  })
  phone: string;

  @Prop({
    type: Number,
  })
  salary: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
