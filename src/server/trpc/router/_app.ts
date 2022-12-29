import { router } from "../trpc";
import { exampleRouter } from "./example";
import { recipesRouter } from "./recipes/recipesRouter";
import { authRouter } from "./auth/authRouter";

export const appRouter = router({
  example: exampleRouter,
  recipes: recipesRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
