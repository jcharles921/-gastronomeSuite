import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceHistory, BalanceSchema } from 'src/model/balance.schema';
import { Order, OrderSchema } from 'src/model/order.schema';
import { CategorySchema, Category } from 'src/model/category.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceHistory.name, schema: BalanceSchema },
    ]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
