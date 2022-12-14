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
import { CreateTreatmentTimeDto } from './dto/create-treatment-time.dto';
import { FindTreatmentTimeDto } from './dto/find-treatment-time.dto';
import { SearchTreatmentTimeDto } from './dto/search-treatment-time.dto';
import { UpdateTreatmentTimeDto } from './dto/update-treatment-time.dto';
import { TreatmentTimesService } from './treatment-times.service';

@Roles(Role.Admin, Role.Worker)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('treatment-times')
export class TreatmentTimesController {
  constructor(private readonly treatmentTimesService: TreatmentTimesService) {}

  @Post()
  create(@Body() dto: CreateTreatmentTimeDto, @Request() req: any) {
    dto.created_by = req.user.id;
    return this.treatmentTimesService.create(dto);
  }

  @Get()
  findAll(@Query() dto: FindTreatmentTimeDto) {
    return this.treatmentTimesService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentTimesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTreatmentTimeDto,
    @Request() req: any,
  ) {
    dto.updated_by = req.user.id;
    return this.treatmentTimesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentTimesService.remove(id);
  }

  @Get('info/today-count')
  todayCount(): Promise<number> {
    return this.treatmentTimesService.todayCount();
  }

  @Get('info/today-times')
  todayTimes() {
    return this.treatmentTimesService.todayTimes();
  }

  @Get('info/weekly-times')
  weeklyTimes() {
    return this.treatmentTimesService.weeklyTimes();
  }

  @Get('type/future')
  findFuture() {
    return this.treatmentTimesService.findFuture();
  }

  @Get('type/notifications')
  notifications() {
    return this.treatmentTimesService.notifications();
  }

  @Get('type/notifications/:id')
  getNotification(@Param('id') id: string) {
    return this.treatmentTimesService.getNotification(id);
  }

  @Post('search/all')
  search(@Body() searchDto: SearchTreatmentTimeDto) {
    return this.treatmentTimesService.search(searchDto);
  }
}
