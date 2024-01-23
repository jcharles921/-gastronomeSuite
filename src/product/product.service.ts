import {
  Injectable,
  ConflictException,
  // InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/model';
import { ProductDto, ProductUpdateDto } from 'src/dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async createProduct(productInfo: ProductDto): Promise<Product> {
    const { name, description, price, category, quantity, image } = productInfo;
    try {
      const findProduct = await this.productModel.findOne({ name });
      if (findProduct) {
        throw new ConflictException('Product already exists');
      }
      const product = await this.productModel.create({
        name,
        description,
        price,
        category,
        quantity,
        image,
      });
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productModel.find({});
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getSingleProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateProduct(
    id: string,
    productInfo: ProductUpdateDto,
  ): Promise<{ message: String; updatedProduct: any }> {
    const { name, description, price, category, quantity, image } = productInfo;
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const updateProduct = await this.productModel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        quantity,
        image,
      });
      return {
        message: 'Product Successfully Updated ',
        updatedProduct: updateProduct,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteProduct(id: string): Promise<{ message: string }> {
    try {
      const product = await this.productModel.findByIdAndDelete(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
