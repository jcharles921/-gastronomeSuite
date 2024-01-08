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
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto';
import { IsUserGuard } from 'src/guards';


@ApiBearerAuth()
@ApiTags('Order')
@UseGuards(IsUserGuard)
@Controller('order')

export class OrderController {
    constructor(private orderService: OrderService) {}
    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({
      status: 201,
      description: 'The order has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createOrder(@Body(ValidationPipe) orderInfo: OrderDto) {
      return await this.orderService.createOrder(orderInfo);
    }
    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({
      status: 201,
      description: 'The orders have been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getAllOrders() {
      return await this.orderService.getAllOrders();
    }
    @Get('/:id')
    @ApiOperation({ summary: 'Get a single order' })
    @ApiResponse({
      status: 201,
      description: 'The order has been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getSingleOrder(@Param('id') id: string) {
      return await this.orderService.getSingleOrder(id);
    }
    @Put('/:id')
    @ApiOperation({ summary: 'Update an order' })
    @ApiResponse({
      status: 201,
      description: 'The order has been successfully updated.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateOrder(
      @Param('id') id: string,
      @Body(ValidationPipe) orderInfo: OrderDto,
    ) {
      return await this.orderService.updateOrder(id, orderInfo);
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete an order' })
    @ApiResponse({
      status: 201,
      description: 'The order has been successfully deleted.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteOrder(@Param('id') id: string) {
      return await this.orderService.deleteOrder(id);
    }
}
