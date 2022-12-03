import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from 'src/schemas/resource.schema';
import { ServicesService } from '../services/services.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.schemaName)
    private readonly resourceModel: Model<ResourceDocument>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createResource: CreateResourceDto) {
    return await new this.resourceModel(createResource).save();
  }

  async findAll() {
    return await this.resourceModel
      .find()
      .populate(['created_by', 'updated_by']);
  }

  async findOne(id: string) {
    return await this.resourceModel.findById(id);
  }

  async update(id: string, updateResource: UpdateResourceDto) {
    return await this.resourceModel.findByIdAndUpdate(id, {
      $set: { ...updateResource },
    });
  }

  async remove(id: string) {
    await this.servicesService.removeResource(id);
    return await this.resourceModel.findByIdAndDelete(id);
  }

  async exists(id: string) {
    if (!(await this.resourceModel.exists({ _id: id })))
      throw new NotFoundException('RESOURCE_NOTFOUND');
  }

  async increase(id: string, quantity: number) {
    await this.exists(id);
    const resource = await this.resourceModel.findById(id);
    resource.quantity += quantity;
    return await resource.save();
  }

  async decrease(id: string, quantity: number) {
    await this.exists(id);
    const resource = await this.resourceModel.findById(id);

    resource.quantity -= quantity;
    if (resource.quantity < 0) throw new BadRequestException('OUT_OF_STOCK');

    return await resource.save();
  }
}
