import { router } from "../trpc";
import { recipesRouter } from "./recipes/recipesRouter";
import { authRouter } from "./auth/authRouter";
import { userRouter } from "./user/userRouter";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  recipes: recipesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
