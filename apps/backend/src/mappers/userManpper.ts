import type { UserDb } from "../types/db/UserDb.js";
import { userPublicSchema, type UserPublic } from "@gameprinthub/shared-types";

export const toUserPublic = (user: UserDb): UserPublic => {
  return userPublicSchema.parse(user);
};
