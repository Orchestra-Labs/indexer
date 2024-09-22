import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';

@Module({
  providers: [ImporterService]
})
export class ImporterModule {}
