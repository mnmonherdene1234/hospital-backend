import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type DoctorDocument = Doctor & Document;

export class WorkingHours {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
}

export class Experience {
  desc: string;
  date: string;
}

@Schema(transform)
export class Doctor extends BaseSchema {
  static schemaName: string = 'doctors';

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  role: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
  })
  phone: string;

  @Prop({
    type: String,
    default: null,
  })
  profile_img: string;

  @Prop({
    type: Number,
  })
  salary: number;

  @Prop({
    default: [
      { id: 0, day: 'monday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 1, day: 'tuesday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 2, day: 'wednesday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 3, day: 'thursday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 4, day: 'friday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 5, day: 'saturday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 6, day: 'sunday', start_time: '09:00:00', end_time: '18:00:00' },
    ],
  })
  working_hours: WorkingHours[];

  @Prop()
  experiences: Experience[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
