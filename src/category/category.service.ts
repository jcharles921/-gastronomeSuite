import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Category } from 'src/model';
  import { CategoryDto } from 'src/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ){}
  async getAllCategories(): Promise<Category[]> {
    try {
      const category = await this.categoryModel.find({});
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async createCategory(categoryInfo: CategoryDto): Promise<Category> {
    const { name,inputationNumber } = categoryInfo;
    try {
      const category = await this.categoryModel.create({
        name,
        inputationNumber
      });
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getSingleCategory(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async updateCategory(
    id: string,
    categoryInfo: CategoryDto,
  ): Promise<Category> {
    const { name,inputationNumber } = categoryInfo;
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        id,
        {
          name,
          inputationNumber
        },
        { new: true },
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteCategory(id: string): Promise<String> {
    try {
      const category = await this.categoryModel.findByIdAndDelete(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return 'Category deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
