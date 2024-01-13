import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsInt,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailDto {
  @ApiProperty({
    description: 'The product ID',
    type: String,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'The quantity of the product',
    type: Number,
  })
  @IsInt()
  quantity: number;
}

export class OrderDto {
  @ApiProperty({ description: 'Client Name', type: String })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({ description: 'Total to be paid ', type: Number })
  @IsNumber()
  @IsNotEmpty()
  totalToBePaid: number;

  @ApiProperty({ description: 'Status of the order', type: String })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'The list of the products in the Order',
    type: [OrderDetailDto],
  })
  @IsArray()
  @IsNotEmpty()
  orderDetails: OrderDetailDto[];
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The Employee who took the command',
    type: String,
  })
  @IsString()
  user: string;
}

export class OrderUpdateDto {
  @ApiProperty({ description: 'Client Name', type: String })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({ description: 'Total to be paid ', type: Number })
  @IsNumber()
  @IsNotEmpty()
  totalToBePaid: number;

  @ApiProperty({ description: 'Status of the order', type: String })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'The list of the products in the Order',
    type: [OrderDetailDto],
  })
  @IsArray()
  @IsNotEmpty()
  @IsObject({ each: true })
  orderDetails: OrderDetailDto[];

  @ApiProperty({
    description: 'The Employee who took the command',
    type: String,
  })
  @IsString()
  user: string;
}
