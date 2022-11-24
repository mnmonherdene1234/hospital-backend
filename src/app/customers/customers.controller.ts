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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerSearchDto } from './dto/customer-search.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Roles(Role.Admin, Role.Worker)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto, @Request() req: any) {
    createCustomerDto.created_by = req.user.id;
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req: any,
  ) {
    updateCustomerDto.updated_by = req.user.id;
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }

  @Get('type/registered')
  findAllRegistered() {
    return this.customersService.findAllRegistered();
  }

  @Get('type/advice')
  findAllAdvice() {
    return this.customersService.findAllAdvice();
  }

  @Get('info/count')
  count() {
    return this.customersService.count();
  }

  @Get('info/search')
  search(@Query() query: CustomerSearchDto) {
    return this.customersService.search(query);
  }

  @Get('info/gender-donut')
  genderDonut() {
    return this.customersService.genderDonut();
  }

  @Get('info/registered-count')
  registeredCount(): Promise<number> {
    return this.customersService.registeredCount();
  }

  @Get('info/advice-count')
  adviceCount(): Promise<number> {
    return this.customersService.adviceCount();
  }
}
