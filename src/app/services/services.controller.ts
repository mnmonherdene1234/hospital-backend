import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Request() req: any) {
    createServiceDto.created_by = req.user.id;
    return this.servicesService.create(createServiceDto);
  }

  @Roles(Role.Admin, Role.Worker)
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Roles(Role.Admin, Role.Worker)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req: any,
  ) {
    updateServiceDto.updated_by = req.user.id;
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Get('type/package')
  findPackages() {
    return this.servicesService.findPackages();
  }

  @Get('type/basic')
  findBasic() {
    return this.servicesService.findBasic();
  }

  @Get('type/additional')
  findAdditional() {
    return this.servicesService.findAdditional();
  }
}
