import { Module } from '@nestjs/common';
import {
  DatabaseClientProvider,
  DatabaseConnectionProvider,
} from '@/database/database.provider';

@Module({
  providers: [DatabaseConnectionProvider, DatabaseClientProvider],
  exports: [DatabaseConnectionProvider, DatabaseClientProvider],
})
export class DatabaseModule {}
