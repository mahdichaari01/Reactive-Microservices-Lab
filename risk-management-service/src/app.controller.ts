import { Controller, Get } from '@nestjs/common';
import { RiskManagementSerivce } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: RiskManagementSerivce) {}

  @Get()
  getHello(): string {
    return "Hello World";
  }
}
