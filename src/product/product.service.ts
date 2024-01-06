import { 
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/model';
import { ProductDto } from 'src/dto';

@Injectable()
export class ProductService {}
