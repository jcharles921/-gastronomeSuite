import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Expense,BalanceHistory} from 'src/model';
import { ExpenseDto,ExpenseUpdateDto } from 'src/dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(BalanceHistory.name) private balanceModel: Model<BalanceHistory>,
  ) {}
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const expense = await this.expenseModel.find({});
      return expense;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async createExpense( expenseInfo:ExpenseDto): Promise<Expense> {
    const { description, amount,product,category } = expenseInfo;
    try {
      const expense = await this.expenseModel.create({
        description,
        amount,
        product,
      });
      await this.balanceModel.create({
        amount: amount,
        transactionType: "Retrait",
        transaction: {expense,category}
      })
      return expense;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
    async getSingleExpense(id: string): Promise<Expense> {
        try {
        const expense = await this.expenseModel.findById(id);
        if (!expense) {
            throw new NotFoundException('Expense not found');
        }
        return expense;
        } catch (error) {
          throw new InternalServerErrorException(error.message);
        }
    }
    async updateExpense(
        id: string,
        expenseInfo: ExpenseUpdateDto,
    ): Promise<Expense> {
        const { description, amount, product,category } = expenseInfo;
        try {
        const expense = await this.expenseModel.findById(id);
   
        if (!expense) {
            throw new NotFoundException('Expense not found');
        }
        // IF THE UPDATED AMOUNT IS LESS THAN THE AMOUNT IN THE DB
        if(expense.amount > amount){
          await this.balanceModel.create({
            amount: expense.amount - amount,
            transactionType: "Depot",
            transaction: {expense,category}
          })
        }
        // IF THE UPDATED AMOUNT IS GREATER THAN THE AMOUNT IN THE DB
        else if(expense.amount < amount){
          await this.balanceModel.create({
            amount: amount - expense.amount,
            transactionType: "Retrait",
            transaction: {expense,category}
          })
        }
        const updatedExpense = await this.expenseModel.findByIdAndUpdate(
            id,
            {
            description,
            amount,
            product,
            },
            { new: true },
        );
        return updatedExpense;
        } catch (error) {
          throw new InternalServerErrorException(error.message);
        }
    }

    // NOTE THAT THE BALANCE IS UPDATED WHEN THE EXPENSE IS DELETED 
    // I WILL FIX THE CATEGORY ISSUE LATER
    async deleteExpense(id: string): Promise<{ message: string}> {
        try {
            // Find the expense first to get the amount
            const expense = await this.expenseModel.findById(id);
    
            if (!expense) {
                throw new NotFoundException('Expense not found');
            }
            await this.balanceModel.create({
              amount: expense.amount,
              transactionType: "Depot",
              transaction: expense,
            })
    
            return { message: 'Expense deleted successfully'};
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
    
}
