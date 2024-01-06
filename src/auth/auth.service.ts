import {
  Injectable,
  ConflictException,

  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model';
import { SignUpDto, LoginDto } from 'src/dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(
    signUpInfo: SignUpDto,
  ): Promise<{ token: string; message: string; user: any }> {
    const { email, password, name } = signUpInfo;
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const usersCount = await this.userModel.countDocuments({});
      const userRole = usersCount === 0 ? 1 : 2;
      if (userRole === 2) {
        // IF THEY ARE NOT THE FIRST USER, GIVE THEM EMPLOYEE ROLE
        const user = await this.userModel.create({
          name,
          email,
          password: hashedPassword,
          role: userRole,
        });
        const token = this.jwtService.sign({ id: user._id });
        return { token, message: 'User created successfully', user };
      } else {
        const user = await this.userModel.create({
          name,
          email,
          password: hashedPassword,
          role: userRole,
        });
        const token = this.jwtService.sign({ id: user._id });
        return { token, message: 'User created successfully', user };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async signIn(
    loginInfo: LoginDto,
  ): Promise<{ token: string; message: string; user: any }> {
    const { email, password } = loginInfo;
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = this.jwtService.sign({ id: user._id });
        return { token, message: 'User logged in successfully', user };
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
