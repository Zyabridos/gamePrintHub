import type { UserDb } from "../types/db/UserDb.js";
import * as sharedTypes from "@gameprinthub/shared-types";

export type UserPublic = sharedTypes.UserPublic;
const { userPublicSchema } = sharedTypes;

export const toUserPublic = (user: UserDb): UserPublic => {
  return userPublicSchema.parse(user);
};
