import mongoose, { Schema } from "mongoose";

interface ISchema {
  name: string;
  categoryId: string;
  author: string;
  createdAt: number;
  barcode: string;
  location: {
    cabinet: string;
    shelf: string;
  };
  notes: string;
  images: string[];
  qrCode?: string;
}

const model = mongoose.model<ISchema>(
  "book",
  new Schema<ISchema>({
    name: { type: String, required: true },
    categoryId: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Number, required: true },
    barcode: { type: String, required: true },
    location: {
      cabinet: { type: String, required: true },
      shelf: { type: String, required: true },
    },
    notes: { type: String, required: false },
    images: { type: [String], required: false },
    qrCode: { type: String, required: false },
  })
);

export const BookModel = model;
export type IBook = ISchema;
