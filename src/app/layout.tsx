import { Inter } from "next/font/google";
import { getSEOTags } from "@/lib/seo/seo";
import { Analytics } from "@vercel/analytics/react";

import MainProvider from "./MainProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// todo rephrase and add to documentation
// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
        <Analytics />
      </body>
    </html>
  );
}
