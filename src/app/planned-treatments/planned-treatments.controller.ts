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
import { CreatePlannedTreatmentDto } from './dto/create-planned-treatment';
import { UpdatePlannedTreatmentDto } from './dto/update-planned-treatment';
import { PlannedTreatmentsService } from './planned-treatments.service';

@Roles(Role.Admin, Role.Worker)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('planned-treatments')
export class PlannedTreatmentsController {
  constructor(
    private readonly plannedTreatmentsService: PlannedTreatmentsService,
  ) {}

  @Post()
  create(@Body() dto: CreatePlannedTreatmentDto, @Req() req: any) {
    dto.created_by = req.user.id;
    return this.plannedTreatmentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.plannedTreatmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plannedTreatmentsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePlannedTreatmentDto,
    @Req() req: any,
  ) {
    dto.updated_by = req.user.id;
    return this.plannedTreatmentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plannedTreatmentsService.remove(id);
  }
}
