import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  
  @Prop()
  totalToBePaid: number;

  @Prop()
  description: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  clientName: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({
    type: String,
    enum: ['pending', 'paid', 'canceled'],
  })
  status: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop([{
    productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }, 
  }])
  orderDetails: { productId: string; quantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export interface OrderDocument extends Order, Document {
  id: string;
}
