import axios from "axios";
import type { UserPublic } from "@gameprinthub/shared-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
};

export async function createUser(
  payload: CreateUserPayload,
): Promise<UserPublic> {
  const response = await axios.post<UserPublic>(
    `${API_BASE_URL}/api/users`,
    payload,
  );
  return response.data;
}

export async function getUserById(id: number): Promise<UserPublic> {
  const response = await axios.get<UserPublic>(
    `${API_BASE_URL}/api/users/${id}`,
  );
  return response.data;
}
