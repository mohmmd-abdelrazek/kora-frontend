import type { Metadata } from "next";
import "./globals.css";
import Header2 from "@/src/components/Header2";
import Providers from "./providers";

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
      <body className="flex flex-col">
        <Providers>
          <div className="">
            <Header2 />
          </div>
          <div className="flex flex-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
