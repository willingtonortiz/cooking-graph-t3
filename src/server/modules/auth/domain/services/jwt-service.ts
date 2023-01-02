import type { JwtPayload } from "../interfaces/jwt-payload";

export abstract class JwtService {
  abstract sign(payload: JwtPayload): string;

  abstract verify(token: string): JwtPayload | null;
}
