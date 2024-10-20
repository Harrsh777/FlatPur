import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function fetchHomeData(id: string) {
    const supabase = createServerComponentClient({ cookies });
  
    // Fetch home details
    const { data: homeData } = await supabase
      .from("homes")
      .select("id, image, price, title, country, city, users (metadata->name)")
      .eq("id", id)
      .single(); // Ensure single home detail is fetched
  
    // Fetch under-construction homes
    const { data: underConstructionHomes } = await supabase
      .from("homes")
      .select("id, image, title, country, city, price")
      .contains("categories", ["Under-Construction"]);
  
    // Fetch trending homes
    const { data: trendingHomes } = await supabase
      .from("homes")
      .select("id, image, title, country, city, price, users (metadata->name)")
      .contains("categories", ["Trending"]);
  
    return { homeData, underConstructionHomes, trendingHomes };
  }
  