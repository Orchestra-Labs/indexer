import { QueryExchangeRequirementsResponse } from '@orchestra-labs/symphonyjs/osmosis/market/v1beta1/query';
import { ExchangeRequirement } from '@/importer/model/ExchangeRequirement';

export class ExchangeRequirementsMapper {
  public static normalize(
    dto: QueryExchangeRequirementsResponse,
  ): ExchangeRequirement[] {
    const totalDenom = dto.total.denom;
    const totalAmount = BigInt(dto.total.amount);

    return dto.exchangeRequirements.map(exchangeRequirement => {
      return {
        totalDenom,
        totalAmount,
        baseDenom: exchangeRequirement.baseCurrency.denom,
        baseAmount: BigInt(exchangeRequirement.baseCurrency.amount),
        exchangeRate: parseFloat(exchangeRequirement.exchangeRate),
      } as ExchangeRequirement;
    });
  }
}
