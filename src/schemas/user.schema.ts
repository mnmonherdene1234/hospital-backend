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
  static schemaName: string = 'users';

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  first_name: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  last_name: string;

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
    required: false,
    type: String,
    default: null,
  })
  profile_img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
