import { BearerAuth } from "@/auth";
import AuthController from "@/controllers/AuthController";
import { VerifyPayload } from "@/middlewares/zod";
import { Router } from "express";
import { z } from "zod";

const router = Router();
export { router as AuthRouter };

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const RegisterSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
});

router.get("/@me", AuthController.getMe);

router.post("/login", VerifyPayload(LoginSchema), AuthController.login);

router.post(
  "/register",
  VerifyPayload(RegisterSchema),
  AuthController.register
);
