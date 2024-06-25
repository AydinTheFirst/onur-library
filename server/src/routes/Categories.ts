import CategoriesController from "@/controllers/CategoriesController";
import { isAdmin } from "@/middlewares/auth";
import { Router } from "express";

const router = Router();
export { router as CategoriesRouter };

router.get("/", CategoriesController.find);

router.get("/:id", CategoriesController.findOne);

router.get("/:id/books", CategoriesController.findBooks);

router.use(isAdmin);

router.post("/", CategoriesController.create);

router.put("/:id", CategoriesController.update);

router.delete("/:id", CategoriesController.delete);
