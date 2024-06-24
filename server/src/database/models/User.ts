import mongoose, { Schema } from "mongoose";

interface ISchema {
  displayName: string;
  username: string;
  email: string;
  password: string;
  tokenId: string;
  createdAt: number;
  isAdmin: boolean;
  licenseId: string;
  phoneNumber: string;
}

const model = mongoose.model<ISchema>(
  "user",
  new Schema<ISchema>({
    displayName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tokenId: { type: String, required: false },
    createdAt: { type: Number, required: false, default: Date.now },
    isAdmin: { type: Boolean, required: false, default: false },
    licenseId: { type: String, required: false },
    phoneNumber: { type: String, required: true },
  })
);

export const UserModel = model;
export type IUser = ISchema & mongoose.Document;
