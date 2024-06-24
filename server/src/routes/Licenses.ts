import LicensesController from "@/controllers/LicensesController";
import { VerifyPayload } from "@/middlewares/zod";
import { Router } from "express";
import { z } from "zod";

const router = Router();
export { router as LicensesRouter };

const LicensePayload = z.object({
  key: z.string(),
  userId: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
});

router.get("/", LicensesController.find);

router.get("/:id", LicensesController.findOne);

router.post("/", VerifyPayload(LicensePayload), LicensesController.create);

router.put(
  "/:id",
  VerifyPayload(LicensePayload.partial()),
  LicensesController.update
);

router.delete("/:id", LicensesController.delete);
