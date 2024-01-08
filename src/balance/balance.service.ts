import {
  Injectable,
  ConflictException,
  // InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, Order } from 'src/model/';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<Balance>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}
  async getBalance(): Promise<{ total; history }> {
    try {
      const balance = await this.balanceModel.find({});
      const orders = await this.orderModel.find({ status: 'paid' });

      const sortedOrders = orders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      const solde = sortedOrders
        .map((order) => order.totalToBePaid)
        .reduce((a, b) => a + b, 0);

      return { total: solde, history: sortedOrders };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
