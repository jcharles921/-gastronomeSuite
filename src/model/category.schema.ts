import mongoose, { Document } from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});
export interface Category extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
