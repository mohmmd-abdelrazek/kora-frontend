import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "دوري الشباب",
  description: "دوري الشباب",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen flex-col">
        <div className="sm:hidden">
          <Header />
        </div>
        <div className="flex flex-1">{children}</div>
      </body>
    </html>
  );
}
