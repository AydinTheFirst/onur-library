import { Request, Response } from "express";
import { CategoryModel } from "@/database/models/Category";
import { NotFoundError } from "@/lib/express";
import { BookModel } from "@/database/models/Book";

class CategoriesController {
  async find(req: Request, res: Response) {
    const categories = await CategoryModel.find();
    const books = await BookModel.find();

    const data = categories.map((category) => {
      return {
        ...category.toJSON(),
        books: books.filter(
          (book) => book.categoryId === category._id.toString()
        ),
      };
    });

    return res.send(data);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    return res.send(category);
  }

  async findBooks(req: Request, res: Response) {
    const { id } = req.params;
    const books = await BookModel.find({ categoryId: id });
    return res.send(books);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const category = await CategoryModel.create({ name });
    return res.send(category);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const model = await CategoryModel.findById(id);
    if (!model) return NotFoundError(res, "Category not found");

    Object.assign(model, req.body);

    await model.save();
    return res.send(model);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const model = await CategoryModel.findById(id);

    if (!model) return NotFoundError(res, "Category not found");

    await model.deleteOne();

    return res.send(model);
  }
}

export default new CategoriesController();
