import BooksController from "@/controllers/BooksController";
import { isAdmin } from "@/middlewares/auth";
import { isLicensed } from "@/middlewares/license";
import { VerifyPayload } from "@/middlewares/zod";
import { Router } from "express";
import { z } from "zod";

const router = Router();
export { router as BooksRouter };

router.use(isLicensed);

const BookSchema = z.object({
  name: z.string(),
  author: z.string(),
  categoryId: z.string(),
  location: z.object({
    cabinet: z.string(),
    shelf: z.string(),
  }),
});

router.get("/", BooksController.find);

router.get("/:id", BooksController.findOne);

router.use(isAdmin);

router.post("/", VerifyPayload(BookSchema), BooksController.create);

router.put("/:id", VerifyPayload(BookSchema), BooksController.update);

router.patch("/:id/images", BooksController.updateImages);

router.delete("/:id", BooksController.delete);

router.delete("/:id/images/:image", BooksController.deleteImage);
