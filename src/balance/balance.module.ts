import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from 'src/model/balance.schema';
import { Order, OrderSchema } from 'src/model/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
