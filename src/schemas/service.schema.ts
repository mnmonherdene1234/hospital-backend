import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Resource } from './resource.schema';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type ServiceDocument = Service & Document;

export enum ServiceType {
  Package = 'PACKAGE',
  Basic = 'BASIC',
  Additional = 'ADDITIONAL',
}

export class ServiceResource {
  resource: Resource;
  quantity: number;
}

@Schema(transform)
export class Service extends BaseSchema {
  static schemaName: string = 'services';

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: [String],
  })
  images: string[];

  @Prop({
    type: String,
  })
  desc: string;

  @Prop({
    required: true,
    enum: ServiceType,
  })
  type: ServiceType;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Service.schemaName }],
  })
  services: Service[];

  @Prop({
    default: [],
    type: [
      raw({
        resource: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Resource.schemaName,
        },
        quantity: { type: Number, require: true },
      }),
    ],
  })
  resources: ServiceResource[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
