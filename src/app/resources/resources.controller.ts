import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesService } from './resources.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createResource: CreateResourceDto, @Req() req: any) {
    createResource.created_by = req.user.id;
    return this.resourcesService.create(createResource);
  }

  @Roles(Role.Admin, Role.Worker)
  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Roles(Role.Admin, Role.Worker)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResource: UpdateResourceDto,
    @Req() req: any,
  ) {
    updateResource.updated_by = req.user.id;
    return this.resourcesService.update(id, updateResource);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
