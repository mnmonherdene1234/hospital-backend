import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers/info')
export class CustomersInfoController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('count')
  count() {
    return this.customersService.count();
  }
}
