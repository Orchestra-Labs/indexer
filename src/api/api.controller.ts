import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from '@/api/api.service';

type GetMarketParamsQuery = {
  startDate: string;
  endDate: string;
};

@Controller('api')
export class ApiController {
  constructor(private readonly service: ApiService) {}

  @Get('market-params')
  async getMarketParams(@Query() query: GetMarketParamsQuery) {
    return this.service.getMarketParams(
      new Date(query.startDate),
      new Date(query.endDate),
    );
  }
}
