import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_CLIENT } from '@/database/database.provider';
import { Client } from 'pg';

@Injectable()
export class ExchangeParamsRepository {
  private readonly logger = new Logger(ExchangeParamsRepository.name);

  constructor(@Inject(PG_CLIENT) private client: Client) {}

  async storeExchangeParams(value: bigint, height: number) {
    const query = {
      text: 'INSERT INTO exchange_params (value, height) VALUES ($1, $2)',
      values: [value, height],
    };

    await this.client.query(query);
    this.logger.debug(`Stored exchange params at height ${height}`);
  }
}
