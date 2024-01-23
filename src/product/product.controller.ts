import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto, ProductUpdateDto } from 'src/dto';
import { IsUserGuard } from 'src/guards';

@ApiBearerAuth()
@UseGuards(IsUserGuard)
@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createProduct(@Body(ValidationPipe) productInfo: ProductDto) {
    return await this.productService.createProduct(productInfo);
  }
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 201,
    description: 'The products have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Get a single product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getSingleProduct(@Param('id') id: string) {
    return await this.productService.getSingleProduct(id);
  }
  @Put('/:id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateProduct(
    @Body(ValidationPipe) productInfo: ProductUpdateDto,
    @Param('id') id: string,
  ) {
    return await this.productService.updateProduct(id, productInfo);
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
