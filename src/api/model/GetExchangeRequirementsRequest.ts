import { TimeIntervalParams } from '@/api/model/TimeIntervalParams';
import { ApiProperty } from '@nestjs/swagger';

export class GetExchangeRequirementsRequest extends TimeIntervalParams {
  @ApiProperty()
  denom: string;
}
