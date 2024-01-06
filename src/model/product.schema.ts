import mongoose, { Document } from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  quantity: Number,
  image: String,
});

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
  category: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  image: string;
  quantity: number;
}
