import mongoose, { Schema } from "mongoose";

interface ISchema {
  key: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

const model = mongoose.model<ISchema>(
  "license",
  new Schema<ISchema>({
    key: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Number, required: true },
    expiresAt: { type: Number, required: true },
  })
);

export const LicenseModel = model;
export type ILicense = ISchema & mongoose.Document;
