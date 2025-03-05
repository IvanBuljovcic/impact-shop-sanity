import type { Metadata } from "next";

import { Category } from "@/sanity.types";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Header from "@/components/header";
import Aside from "@/components/aside";
import "../globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories: Category[] = await getAllCategories();

  return (
    <html lang="en">
      <body>
        <div className="grid grid-cols-12">
          <Header className="col-span-full" />

          <Aside categories={categories} />

          <main className="col-span-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
