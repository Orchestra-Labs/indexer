import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockModule } from '@/block/block.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { SymphonyModule } from './symphony/symphony.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ImporterModule } from './importer/importer.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    BlockModule,
    SymphonyModule,
    ImporterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
