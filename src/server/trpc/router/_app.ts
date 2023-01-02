import { router } from "../trpc";
import { recipesRouter } from "./recipes/recipesRouter";
import { authRouter } from "./auth/authRouter";

export const appRouter = router({
  auth: authRouter,
  recipes: recipesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
