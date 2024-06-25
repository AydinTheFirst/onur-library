import UsersController from "@/controllers/UsersController";
import { isAdmin, isLoggedIn } from "@/middlewares/auth";
import { VerifyPayload } from "@/middlewares/zod";
import { Router } from "express";
import { z } from "zod";

const router = Router();
export { router as UsersRouter };

const UserPayload = z.object({
  displayName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  isAdmin: z.boolean().optional().default(false),
});

router.use(isLoggedIn);

router.get("/", UsersController.getAll);

router.get("/:id", UsersController.getOne);

router.use(isAdmin);

router.post("/", VerifyPayload(UserPayload), UsersController.create);

router.put("/:id", VerifyPayload(UserPayload), UsersController.update);

router.delete("/:id", UsersController.delete);
