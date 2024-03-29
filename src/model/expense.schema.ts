import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Expense {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: string;
  @Prop()
  amount: number;
  @Prop()
  description: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }] })
  category: string;
  @Prop({
    type: String,
    enum: ['Herbergement', 'Transport', 'Restauration', 'Autres'],
  })
  type: string[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  product: string[];
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

export interface ExpenseDocument extends Expense, Document {}
