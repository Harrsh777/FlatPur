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
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaShare, FaChevronDown } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-50">
      <Homebar />
      
      {/* Sticky Header with Property Info */}
      <div className="sticky top-0 z-40 bg-white shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{home?.title}</h1>
            <div className="flex items-center text-gray-600 mt-1">
              <FaMapMarkerAlt className="text-brand mr-1" />
              <span>{home?.city}, {home?.state}, {home?.country}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-2xl font-bold text-brand">{home?.price}</div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaHeart className="text-gray-500 hover:text-red-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaShare className="text-gray-500 hover:text-brand" />
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Image Carousel */}
        {home?.images && <ImageCarousel images={home.images} />}

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Key Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBed className="text-2xl text-brand mx-auto mb-2" />
                  <p className="font-semibold">3 Beds</p>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBath className="text-2xl text-brand mx-auto mb-2" />
                  <p className="font-semibold">2 Baths</p>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaRulerCombined className="text-2xl text-brand mx-auto mb-2" />
                  <p className="font-semibold">1,800 sqft</p>
                  <p className="text-sm text-gray-500">Area</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-2xl text-brand mx-auto mb-2" />
                  <p className="font-semibold">Floor 5</p>
                  <p className="text-sm text-gray-500">Location</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  Description
                  <FaChevronDown className="ml-2 text-brand" />
                </h2>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: home?.description }}
                ></div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Pet Friendly'].map((amenity, index) => (
                  <div key={index} className="flex items-center p-2">
                    <div className="w-2 h-2 bg-brand rounded-full mr-3"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-3xl text-brand mx-auto mb-2" />
                  <p className="font-semibold">{home?.city}, {home?.state}</p>
                  <p className="text-gray-600">Interactive map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price & Action Card */}
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-brand">{home?.price}</span>
                <p className="text-gray-500 mt-1">Price</p>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-brand hover:bg-brand-dark text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-md">
                  Schedule a Visit
                </button>
                <button className="w-full border border-brand text-brand hover:bg-brand hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  Contact Agent
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Agent Name</p>
                    <p className="text-gray-600">Real Estate Agent</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Call Now
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Additional Sections with improved styling */}
      <section className="bg-gray-100 py-16 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Similar Properties</h2>
          {trendingHomes && trendingHomes.length > 0 ? (
            <TrendingProperties trendingHomes={trendingHomes} />
          ) : (
            <div className="text-center mt-4">
              <h1 className="text-brand font-bold text-2xl">
                No Trending Properties found!
              </h1>
            </div>
          )}
        </div>
      </section>

      <PostPropertySteps />
      <ClientSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Under Construction Projects</h2>
          {underConstructionHomes && underConstructionHomes.length > 0 ? (
            <UnderConstructionProjects underConstructionHomes={underConstructionHomes} />
          ) : (
            <div className="text-center mt-4">
              <h1 className="text-brand font-bold text-2xl">
                No Under-Construction Properties found!
              </h1>
            </div>
          )}
        </div>
      </section>

      <BenefitsSection />
      <FAQSection />
      <ContactSection />
      
      {/* Interactive Elements */}
      <ChatAssistant />
      <FloatingBookAVisit />
      <WhatsAppButton />
      
      <Footer />
    </div>
  );
}