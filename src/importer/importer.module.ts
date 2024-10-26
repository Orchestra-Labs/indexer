import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';
import { SymphonyModule } from '@/symphony/symphony.module';
import { DatabaseModule } from '@/database/database.module';
import { MarketParamsRepository } from '@/importer/market-params.repository';
import { TaxRateRepository } from '@/importer/tax-rate.repository';
import { ExchangeRequirementsRepository } from '@/importer/exchange-requirements.repository';

@Module({
  providers: [
    ImporterService,
    MarketParamsRepository,
    TaxRateRepository,
    ExchangeRequirementsRepository,
  ],
  imports: [SymphonyModule, DatabaseModule],
  exports: [
    MarketParamsRepository,
    TaxRateRepository,
    ExchangeRequirementsRepository,
  ],
})
export class ImporterModule {}
