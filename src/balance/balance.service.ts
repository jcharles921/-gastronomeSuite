import {
  Injectable,
  ConflictException,
  // InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceHistory } from 'src/model/';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(BalanceHistory.name) private balanceModel: Model<BalanceHistory>,
  ) {}
  async getBalance(): Promise<{ total:Number}> {
    try {
      const balance = await this.balanceModel.find({},'amount transactionType');
      if (!balance) {
        throw new NotFoundException('Balance not found');
      }
      const allRetrait = balance
  .filter((entry) => entry.transactionType === 'Retrait')
  .reduce((totalRetrait, entry) => totalRetrait + entry.amount, 0);

const allDepot = balance
  .filter((entry) => entry.transactionType === 'Depot')
  .reduce((totalDepot, entry) => totalDepot + entry.amount, 0);

const solde = allDepot - allRetrait;
      return { total: solde };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addBalance(amount: number): Promise<BalanceHistory> {
    try {
      const balance = await this.balanceModel.create({
        amount: amount,
        transactionType: 'Depot',
      });
      return balance;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
