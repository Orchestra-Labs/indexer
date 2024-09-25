import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_CLIENT } from '@/database/database.provider';
import { Client } from 'pg';

@Injectable()
export class MarketParamsRepository {
  private readonly logger = new Logger(MarketParamsRepository.name);

  constructor(@Inject(PG_CLIENT) private client: Client) {}

  async storeExchangeParams(value: bigint, height: number) {
    const query = {
      text: 'INSERT INTO market_params (block_height, exchange_pool) VALUES ($1, $2)',
      values: [height, value],
    };
    await this.client.query(query);
    this.logger.debug(`Stored exchange params at height ${height}`);
  }
}
