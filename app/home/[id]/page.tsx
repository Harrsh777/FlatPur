import ChatAssistant from "@/components/base/ChatAssistant";
import Footer from "@/components/base/Footer";
import Homebar from "@/components/base/Homebar";
import BenefitsSection from "@/components/BenefitsSection";
import ClientSection from "@/components/ClientSection";
import ContactSection from "@/components/ContactDetails";
import FAQSection from "@/components/FAQSection";
import FloatingBookAVisit from "@/components/FloatingBookAVisit";
import ImageCarousel from "@/components/ImageCarousel";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import TrendingProperties from "@/components/TrendingProperties";
import PostPropertySteps from "@/components/ui/PostPropertySteps";
import UnderConstructionProjects from "@/components/Underconstruction";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ShowHome({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch Home Details
  const { data, error: homeError } = await supabase
    .from("homes")
    .select("*, images, users (metadata->name)")
    .eq("id", params?.id);
  
  const home = data?.[0];

  // Fetch Under Construction Homes
  const underConstructionQuery = supabase
    .from("homes")
    .select("id, images, title, country, city, price")
    .contains("categories", ["Under-Construction"]);

  const { data: underConstructionHomes, error: underConstructionError } = await underConstructionQuery;

  // Fetch Trending Homes
  const trendingQuery = supabase
    .from("homes")
    .select("id, images, title, country, city, price, users (metadata->name)")
    .contains("categories", ["Trending"]);

  const { data: trendingHomes, error: trendingError } = await trendingQuery;

  if (homeError || underConstructionError || trendingError) {
    console.error('Error fetching data:', homeError || underConstructionError || trendingError);
    return <div>Error loading property details.</div>;
  }

  return (
    <div className="mb-10">
      <Homebar /> {/* Homebar is now a regular function component */}
      <div className="container mt-5 mb-[4cm]">
        {/* Title and Country details */}
        <div>
          <h1 className="text-2xl font-bold">{home?.title}</h1>
          <p>
            {home?.city}, {home?.state}, {home?.country}
          </p>
        </div>

        {/* Image Carousel */}
        {home?.images && <ImageCarousel images={home.images} />}

        {/* Home Description */}
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: home?.description }}
        ></div>
      </div>

      {/* Additional Sections */}
      <ChatAssistant />
      <FloatingBookAVisit />
      <WhatsAppButton />
      <PropertyTypesSection />

      {/* Trending Properties Section */}
      {trendingHomes && trendingHomes.length > 0 ? (
        <TrendingProperties trendingHomes={trendingHomes} />
      ) : (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">
            No Trending Properties found!
          </h1>
        </div>
      )}

      <PostPropertySteps />
      <ClientSection />

      {/* Under-Construction Projects Section */}
      {underConstructionHomes && underConstructionHomes.length > 0 ? (
        <UnderConstructionProjects underConstructionHomes={underConstructionHomes} />
      ) : (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">
            No Under-Construction Properties found!
          </h1>
        </div>
      )}

      <BenefitsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
