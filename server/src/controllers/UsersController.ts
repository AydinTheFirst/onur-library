import { IUser, UserModel } from "@/database/models/User";
import { NotFoundError } from "@/lib/express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
const userMutator = (user: IUser) => {
  return {
    _id: user._id,
    id: user.id,
    displayName: user.displayName,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

class UsersController {
  getAll = async (req: Request, res: Response) => {
    const users = await UserModel.find();
    const data = req.user.isAdmin ? users : users.map(userMutator);
    res.send(data);
  };

  getOne = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return NotFoundError(res, "User not found");
    const data = req.user.isAdmin ? user : userMutator(user);
    res.send(data);
  };

  create = async (req: Request, res: Response) => {
    const user = await UserModel.create({
      ...req.body,
      createdAt: Date.now(),
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.send(userMutator(user));
  };

  update = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return NotFoundError(res, "User not found");

    if (req.body.password !== user.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    Object.assign(user, req.body);
    await user.save();

    res.send(userMutator(user));
  };

  delete = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return NotFoundError(res, "User not found");

    await user.deleteOne();

    res.send(userMutator(user));
  };
}

export default new UsersController();
