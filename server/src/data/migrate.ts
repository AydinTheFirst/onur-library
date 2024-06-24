import "dotenv/config";
import "@/database";
import Logger from "@/lib/Logger";
import { migrateCategories } from "./categories";
import { migrateBooks } from "./books";

/** ------- Categories -------- */
Logger.info("Migrating categories...");
await migrateCategories();

/** ------- Books -------- */
Logger.info("Migrating books...");
await migrateBooks();

Logger.info("Migration completed successfully.");

process.exit(0);
