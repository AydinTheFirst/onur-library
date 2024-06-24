import mongoose, { Schema } from "mongoose";

interface ISchema {
  name: string;
  description: string;
  createdAt: number;
}

const model = mongoose.model<ISchema>(
  "category",
  new Schema<ISchema>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Number, required: true },
  })
);

export const CategoryModel = model;
export type ICategory = ISchema & mongoose.Document;
