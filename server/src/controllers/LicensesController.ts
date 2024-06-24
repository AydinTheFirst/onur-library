import { LicenseModel } from "@/database/models/License";
import { NotFoundError } from "@/lib/express";
import { generateToken, uuid } from "@/utils";
import { Request, Response } from "express";

class LicensesController {
  async find(req: Request, res: Response) {
    const licenses = await LicenseModel.find();
    return res.send(licenses);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const license = await LicenseModel.findById(id);
    return res.send(license);
  }

  async create(req: Request, res: Response) {
    const license = await LicenseModel.create(req.body);
    return res.send(license);
  }

  async consume(req: Request, res: Response) {
    const { id } = req.params;
    const license = await LicenseModel.findById(id);
    if (!license) return NotFoundError(res, "License not found");

    license.userId = req.body.userId;
    await license.save();

    return res.send(license);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const model = await LicenseModel.findById(id);
    if (!model) return NotFoundError(res, "License not found");

    Object.assign(model, req.body);

    await model.save();
    return res.send(model);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const model = await LicenseModel.findById(id);

    if (!model) return NotFoundError(res, "License not found");

    await model.deleteOne();

    return res.send(model);
  }
}

export default new LicensesController();
