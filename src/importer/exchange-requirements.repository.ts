import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_CLIENT } from '@/database/database.provider';
import { Client } from 'pg';
import { ExchangeRequirement } from '@/importer/model/ExchangeRequirement';

@Injectable()
export class ExchangeRequirementsRepository {
  private readonly logger = new Logger(ExchangeRequirementsRepository.name);

  constructor(@Inject(PG_CLIENT) private client: Client) {}

  async storeExchangeRequirements(
    exchangeRequirement: ExchangeRequirement[],
    height: number,
  ) {
    for (const requirement of exchangeRequirement) {
      const query = {
        text: 'INSERT INTO exchange_requirements (block_height, total_denom, total_amount, base_denom, base_amount, exchange_rate) VALUES ($1, $2, $3, $4, $5, $6)',
        values: [
          height,
          requirement.totalDenom,
          requirement.totalAmount,
          requirement.baseDenom,
          requirement.baseAmount,
          requirement.exchangeRate,
        ],
      };
      await this.client.query(query);

      this.logger.debug(
        `Stored exchange requirement for denom ${requirement.baseDenom} at height ${height}`,
      );
    }
  }

  async getExchangeRequirements(
    baseDenom: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ExchangeRequirement[]> {
    const query = {
      text: 'SELECT * FROM exchange_requirements WHERE base_denom = $1 AND created_at >= $2 AND created_at <= $3',
      values: [baseDenom, startDate, endDate],
    };
    const result = await this.client.query<ExchangeRequirement>(query);
    return result.rows;
  }
}
