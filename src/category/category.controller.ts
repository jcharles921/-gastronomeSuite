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
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto';
import { IsAdminGuard} from 'src/guards';

@ApiBearerAuth()
@UseGuards(IsAdminGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createCategory(@Body(ValidationPipe) categoryInfo: CategoryDto) {
        return await this.categoryService.createCategory(categoryInfo);
    }
    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({
        status: 201,
        description: 'The categories have been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }
    @Get('/:id')
    @ApiOperation({ summary: 'Get a single category' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getSingleCategory(@Param('id') id: string) {
        return await this.categoryService.getSingleCategory(id);
    }
    @Put('/:id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully updated.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateCategory(
        @Param('id') id: string,
        @Body(ValidationPipe) categoryInfo: CategoryDto,
    ) {
        return await this.categoryService.updateCategory(id, categoryInfo);
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully deleted.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteCategory(@Param('id') id: string) {
        return await this.categoryService.deleteCategory(id);
    }
}
