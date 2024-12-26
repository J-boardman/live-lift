import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { defineTable } from "convex/server";

const competitionValues = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  competitionType: v.union(v.literal("powerlifting")),
  planType: v.union(
    v.literal("free"),
    v.literal("premium"),
    v.literal("enterprise")
  ),
  date: v.number(),
});
export const competitionTable = defineTable(competitionValues);

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("competitions").collect();
  },
});

export const getById = query({
  args: { id: v.id("competitions") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const create = mutation({
  args: { competition: competitionValues },
  handler: async (ctx, args) => {
    return await ctx.db.insert("competitions", args.competition);
  },
});

export const clean = internalMutation({
  args: {},
  handler: async (ctx) => {
    const competitions = await ctx.db
      .query("competitions")
      .filter((q) => q.eq(q.field("name"), "Powerlifting Competition"))
      .collect();

    for (const competition of competitions) {
      await ctx.db.delete(competition._id);
    }

    return competitions;
  },
});
