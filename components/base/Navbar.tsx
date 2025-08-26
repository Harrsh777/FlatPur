import React from "react";
import BrandLogo from "./BrandLogo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import FullSearchBar from "../SearchBar";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();
  return (
    <div>
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12 py-3 md:py-2 border-b">
        <div className="block md:block">
          <BrandLogo />
        </div>
        <div className="hidden md:flex justify-center items-center space-x-4" />
      </nav>
    </div>
  );
}