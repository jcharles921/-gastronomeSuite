import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Expense,Balance } from 'src/model';
import { ExpenseDto,ExpenseUpdateDto } from 'src/dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(Balance.name) private balanceModel: Model<Balance>,
  ) {}
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const expense = await this.expenseModel.find({});
      return expense;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createExpense( expenseInfo:ExpenseDto): Promise<Expense> {
    const { description, amount,product  } = expenseInfo;
    try {
    const balance = await this.balanceModel.find({});
    if (!balance) {
        throw new NotFoundException('Balance not found');
    }
    if (balance.total < amount) {
        throw new BadRequestException('Not enough balance');
    }
      const expense = await this.expenseModel.create({
        description,
        amount,
        product,
      });
        const updatedBalance = await this.balanceModel.findOneAndUpdate(
            { name: "balance" },
            { $inc: { total: -amount } },
            { new: true }
        );
      return expense;
    } catch (error) {
      throw new BadRequestException(error.message);
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
        throw new BadRequestException(error.message);
        }
    }
    async updateExpense(
        id: string,
        expenseInfo: ExpenseUpdateDto,
    ): Promise<Expense> {
        const { description, amount, product } = expenseInfo;
        try {
        const expense = await this.expenseModel.findById(id);
        if (!expense) {
            throw new NotFoundException('Expense not found');
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
        throw new BadRequestException(error.message);
        }
    }

    async deleteExpense(id: string): Promise<{ message: string; newBalance: number }> {
        try {
            // Find the expense first to get the amount
            const expense = await this.expenseModel.findById(id);
    
            if (!expense) {
                throw new NotFoundException('Expense not found');
            }
    
            // Save the amount to be re-added to the balance
            const toReAdd = expense.amount;
    
            // Delete the expense
            await this.expenseModel.findByIdAndDelete(id);
    
            // Update the balance by incrementing the total with the amount to be re-added
            const updatedBalance = await this.balanceModel.findOneAndUpdate(
                { name: "balance" },
                { $inc: { total: toReAdd } },
                { new: true }
            );
    
            if (!updatedBalance) {
                // Handle the case when the balance document is not found
                throw new NotFoundException('Balance not found');
            }
    
            return { message: 'Expense deleted successfully', newBalance: updatedBalance.total };
        } catch (error) {
            // Use a more specific exception type, such as InternalServerError, for unexpected errors
            throw new BadRequestException(error.message);
        }
    }
    
}
