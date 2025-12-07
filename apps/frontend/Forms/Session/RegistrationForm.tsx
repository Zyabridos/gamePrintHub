"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import usersApi from "@/api/users";
import createRegisterSchema from "@/zod/registerSchema";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;

const RegistrationForm = () => {
  const { t } = useTranslation("auth");
  const RegisterSchema = useMemo(() => createRegisterSchema(t), [t]);

  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    setServerError(null);
    setSuccessMessage(null);

    const result = RegisterSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: RegisterFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await usersApi.create({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // TODO: redirect to home page or auto-login
      setSuccessMessage(t("signup.title"));

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          | { message?: string; error?: string }
          | undefined;

        setServerError(
          data?.message || data?.error || t("signup.errors.serverCreateFailed"),
        );
      } else {
        setServerError(t("signup.errors.networkError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center">
      <div className="w-full rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="mb-1 text-lg font-semibold">{t("signup.title")}</h2>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          {t("signup.subtitle")}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-sm font-medium">
              {t("signup.usernameLabel")}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 text-sm outline-none transition placeholder:text-slate-400
                    ${
                      errors.username
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-slate-700"
                    }
                    bg-white dark:bg-slate-900`}
              placeholder={t("signup.usernamePlaceholder")}
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium">
              {t("signup.emailLabel")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 text-sm outline-none transition placeholder:text-slate-400
                    ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-slate-700"
                    }
                    bg-white dark:bg-slate-900`}
              placeholder={t("signup.emailPlaceholder")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium">
              {t("signup.passwordLabel")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 text-sm outline-none transition placeholder:text-slate-400
                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-slate-700"
                    }
                    bg-white dark:bg-slate-900`}
              placeholder={t("signup.passwordPlaceholder")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              {t("signup.repeatPasswordLabel")}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 text-sm outline-none transition placeholder:text-slate-400
                    ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-slate-700"
                    }
                    bg-white dark:bg-slate-900`}
              placeholder={t("signup.repeatPasswordPlaceholder")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {serverError && <p className="text-sm text-red-500">{serverError}</p>}

          {successMessage && (
            <p className="text-sm text-emerald-500">{successMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            {isSubmitting
              ? t("signup.signupButtonLoading")
              : t("signup.signupButton")}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegistrationForm;
