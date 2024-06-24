import express, { Router } from "express";
import { ApiRouter } from "./ApiRouter";
import { NotFoundError } from "@/lib/express";
import fs from "fs";
const router = Router();
export { router };

router.use("/api", ApiRouter);

const clientPath = "../client/dist";
router.use(express.static(clientPath));

router.get("*", (req, res, next) => {
  if (!fs.existsSync(clientPath)) return NotFoundError(res, "Client not found");
  res.sendFile("index.html", { root: clientPath });
});
