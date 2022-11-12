import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';

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
export class User extends BaseSchema {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
