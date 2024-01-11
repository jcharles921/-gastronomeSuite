import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model';
import { SignUpDto } from 'src/dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getAllUsers(): Promise<User[]> {
    try {
      const user = await this.userModel.find({});
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async createUser(userInfo: SignUpDto): Promise<User> {
    const { name, email, password, role } = userInfo;
    try {
      const findUser = await this.userModel.findOne({ email });
      if (findUser) {
        throw new ConflictException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getSingleUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async updateUser(id: string, userInfo: SignUpDto): Promise<User> {
    const { name, email, password, role } = userInfo;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password: hashedPassword,
          role,
        },
        { new: true },
      );
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteUser(id: string): Promise<String> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return 'User deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
