import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_CLIENT } from '@/database/database.provider';
import { Client } from 'pg';
import { TaxRate } from '@/importer/model/TaxRate';

@Injectable()
export class TaxRateRepository {
  private readonly logger = new Logger(TaxRateRepository.name);

  constructor(@Inject(PG_CLIENT) private client: Client) {}

  async storeTaxRate(value: bigint, height: number) {
    const query = {
      text: 'INSERT INTO tax_rate (block_height, tax_rate) VALUES ($1, $2)',
      values: [height, value],
    };
    await this.client.query(query);
    this.logger.debug(`Stored tax rate at height ${height}`);
  }

  async getTaxRates(startDate: Date, endDate: Date): Promise<TaxRate[]> {
    const query = {
      text: 'SELECT * FROM tax_rate WHERE created_at >= $1 AND created_at <= $2',
      values: [startDate, endDate],
    };
    const result = await this.client.query<TaxRate>(query);
    return result.rows;
  }
}
