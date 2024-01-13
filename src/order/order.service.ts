import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, BalanceHistory, Product } from 'src/model';
import { OrderDto, OrderUpdateDto, OrderDetailDto } from 'src/dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(BalanceHistory.name)
    private balanceModel: Model<BalanceHistory>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
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
      await Promise.all(orderDetails.map(async (element: OrderDetailDto) => {
        const product = await this.productModel.findById(element.productId);
        if (!product) {
          throw new NotFoundException('Product not found');
        }
        if (product.quantity < element.quantity) {
          throw new BadRequestException(
            `The quantity of ${product.name} is not enough`,
          );
        }
      }));
      if (status === 'paid') {
        const order = await this.orderModel.create({
          clientName,
          totalToBePaid,
          description: "Paid Order",
          status,
          orderDetails,
          user,
        });
        await this.balanceModel.create({
          amount: totalToBePaid,
          transactionType: 'Depot',
          transaction: {order,inputationNumber: '71520'},
        });
        return order;
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
      throw new InternalServerErrorException(error.message);
    }
  }
  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find({});
      if (!orders) {
        throw new NotFoundException('Order not found');
      }
      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }
  async updateOrder(id: string, orderInfo: OrderUpdateDto): Promise<Order> {
    const { totalToBePaid, status, orderDetails, user, clientName } = orderInfo;
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      if (status === 'paid') {
        await Promise.all(orderDetails.map(async (element: OrderDetailDto) => {
          const product = await this.productModel.findById(element.productId);
          if (!product) {
            throw new NotFoundException('Product not found');
          }
          if (product.quantity < element.quantity) {
            throw new BadRequestException(
              `The quantity of ${product.name} is not enough`,
            );
          }
          
        }));
        const updatedOrder = await this.orderModel.findByIdAndUpdate(
          id,
          {
            clientName,
            totalToBePaid,
            description: "Updating Paid Order",
            status,
            orderDetails,
            user,
          },
          { new: true },
        );
       if (!updatedOrder) {
         throw new NotFoundException('Order not found');
       }
       if(totalToBePaid > order.totalToBePaid){
        await this.balanceModel.create({
          amount: totalToBePaid - order.totalToBePaid,
          transactionType: 'Depot',
          transaction: {updatedOrder,inputationNumber: '71520'},
        });
       }
       else if (totalToBePaid < order.totalToBePaid) {
        await this.balanceModel.create({
          amount: order.totalToBePaid - totalToBePaid,
          transactionType: 'Retrait',
          transaction: {updatedOrder,inputationNumber: '71520'},
        });
       }
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
     if (!updatedOrder) {
       throw new NotFoundException('Order not found');
     }
      return updatedOrder;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }
}
