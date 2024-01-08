import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Balance {
  @Prop({
    type: Number,
    default: 0,
  })
  total: number;

  @Prop()
  history: [];
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

export const BalanceSchema = SchemaFactory.createForClass(Balance);
