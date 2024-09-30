import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ImporterModule } from '@/importer/importer.module';

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [ImporterModule],
})
export class ApiModule {}
