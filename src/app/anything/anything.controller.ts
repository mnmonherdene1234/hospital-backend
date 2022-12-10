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
import { AnythingService } from './anything.service';

@Roles(Role.Admin, Role.Worker)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('anything')
export class AnythingController {
  constructor(private readonly anythingService: AnythingService) {}

  @Post()
  create(@Body() body: any, @Req() req: any) {
    body.created_by = req.user.id;
    return this.anythingService.create(body);
  }

  @Get()
  findAll() {
    return this.anythingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anythingService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    body.updated_by = req.user.id;
    return this.anythingService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anythingService.remove(id);
  }

  @Get('questions/:id/customer/:customer_id')
  findCustomerQuestion(
    @Param('id') question: string,
    @Param('customer_id') customer: string,
  ) {
    return this.anythingService.findCustomerQuestion(question, customer);
  }

  @Get('customers/:id/q1')
  findCustomerQ1(@Param('id') id: string) {
    return this.anythingService.findCustomerQ1(id);
  }

  @Get('customers/:id/q2')
  findCustomerQ2(@Param('id') id: string) {
    return this.anythingService.findCustomerQ2(id);
  }
}
