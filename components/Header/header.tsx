"use client";

import React from "react";
import Link from "next/link";
import Form from "next/form";
import { TrolleyIcon } from "@sanity/icons";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const headerClass = cn("flex flex-wrap justify-between items-center col-span-8 px-4 py-2", className);

  return (
    <header className={headerClass}>
      <div className="flex flex-wrap justify-between items-center gap-3 w-full">
        <Link href="/" className="hover:opacity-50 mx-auto sm:mx-0 font-bold text-blue-500 text-2xl cursor-pointer">
          Impact shop
        </Link>

        <Form action="/search" className="flex sm:flex-1 justify-center mt-2 sm:mt-0 w-full sm:w-auto">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-100 focus:ring-opacity-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-4xl text-gray-800"
          />
        </Form>

        <div className="flex flex-1 sm:flex-none items-center space-x-4 mt-4 sm:mt-0">
          <Link
            href="/basket"
            className="relative flex flex-1 sm:flex-none justify-center sm:justify-start items-center space-x-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
          >
            <TrolleyIcon className="w-6 h-6" />

            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
