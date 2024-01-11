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
import { write, utils, WorkBook } from 'xlsx';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(BalanceHistory.name)
    private balanceModel: Model<BalanceHistory>,
  ) {}
  async getBalance(): Promise<{ total: Number; details }> {
    try {
      const tst = await this.balanceModel.find({});
      console.log(tst);
      const balance = await this.balanceModel.find(
        {},
        'amount transactionType',
      );
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
      return { total: solde, details: tst };
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
  async getExcelBalance(): Promise<String> {
    try {
      const RowData = await this.balanceModel.find({});

      const data = RowData.map((row: any) => {
        var inpuNumber = row.transaction.inputationNumber;
        var originalDate = row.createdAt;
        const formattedDate = new Date(originalDate).toLocaleString();
        if (row.transactionType === 'Depot') {
          return {
            date: formattedDate,
            description: row.transaction,
            imputationNumber: '71520',
            depot: row.amount,
            retrait: '',
            solde: row.amount,
          };
        }
        return {
          date: formattedDate,
          description: row.transaction,
          imputationNumber: row._id,
          depot: row.transactionType === 'Depot' ? row.amount : '',
          retrait: row.transactionType === 'Retrait' ? row.amount : '',
          solde: row.amount,
        };
      });
      return 'data';
      //DATE, Description,Imputation Number,Depot, retrait, solde
    } catch (error) {}
  }
}
