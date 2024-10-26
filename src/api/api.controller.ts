import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from '@/api/api.service';
import { GetMarketParamsQuery } from '@/api/model/GetMarketParamsRequest';
import { GetExchangeRequirementsRequest } from '@/api/model/GetExchangeRequirementsRequest';
import { GetTaxRateRequest } from '@/api/model/GetTaxRateRequest';

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

  @Get('exchange-requirements')
  async getExchangeRequirements(
    @Query() query: GetExchangeRequirementsRequest,
  ) {
    return this.service.getExchangeRequirements(
      query.denom,
      new Date(query.startDate),
      new Date(query.endDate),
    );
  }

  @Get('tax-rates')
  async getTaxRates(@Query() query: GetTaxRateRequest) {
    return this.service.getTaxRates(
      new Date(query.startDate),
      new Date(query.endDate),
    );
  }
}
