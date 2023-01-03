import { z } from "zod";

export const GetAllRecipesByUserIdOutput = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export const GetRecipeByIdInput = z.string().uuid();

export const GetRecipeByIdOutput = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  nodes: z.array(
    z.object({
      id: z.string().uuid(),
      xPos: z.number().int(),
      yPos: z.number().int(),
      data: z.any(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  edges: z.array(
    z.object({
      id: z.string().uuid(),
      animated: z.boolean(),
      sourceId: z.string().uuid(),
      targetId: z.string().uuid(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});

export const AddRecipeInput = z.object({
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
});

export const AddRecipeOutput = z.object({
  recipeId: z.string().uuid(),
});
