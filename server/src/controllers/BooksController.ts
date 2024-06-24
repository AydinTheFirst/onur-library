import { BookModel } from "@/database/models/Book";
import { CategoryModel } from "@/database/models/Category";
import { NotFoundError } from "@/lib/express";
import { Request, Response } from "express";
import qrCode from "qrcode";

class BooksController {
  async find(req: Request, res: Response) {
    const books = await BookModel.find();
    const categories = await CategoryModel.find();

    const data = books.map((book) => {
      return {
        ...book.toJSON(),
        category: categories.find(
          (category) => category._id.toString() === book.categoryId
        ),
      };
    });

    return res.send(data);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) return NotFoundError(res, "Book not found");
    const category = await CategoryModel.findById(book.categoryId);
    return res.send({ ...book.toJSON(), category });
  }

  async create(req: Request, res: Response) {
    const book = await BookModel.create({
      ...req.body,
      createdAt: Date.now(),
      barcode: Math.floor(Math.random() * 1000000000000),
      qrCode: "",
    });

    book.qrCode = await qrCode.toDataURL(book._id.toString());
    await book.save();

    return res.send(book);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const model = await BookModel.findById(id);
    if (!model) return NotFoundError(res, "Book not found");

    Object.assign(model, req.body);

    await model.save();

    return res.send(model);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const model = await BookModel.findById(id);

    if (!model) return NotFoundError(res, "Book not found");
  }
}

export default new BooksController();
