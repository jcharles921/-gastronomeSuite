import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from 'src/dto';
import * as cookie from 'cookie';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Authenrification')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async signUp(
    @Body(ValidationPipe) signUpInfo: SignUpDto,
    @Res() res: Response,
  ) {
    const response = await this.authService.signUp(signUpInfo);
    if (response.token) {
      res.cookie('token', response.token, { httpOnly: true });
      return res.send(response);
    }
  }
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 403, description: 'Invalid Credentials' })
  async signIn(
    @Body(ValidationPipe) loginInfo: LoginDto,
    @Res() res: Response,
  ) {
    const response = await this.authService.signIn(loginInfo);
    if (response.token) {
      res.cookie('token', response.token, { httpOnly: true });
      return res.send(response);
    }
  }
}
