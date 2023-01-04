import { publicProcedure, router } from "../../trpc";
import { GetMeOutput } from "./userRouter.types";

export const userRouter = router({
  me: publicProcedure.output(GetMeOutput).query(async ({ ctx }) => {
    const userPayload = ctx.user;
    if (!userPayload) {
      return null;
    }

    return await ctx.prisma.user.findUnique({
      where: { id: userPayload.id },
    });
  }),
});
