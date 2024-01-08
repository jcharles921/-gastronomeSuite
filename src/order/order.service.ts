import {
  Injectable,
  ConflictException,
  // InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/model';
import { OrderDto, OrderUpdateDto } from 'src/dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async createOrder(orderInfo: OrderDto): Promise<Order> {
    const { clientName, totalToBePaid, status, orderDetails, user } = orderInfo;
    try {
      const findOrder = await this.orderModel.findOne({
        clientName,
        status: 'pending',
      });
      if (findOrder) {
        throw new ConflictException('Order already exists');
      }
      const order = await this.orderModel.create({
        clientName,
        totalToBePaid,
        status,
        orderDetails,
        user,
      });
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find({});
      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getSingleOrder(id: string): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateOrder(id: string, orderInfo: OrderUpdateDto): Promise<Order> {
    const { totalToBePaid, status, orderDetails, user, clientName } = orderInfo;
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        id,
        {
          clientName,
          totalToBePaid,
          status,
          orderDetails,
          user,
        },
        { new: true },
      );
      return updatedOrder;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteOrder(id: string): Promise<{ message: string }> {
    try {
      const order = await this.orderModel.findByIdAndDelete(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
