import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type ResourceDocument = Resource & Document;

@Schema(transform)
export class Resource extends BaseSchema {
  static schemaName: string = 'resources';

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  image: string;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  quantity: number;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
