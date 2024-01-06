import mongoose, { Document } from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  type: String,
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  total: Number,
});

export interface Expense extends Document {
  name: string;
  price: number;
  description: string;
  type: {
    type: string;
    enum: ['Herbergement', 'Transport', 'Restauration', 'Autres'];
  };
  product: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  total: number;
}
