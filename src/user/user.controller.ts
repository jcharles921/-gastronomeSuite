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

import { UserService } from './user.service';
import { User } from 'src/model';
import { SignUpDto } from 'src/dto';
import { IsAdminGuard } from 'src/guards';

@ApiBearerAuth()
@UseGuards(IsAdminGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(@Body(ValidationPipe) userInfo: SignUpDto) {
    return await this.userService.createUser(userInfo);
  }
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 201,
    description: 'The users have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Get a single user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getSingleUser(@Param('id') id: string) {
    return await this.userService.getSingleUser(id);
  }
  @Put('/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) userInfo: SignUpDto,
  ) {
    return await this.userService.updateUser(id, userInfo);
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
