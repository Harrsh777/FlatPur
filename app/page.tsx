import React from "react";
import Head from "next/head";  // <-- Add this line
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
import HomeCardList from "@/components/HomeCardList";
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

  const trendingHomesWithImage = trendingHomes?.map((home) => ({
    ...home,
    image: home.images?.[0] || null,
  }));

  const underConstructionQuery = supabase
    .from("homes")
    .select("id, images, title, country, city, price")
    .contains("categories", ["Under-Construction"]);

  const { data: underConstructionHomes } = await underConstructionQuery;

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
        <meta
          name="description"
          content="Leading real estate platform in Kanpur offering a wide range of residential and commercial properties. Whether you're buying, renting, or investing, explore property listings, market trends, and price predictions. Trusted by Kanpur home buyers, real estate investors, and those seeking flats, plots, or commercial spaces. Featuring affordable housing, luxury flats, and new property developments. Get expert real estate insights and personalized services. Your go-to platform for Kanpur realty, whether you're searching for properties for sale or rental options in the Kanpur real estate market."
        />
        <link rel="icon" href="/favicon.png"/>
      </Head>

      <div className="px-10 mt-[-90px]">
        <Categories />
      </div>

      <HomeCardList homes={homes} />

      <ScrollSearchBar session={null} />
      <FloatingBookAVisit />
      <ChatAssistant />
      <PropertyTypesSection />
      <WhatsAppButton />
      <CommercialSpacesSection />

      {trendingHomesWithImage && trendingHomesWithImage.length > 0 ? (
        <TrendingProperties trendingHomes={trendingHomesWithImage} />
      ) : (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">
            No Trending Properties found!
          </h1>
        </div>
      )}

      <PropertySection />
      <RealEstateSection />
      <ClientSection />

      {underConstructionWithImage && underConstructionWithImage.length > 0 && (
        <UnderConstructionProjects
          underConstructionHomes={underConstructionWithImage}
        />
      )}

      <WhyChooseUsSection />
      <div className="container mx-auto">
        <AreaConverter />
      </div>
      <PostPropertySection />
      <PricePrediction />
      <BenefitsSection />
      <AgentSection />
      <FAQSection />
      <ContactSection />
      <HelpSection />
      <ReviewSection />
      <Footer />
    </div>
  );
}
