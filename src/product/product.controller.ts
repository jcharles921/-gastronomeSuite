import { Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { ApiTags,ApiOperation,ApiResponse} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({
      status: 201,
      description: 'The product has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createProduct(productInfo: ProductDto) {
      return await this.productService.createProduct(productInfo);
    }
    @Get('all')
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({
      status: 201,
      description: 'The products have been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getAllProducts() {
      return await this.productService.getAllProducts();
    }
    @Get('single/:id')
    @ApiOperation({ summary: 'Get a single product' })
    @ApiResponse({
      status: 201,
      description: 'The product has been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getSingleProduct(id: string) {
      return await this.productService.getSingleProduct(id);
    }
    @Put('update/:id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({
      status: 201,
      description: 'The product has been successfully updated.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateProduct(id: string, productInfo: ProductDto) {
      return await this.productService.updateProduct(id, productInfo);
    }
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({
      status: 201,
      description: 'The product has been successfully deleted.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteProduct(id: string) {
      return await this.productService.deleteProduct(id);
    }
}
