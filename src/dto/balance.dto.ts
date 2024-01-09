import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDto {
  @ApiProperty()
  @IsInt()
  amount: number;
  @ApiProperty()
  @IsString()
  // Order or Expense
  transaction: {};
  @ApiProperty()
  @IsString()
  type: string;

}
