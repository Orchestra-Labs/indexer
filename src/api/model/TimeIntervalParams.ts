import { ApiProperty } from '@nestjs/swagger';

export class TimeIntervalParams {
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string;
}
