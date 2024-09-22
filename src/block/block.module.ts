import { Module } from '@nestjs/common';
import { BlockService } from '@/block/block.service';
import { SymphonyService } from '@/symphony/symphony.service';
import { SymphonyModule } from '@/symphony/symphony.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [BlockService],
  imports: [SymphonyModule, CacheModule.register()],
})
export class BlockModule {}
