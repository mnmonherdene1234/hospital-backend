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
import { QuestionDto } from './dto/question.dto';
import { QuestionsService } from './questions.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: QuestionDto, @Req() req: any) {
    dto.created_by = req.user.id;
    return this.questionsService.create(dto);
  }

  @Roles(Role.Admin, Role.Worker)
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Roles(Role.Admin, Role.Worker)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: QuestionDto, @Req() req: any) {
    dto.updated_by = req.user.id;
    return this.questionsService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
