import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/Components/Navbar/Navbar";
import { LocaleProvider } from "@/context/LocaleContext";
import I18nProvider from "../locales/i18nProvider";

export const metadata: Metadata = {
  title: "Frosthaven Hub",
  description: "Frosthaven scenarios and 3D printing storage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <I18nProvider>
          <LocaleProvider>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          </LocaleProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
