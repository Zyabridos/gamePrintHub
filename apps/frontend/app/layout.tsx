"use client";

import { I18nextProvider } from "react-i18next";
import "./globals.css";
import i18n from "@/locales/i18n";
import Navbar from "@/Components/Navbar/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <I18nextProvider i18n={i18n}>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </I18nextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
