import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SymphonyService } from '@/symphony/symphony.service';
import { utf8Read } from '@orchestra-labs/symphonyjs';
import { MarketParamsRepository } from '@/importer/market-params.repository';
import { TaxRateRepository } from '@/importer/tax-rate.repository';
import { ExchangeRequirementsMapper } from '@/importer/mapper/exchange-requirements.mapper';
import { ExchangeRequirementsRepository } from '@/importer/exchange-requirements.repository';

@Injectable()
export class ImporterService {
  private readonly logger = new Logger(ImporterService.name);

  constructor(
    private readonly symphonyService: SymphonyService,
    private readonly marketParamsRepo: MarketParamsRepository,
    private readonly taxRateRepo: TaxRateRepository,
    private readonly exchangeRequirementsRepo: ExchangeRequirementsRepository,
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
    const models = ExchangeRequirementsMapper.normalize(exchangeRequirements);

    // we store the exchange requirements in the database
    await this.exchangeRequirementsRepo.storeExchangeRequirements(
      models,
      blockHeight,
    );

    this.logger.debug(`Stored exchange requirements at height ${blockHeight}`);
  }

  @OnEvent('block.new')
  async gatherReserveFee(blockHeight: number) {
    const taxRateResponse = await this.symphonyService.getTaxRate();
    this.logger.debug(`Tax rate value: ${taxRateResponse.taxRate}`);
    const taxRate = BigInt(taxRateResponse.taxRate);

    // we store the tax rate in the database
    await this.taxRateRepo.storeTaxRate(taxRate, blockHeight);
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
