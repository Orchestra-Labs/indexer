import { ApiProperty } from '@nestjs/swagger';

export class ExchangeRequirement {
  @ApiProperty()
  blockHeight: number;
  @ApiProperty()
  totalDenom: string;
  @ApiProperty()
  totalAmount: bigint;
  @ApiProperty()
  baseDenom: string;
  @ApiProperty()
  baseAmount: bigint;
  @ApiProperty()
  exchangeRate: number;
}
