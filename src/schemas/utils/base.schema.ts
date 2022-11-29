import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { User } from '../user.schema';

@Schema()
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
    ref: 'users',
  })
  created_by: User;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  })
  updated_by: User;
}
