import { ApiProperty } from '@nestjs/swagger';

export class MarketParams {
  @ApiProperty()
  block_height: number;
  @ApiProperty()
  exchange_pool: bigint;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
