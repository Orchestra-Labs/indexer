import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';
import { SymphonyModule } from '@/symphony/symphony.module';
import { DatabaseModule } from '@/database/database.module';
import { MarketParamsRepository } from '@/importer/market-params.repository.service';

@Module({
  providers: [ImporterService, MarketParamsRepository],
  imports: [SymphonyModule, DatabaseModule],
  exports: [MarketParamsRepository],
})
export class ImporterModule {}
