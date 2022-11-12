import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { User } from '../user.schema';

@Schema({
  toJSON: {
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
})
export class BaseSchema {
  @Prop({
    type: Date,
    default: now(),
  })
  created_at: Date;

  @Prop({
    type: Date,
    default: null,
  })
  updated_at: Date;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  created_by: User;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  })
  updated_by: User;
}
