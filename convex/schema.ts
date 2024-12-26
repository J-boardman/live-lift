import { defineSchema } from "convex/server";
import { competitionTable } from "./competitions";

export default defineSchema(
  {
    competitions: competitionTable,
  },
  {
    schemaValidation: false,
  }
);
