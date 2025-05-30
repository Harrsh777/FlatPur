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
      <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
        <div className="hidden md:block">
          <BrandLogo />
          
        </div>
        <div className="hidden md:flex justify-center items-center space-x-4">
       
         
        </div>
      </nav>
    </div>
  );
}