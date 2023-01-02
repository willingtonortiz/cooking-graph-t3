import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../db/client";
import type { JwtPayload } from "../modules/auth/domain/interfaces/jwt-payload";
import { JsonWebTokenJwtService } from "../modules/auth/infrastructure/services/jsonwebtoken-jwt-service";

type CreateContextOptions = {
  req: NextApiRequest;
  res: NextApiResponse;
};

const getUserFromRequest = (req: NextApiRequest): JwtPayload | null => {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }

  const jwtService = new JsonWebTokenJwtService();
  return jwtService.verify(token);
};

export const createContextInner = async (opts: CreateContextOptions) => {
  const user = getUserFromRequest(opts.req);

  return { ...opts, prisma, user };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  return await createContextInner(opts);
};

export type Context = inferAsyncReturnType<typeof createContext>;
