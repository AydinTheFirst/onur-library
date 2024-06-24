import CategoriesController from "@/controllers/CategoriesController";
import { Router } from "express";

const router = Router();
export { router as CategoriesRouter };

router.get("/", CategoriesController.find);

router.get("/:id", CategoriesController.findOne);

router.get("/:id/books", CategoriesController.findBooks);

router.post("/", CategoriesController.create);

router.put("/:id", CategoriesController.update);

router.delete("/:id", CategoriesController.delete);
