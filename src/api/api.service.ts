import { Injectable } from '@nestjs/common';
import { MarketParamsRepository } from '@/importer/market-params.repository';
import { ExchangeRequirementsRepository } from '@/importer/exchange-requirements.repository';
import { TaxRateRepository } from '@/importer/tax-rate.repository';

@Injectable()
export class ApiService {
  constructor(
    private readonly marketParamsRepo: MarketParamsRepository,
    private readonly exchangeRequirementsRepo: ExchangeRequirementsRepository,
    private readonly taxRateRepo: TaxRateRepository,
  ) {}

  async getMarketParams(startDate: Date, endDate: Date) {
    return this.marketParamsRepo.getMarketParams(startDate, endDate);
  }

  async getExchangeRequirements(
    baseDenom: string,
    startDate: Date,
    endDate: Date,
  ) {
    return await this.exchangeRequirementsRepo.getExchangeRequirements(
      baseDenom,
      startDate,
      endDate,
    );
  }

  async getTaxRates(startDate: Date, endDate: Date) {
    return await this.taxRateRepo.getTaxRates(startDate, endDate);
  }
}
