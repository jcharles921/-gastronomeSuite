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
import { ExpenseService } from './expense.service';
import { ExpenseDto } from 'src/dto';

@ApiTags("Expense")
@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) {}
    @Post()
    @ApiOperation({ summary: 'Create a new expense' })
    @ApiResponse({
        status: 201,
        description: 'The expense has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createExpense(@Body(ValidationPipe) expenseInfo: ExpenseDto) {
        return await this.expenseService.createExpense(expenseInfo);
    }
    @Get()
    @ApiOperation({ summary: 'Get all expenses' })
    @ApiResponse({
        status: 201,
        description: 'The expenses have been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getAllExpenses() {
        return await this.expenseService.getAllExpenses();
    }
    @Get('/:id')
    @ApiOperation({ summary: 'Get a single expense' })
    @ApiResponse({
        status: 201,
        description: 'The expense has been successfully retrieved.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getSingleExpense(@Param('id') id: string) {
        return await this.expenseService.getSingleExpense(id);
    }
    @Put('/:id')
    @ApiOperation({ summary: 'Update an expense' })
    @ApiResponse({
        status: 201,
        description: 'The expense has been successfully updated.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateExpense(
        @Param('id') id: string,
        @Body(ValidationPipe) expenseInfo: ExpenseDto,
    ) {
        return await this.expenseService.updateExpense(id, expenseInfo);
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete an expense' })
    @ApiResponse({
        status: 201,
        description: 'The expense has been successfully deleted.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteExpense(@Param('id') id: string) {
        return await this.expenseService.deleteExpense(id);
    }
}
