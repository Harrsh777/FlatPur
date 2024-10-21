import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import InteractiveBanner from "@/components/InteractiveBanner";
import Navbar from "@/components/base/Navbar";
import Toast from "@/components/base/Toast";
import Categories from "@/components/common/Categories";
import ScrollSearchBar from "@/components/ScrollSearchBar";
import FloatingBookAVisit from "@/components/FloatingBookAVisit";
import ChatAssistant from "@/components/base/ChatAssistant";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import CommercialSpacesSection from "@/components/CommercialSpacesSection";
import TrendingProperties from "@/components/TrendingProperties";
import PropertySection from "@/components/PostPropertySection";
import RealEstateSection from "@/components/RealEstateSection";
import ClientSection from "@/components/ClientSection";
import UnderConstructionProjects from "@/components/Underconstruction";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import AreaConverter from "@/components/AreaConverter";
import PostPropertySection from "@/components/ui/PostPropertySteps";
import PricePrediction from "@/components/PricePrediction";
import BenefitsSection from "@/components/BenefitsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactDetails";
import HelpSection from "@/components/HelpSection";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/base/Footer";
import HomeCardList from "@/components/HomeCardList"; // Import the client component
import AgentSection from "@/components/AgentSection";
import Homebar from "@/components/base/Homebar";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Query to fetch general homes data
  const query = supabase
    .from("homes")
    .select("id, images, title, country, city, price, users (metadata->name)");

  if (searchParams?.country) {
    query.ilike("country", `%${searchParams?.country}%`);
  }
  if (searchParams?.category) {
    query.contains("categories", [searchParams?.category]);
  }

  const { data: homes } = await query;

  // Query to fetch trending properties
  const trendingQuery = supabase
    .from("homes")
    .select("id, images, title, country, city, price, users (metadata->name)")
    .contains("categories", ["Trending"]);

  const { data: trendingHomes } = await trendingQuery;

  // Map through trendingHomes to extract the first image as 'image'
  const trendingHomesWithImage = trendingHomes?.map((home) => ({
    ...home,
    image: home.images?.[0] || null, // Use the first image or fallback to null
  }));

  // Query to fetch under-construction homes
  const underConstructionQuery = supabase
    .from("homes")
    .select("id, images, title, country, city, price")
    .contains("categories", ["Under-Construction"]);

  const { data: underConstructionHomes } = await underConstructionQuery;

  // Map through underConstructionHomes to extract the first image as 'image'
  const underConstructionWithImage = underConstructionHomes?.map((home) => ({
    ...home,
    image: home.images?.[0] || null,
  }));

  return (
    <div>
      <InteractiveBanner />
      <Homebar />
      <Toast />
      <Head>
        <title>Flatpur™ Official Site | Buy/Sell/Rent Properties</title>
        <meta name="description" content="Leading real estate platform offering a comprehensive selection of residential and commercial properties. Whether you're buying, renting, or investing, explore detailed listings, market trends, and future price predictions. Trusted by buyers and investors for expert insights and personalized services.Leading real estate platform based in Kanpur, offering a comprehensive selection of residential and commercial properties. Whether you're buying, renting, or investing, explore detailed listings, market trends, and future price predictions. Trusted by buyers and investors for expert insights and personalized services." />
      </Head>

      <div className="px-10 mt-[-90px]">
        <Categories /> {/* Categories section */}
      </div>

      {/* General Homes Section */}
      <HomeCardList homes={homes} />

      <ScrollSearchBar session={null} />
      <FloatingBookAVisit />
      <ChatAssistant />
      <PropertyTypesSection />
      <WhatsAppButton />
      <CommercialSpacesSection />

      {/* Trending Properties Section */}
      {trendingHomesWithImage && trendingHomesWithImage.length > 0 ? (
        <TrendingProperties trendingHomes={trendingHomesWithImage} />
      ) : (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">No Trending Properties found!</h1>
        </div>
      )}

      <PropertySection />
      <RealEstateSection />
      <ClientSection />

      {/* Under-Construction Projects Section */}
      {underConstructionWithImage && underConstructionWithImage.length > 0 && (
        <UnderConstructionProjects underConstructionHomes={underConstructionWithImage} />
      )}

      <WhyChooseUsSection />
      <div className="container mx-auto">
        <AreaConverter />
      </div>
      <PostPropertySection />
      <PricePrediction />
      <BenefitsSection />
      <AgentSection/>
      <FAQSection />
      <ContactSection />
      <HelpSection />
      <ReviewSection />
      <Footer />
    </div>
  );
}
