import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { FindAvailableDoctorsDto } from './dto/find-available.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto, @Request() req: any) {
    createDoctorDto.created_by = req.user.id;
    return this.doctorsService.create(createDoctorDto);
  }

@Roles(Role.Admin, Role.Worker)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Request() req: any,
  ) {
    updateDoctorDto.updated_by = req.user.id;
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }

  @Roles(Role.Admin, Role.Worker)
  @Get('info/count')
  count() {
    return this.doctorsService.count();
  }

  @Roles(Role.Admin, Role.Worker)
  @Get('type/available')
  available(@Query() findAvailableDoctorsDto: FindAvailableDoctorsDto) {
    return this.doctorsService.available(findAvailableDoctorsDto);
  }
}
