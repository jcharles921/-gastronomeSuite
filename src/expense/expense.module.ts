import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from 'src/model/expense.schema';
import { Balance,BalanceSchema } from 'src/model/balance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
