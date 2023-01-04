import { TRPCError } from "@trpc/server";
import { serialize } from "cookie";
import { publicProcedure, router } from "../../trpc";
import {
  LoginRequestSchema,
  LoginResponseSchema,
  RegisterRequestSchema,
  RegisterResponseSchema,
} from "./authRouter.types";
import { JsonWebTokenJwtService } from "../../../modules/auth/infrastructure/services/jsonwebtoken-jwt-service";
import { BcryptJsHashService } from "../../../modules/auth/infrastructure/services/bcryptjs-hash-service";

export const authRouter = router({
  login: publicProcedure
    .input(LoginRequestSchema)
    .output(LoginResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const foundUser = await ctx.prisma.user.findUnique({ where: { email } });

      if (!foundUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const hashService = new BcryptJsHashService();
      const isPasswordCorrect = await hashService.compare(
        password,
        foundUser.password
      );
      if (!isPasswordCorrect) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password",
        });
      }

      const jwtService = new JsonWebTokenJwtService();
      const token = jwtService.sign({ id: foundUser.id });

      const serialized = serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: "/",
      });
      ctx.res.setHeader("Set-Cookie", serialized);

      return { token };
    }),

  register: publicProcedure
    .input(RegisterRequestSchema)
    .output(RegisterResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { firstName, lastName, email, password } = input;

      const foundUser = await ctx.prisma.user.findUnique({ where: { email } });
      if (foundUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }

      const hashService = new BcryptJsHashService();
      const hashedPassword = await hashService.hash(password);
      await ctx.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      return {};
    }),
});
