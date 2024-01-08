import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDto {
  @ApiProperty()
  @IsInt()
  total: number;
  @ApiProperty()
  @IsString()
  history: [];
  @ApiProperty()
  @IsString()
  type: string;

}
