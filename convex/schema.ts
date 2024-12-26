import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    competitions: defineTable({
      name: v.string(),
      description: v.optional(v.string()),
      competitionType: v.union(v.literal("powerlifting")),
      planType: v.union(
        v.literal("free"),
        v.literal("premium"),
        v.literal("enterprise")
      ),
      date: v.number(),
    }),
  },
  {
    schemaValidation: false,
  }
);
