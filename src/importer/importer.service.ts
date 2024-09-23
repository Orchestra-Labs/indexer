import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SymphonyService } from '@/symphony/symphony.service';
import { utf8Read } from '@orchestra-labs/symphonyjs';
import { MarketParamsRepository } from '@/importer/market-params.repository.service';

@Injectable()
export class ImporterService {
  private readonly logger = new Logger(ImporterService.name);

  constructor(
    private readonly symphonyService: SymphonyService,
    private readonly marketParamsRepo: MarketParamsRepository,
  ) {}

  @OnEvent('block.new')
  async gatherMarketParams(blockHeight: number) {
    const marketParams = await this.symphonyService.getMarketParams();
    const exchangePoolValue = marketParams.params.exchangePool;
    const exchangePool = this.decode(exchangePoolValue);

    this.logger.debug(
      `Storing exchange pool value at ${blockHeight}: ${exchangePool}`,
    );
    await this.marketParamsRepo.storeExchangeParams(exchangePool, blockHeight);
  }

  @OnEvent('block.new')
  async gatherExchangeRequirements(blockHeight: number) {
    const exchangeRequirements =
      await this.symphonyService.getExchangeRequirements();
    this.logger.debug(`Exchange requirements value: ${exchangeRequirements}`);
  }

  private decode(uint8array: Uint8Array): bigint {
    const x = utf8Read(uint8array, 0, uint8array.length);
    // the string represent a number where there are 18 digits after the decimal point
    // we need to convert it to a number where there are 0 digits after the decimal point
    const bigInt = BigInt(x);
    // we divide by 10^18 to remove the decimal point
    return bigInt / BigInt(10 ** 18);
  }
}
