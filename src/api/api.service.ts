import { Injectable } from '@nestjs/common';
import { MarketParamsRepository } from '@/importer/market-params.repository.service';

@Injectable()
export class ApiService {
  constructor(private readonly repository: MarketParamsRepository) {}

  async getMarketParams(startDate: Date, endDate: Date) {
    return this.repository.getMarketParams(startDate, endDate);
  }
}
