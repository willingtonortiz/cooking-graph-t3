import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { router, publicProcedure } from "../../trpc";
import {
  AddRecipeInput,
  AddRecipeOutput,
  GetAllRecipesByUserIdOutput,
  GetRecipeByIdInput,
  GetRecipeByIdOutput,
} from "./recipesRouter.types";

export const recipesRouter = router({
  getById: publicProcedure
    .input(GetRecipeByIdInput)
    .output(GetRecipeByIdOutput)
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.recipe.findUnique({
        where: { id: input },
        include: { nodes: true, edges: true },
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
    .input(AddRecipeInput)
    .output(AddRecipeOutput)
    .mutation(async ({ input, ctx }) => {
      const { name, nodes, edges } = input;

      const user = ctx.user;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const recipeId = uuidv4();
      const now = new Date();
      const recipeData = {
        id: recipeId,
        name,
        createdAt: now,
        updatedAt: now,
        userId: user.id,
      };
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
