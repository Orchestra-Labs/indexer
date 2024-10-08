import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

type HealthzResponse = {
  isHealthy: boolean;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthz')
  getHealthz(): HealthzResponse {
    return {
      isHealthy: true,
    };
  }
}
