import {
  Injectable,
  ConflictException,
  // InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Header,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceHistory } from 'src/model/';
import { write, utils,writeFile } from 'xlsx';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(BalanceHistory.name)
    private balanceModel: Model<BalanceHistory>,
  ) {}
  
  async getBalance(): Promise<{ total: Number; details }> {
    try {
      const tst = await this.balanceModel.find({});

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
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=amicizia.xlsx')
  
  async getExcelBalance(@Res() res: Response): Promise<any> {
    try {
      const RowData = await this.balanceModel.find({});


      const data = RowData.map((row: any, index: number, array: any[]) => {
        var inpuNumber = row.transaction.inputationNumber;
        
        const formattedDate =  row.createdAt.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      
        // Initialize balance variable to store the running total
        let balance = index > 0 ? array[index - 1].solde : 0;
      
        if (row.transactionType === 'Depot') {

          balance += row.amount;
      
          return {
            date: formattedDate,
            description: "Recettes",
            imputationNumber: '71520',
            depot: row.amount,
            retrait: '',
            solde: balance,
          };
        }
      
        if(row.transactionType === 'Retrait'){
          
          balance -= row.amount;
          return {
            date: formattedDate,
            description: "Dépenses",
            imputationNumber: inpuNumber,
            depot: row.transactionType === 'Depot' ? row.amount : '',
            retrait: row.transactionType === 'Retrait' ? row.amount : '',
            solde: balance,
          };
        }
      });
      
      const workSheet = utils.json_to_sheet(data);
      const workBook = utils.book_new();
      utils.book_append_sheet(workBook, workSheet, 'Balance');
      utils.sheet_add_aoa(workSheet, [
        ['Date', 'Description', 'Imputation', 'Depot', 'Retrait', 'Solde'],
      ], { origin: 'A1' });
      writeFile(workBook, 'amicizia.xlsx',{compression:true});
      res.download('amicizia.xlsx');
    
    } catch (error) {
      throw new InternalServerErrorException(error.message);

    }
  }
}
