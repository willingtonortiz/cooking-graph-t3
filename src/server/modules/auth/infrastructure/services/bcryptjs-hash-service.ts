import { hash, compare } from "bcryptjs";
import type { HashService } from "../../domain/services/hash-service";

export class BcryptJsHashService implements HashService {
  async hash(value: string): Promise<string> {
    return hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
