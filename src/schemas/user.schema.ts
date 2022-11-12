import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

export enum Role {
  Admin = 'ADMIN',
  Worker = 'WORKER',
}

export type UserDocument = User & Document;

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
export class User {
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    required: true,
    enum: Role,
    default: Role.Worker,
  })
  role: Role;

  @Prop({
    default: now(),
    type: Date,
  })
  created_at: Date;

  @Prop({
    type: Date,
    default: null,
  })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
