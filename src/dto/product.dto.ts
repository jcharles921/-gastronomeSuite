import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// VALIDATION FOR PRODUCT

export class ProductDto {
  @ApiProperty({ description: 'The name of the product', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The price of the product', type: Number })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'The category of the product', type: String })
  @IsNotEmpty()
  category: [];

  @ApiProperty({ description: 'The quantity of the product', type: Number })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'The description of the product', type: String })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The image of the product', type: String })
  @IsString()
  image: string;
}

export class ProductUpdateDto {
  @ApiProperty({ description: 'The name of the product', type: String })
  name: string;

  @ApiProperty({ description: 'The price of the product', type: Number })
  price: number;

  @ApiProperty({ description: 'The category of the product', type: String })
  category: [];

  @ApiProperty({ description: 'The quantity of the product', type: Number })
  quantity: number;

  @ApiProperty({ description: 'The description of the product', type: String })
  description: string;

  @ApiProperty({ description: 'The image of the product', type: String })
  image: string;
}
