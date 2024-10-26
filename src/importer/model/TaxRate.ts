import { ApiProperty } from '@nestjs/swagger';

export class TaxRate {
  @ApiProperty()
  block_height: number;
  @ApiProperty()
  tax_rate: bigint;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
