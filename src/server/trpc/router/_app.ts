import { router } from "../trpc";
import { exampleRouter } from "./example";
import { recipesRouter } from "./recipes/recipesRouter";

export const appRouter = router({
  example: exampleRouter,
  recipes: recipesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
