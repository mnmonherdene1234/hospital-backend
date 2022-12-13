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
  role: string;
}

@Schema(transform)
export class Doctor extends BaseSchema {
  static schemaName: string = 'doctors';

  @Prop({
    default: 'Овог',
    type: String,
  })
  first_name: string;

  @Prop({
    default: 'Нэр',
    type: String,
  })
  last_name: string;

  @Prop({
    default: 'Эмч',
    type: String,
  })
  role: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
    default: '#64A2F8',
  })
  color: string;

  @Prop({
    type: String,
  })
  phone: string;

  @Prop({
    type: String,
  })
  desc: string;

  @Prop({
    type: String,
  })
  experiences_desc: string;

  @Prop({
    type: String,
    default:
      'https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png',
  })
  profile_img: string;

  @Prop({
    type: Number,
  })
  salary: number;

  @Prop({
    default: [
      { id: 0, day: 'sunday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 1, day: 'monday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 2, day: 'tuesday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 3, day: 'wednesday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 4, day: 'thursday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 5, day: 'friday', start_time: '09:00:00', end_time: '18:00:00' },
      { id: 6, day: 'saturday', start_time: '09:00:00', end_time: '18:00:00' },
    ],
  })
  working_hours: WorkingHours[];

  @Prop()
  experiences: Experience[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
