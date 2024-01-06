import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  @Prop()
  id: string; 

  @Prop()
  totalToBePaid: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  clientName: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Payment' })
  payment: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'OrderDetail' }] })
  orderDetails: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export interface OrderDocument extends Order, Document { id: string;}
