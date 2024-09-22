import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';
import { SymphonyModule } from '@/symphony/symphony.module';
import { ExchangeParamsRepository } from '@/importer/exchange-params-repository.service';
import { DatabaseModule } from '@/database/database.module';

@Module({
  providers: [ImporterService, ExchangeParamsRepository],
  imports: [SymphonyModule, DatabaseModule],
})
export class ImporterModule {}
