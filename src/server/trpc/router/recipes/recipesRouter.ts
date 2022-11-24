import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { publicProcedure, router } from "../../trpc";

export const recipesRouter = router({
  getById: publicProcedure
    .input(z.string().uuid())
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.recipe.findUnique({
        where: { id: input },
        include: {
          nodes: true,
          edges: true,
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Recipe not found",
        });
      }

      return result;
    }),
  addOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        nodes: z.array(
          z.object({
            id: z.string().uuid(),
            xPos: z.number().int(),
            yPos: z.number().int(),
            data: z.any(),
          })
        ),
        edges: z.array(
          z.object({
            id: z.string(),
            animated: z.boolean(),
            sourceId: z.string(),
            targetId: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, nodes, edges } = input;

      const recipeId = uuidv4();
      const now = new Date();
      const recipeData = { id: recipeId, name, createdAt: now, updatedAt: now };
      const nodesData = nodes.map((node) => ({
        ...node,
        recipeId,
        createdAt: now,
        updatedAt: now,
        data: node.data,
      }));
      const edgesData = edges.map((edge) => ({
        ...edge,
        recipeId,
        createdAt: now,
        updatedAt: now,
      }));
      await ctx.prisma.recipe.create({ data: recipeData });
      await ctx.prisma.node.createMany({ data: nodesData });
      await ctx.prisma.edge.createMany({ data: edgesData });

      return { recipeId };
    }),
});
