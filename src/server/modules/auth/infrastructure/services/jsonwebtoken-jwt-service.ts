import type { JwtService } from "../../domain/services/jwt-service";
import type { JwtPayload } from "../../domain/interfaces/jwt-payload";
import { sign as signToken, verify as verifyToken } from "jsonwebtoken";

export class JsonWebTokenJwtService implements JwtService {
  sign(payload: JwtPayload): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return signToken(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  verify(token: string): JwtPayload | null {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return verifyToken(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (e) {
      return null;
    }
  }
}
