import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { BalanceController } from './balance/balance.controller';
import { BalanceService } from './balance/balance.service';
import { BalanceModule } from './balance/balance.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrderModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    ProductModule,
    BalanceModule,
    ExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
