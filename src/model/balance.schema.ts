import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
// TRANSACTION HISTORY
export class BalanceHistory extends Document {
  @Prop({
    type: Number,
    default: 0,
  })
  amount: number;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: {},
  }
  )
  transaction: {};
  @Prop({
    type: String,
    enum: ['Depot', 'Retrait'],
  })
  transactionType:string
  @Prop({
    type: String,
    enum: ['Herbergement', 'Restauration'],
  })
  type: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceHistory);
