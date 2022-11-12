import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
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
}

export const UserSchema = SchemaFactory.createForClass(User);
