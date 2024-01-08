import { IsString, IsInt,IsNotEmpty,IsArray} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseDto {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsInt()
  amount: number;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  type: string[];
    @ApiProperty({
        description: 'The list of the products in the Expense',
        type: [String],
    })
    @IsArray()

    product: string[];
}

export class ExpenseUpdateDto {

  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsInt()
  amount: number;
  @ApiProperty()
  @IsString()
  type: string[];
    @ApiProperty({
        description: 'The list of the products in the Expense',
        type: [String],
    })
    @IsString()
  product: string[];

}
