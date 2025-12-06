import { z } from "zod";

const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z.string().min(3, t("signup.errors.usernameMin")),
      email: z.string().email(t("signup.errors.emailInvalid")),
      password: z.string().min(8, t("signup.errors.passwordMin")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("signup.errors.passwordsMismatch"),
    });

export default createRegisterSchema;
