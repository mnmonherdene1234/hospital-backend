import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  signature() {
    return this.appService.signature();
  }

  @Delete('delete')
  remove(@Body('name') name: string) {
    return this.appService.deleteMedia(name);
  }
}
