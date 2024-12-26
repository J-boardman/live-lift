import { v } from "convex/values";
import { query } from "./_generated/server";

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
