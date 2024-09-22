import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { SymphonyService } from '@/symphony/symphony.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BlockService {
  private readonly logger = new Logger(BlockService.name);

  constructor(
    private readonly symphonyService: SymphonyService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) {}

  @Interval(1000)
  async handleTick() {
    const savedBlockHeight = await this.lastRegistreredBlockHeight();
    const height = await this.symphonyService.getBlockNumber();
    if (height > savedBlockHeight) {
      this.logger.log(`New block height: ${height}`);
      await this.saveBlockHeight(height);
      this.eventEmitter.emit('block.new', height);
    }
  }

  private async lastRegistreredBlockHeight(): Promise<number> {
    return (await this.cacheManager.get('lastBlockHeight')) ?? 0;
  }

  private async saveBlockHeight(height: number): Promise<void> {
    await this.cacheManager.set('lastBlockHeight', height);
  }
}
