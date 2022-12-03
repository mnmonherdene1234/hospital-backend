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
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus';
import { UpdateBonusDto } from './dto/update-bonus';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateBonusDto, @Req() req: any) {
    dto.created_by = req.user.id;
    return this.bonusService.create(dto);
  }

  @Get()
  findAll() {
    return this.bonusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bonusService.findOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBonusDto,
    @Req() req: any,
  ) {
    dto.updated_by = req.user.id;
    return this.bonusService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonusService.remove(id);
  }

  @Roles(Role.Admin)
  @Get(':id/customers')
  bonusCustomers(@Param('id') id: string) {
    return this.bonusService.bonusCustomers(id);
  }
}
