"use client"
import React, { useState } from "react";
import Modal from "./Modal"; // EMI Modal
import Modal1 from "./Modal1"; // Rates & Trends Modal
import InvestmentHotspotModal from "./InvestmentHotspotModal"; // New Investment Hotspot Modal
import ResearchInsightsModal from "./Modal2"; // Research Insights Modal

const HelpSection: React.FC = () => {
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);
  const [isRatesTrendsModalOpen, setIsRatesTrendsModalOpen] = useState(false);
  const [isInvestmentHotspotModalOpen, setIsInvestmentHotspotModalOpen] = useState(false);
  const [isResearchInsightsModalOpen, setIsResearchInsightsModalOpen] = useState(false);

  const openEMIModal = () => setIsEMIModalOpen(true);
  const closeEMIModal = () => setIsEMIModalOpen(false);

  const openRatesTrendsModal = () => setIsRatesTrendsModalOpen(true);
  const closeRatesTrendsModal = () => setIsRatesTrendsModalOpen(false);

  const openInvestmentHotspotModal = () => setIsInvestmentHotspotModalOpen(true);
  const closeInvestmentHotspotModal = () => setIsInvestmentHotspotModalOpen(false);

  const openResearchInsightsModal = () => setIsResearchInsightsModalOpen(true);
  const closeResearchInsightsModal = () => setIsResearchInsightsModalOpen(false);

  return (
    <section className="py-8 w-full">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
        <h2 className="text-3xl font-bold mb-6">Advice & Tools</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border rounded-lg p-6 flex flex-col items-start">
            <img src="/images/interest-rate.png" alt="Rates & Trends" className="mb-4 w-12 h-12" />
            <h3 className="font-bold mb-2 text-xl">Rates & Trends</h3>
            <p className="text-gray-600 mb-4">
              Know all about Property Rates & Trends in your city
            </p>
            <button
              onClick={openRatesTrendsModal}
              className="mt-auto text-red-500 font-semibold hover:underline"
            >
              View now &#8594;
            </button>
          </div>
          <div className="border rounded-lg p-6 flex flex-col items-start">
            <img src="/images/calculator.png" alt="EMI Calculator" className="mb-4 w-12 h-12" />
            <h3 className="font-bold mb-2 text-xl">EMI Calculator</h3>
            <p className="text-gray-600 mb-4">
              Know how much you'll have to pay every month on your loan
            </p>
            <button
              onClick={openEMIModal}
              className="mt-auto text-red-500 font-semibold hover:underline"
            >
              View now &#8594;
            </button>
          </div>
          <div className="border rounded-lg p-6 flex flex-col items-start">
            <img src="/images/investment.png" alt="Investment Hotspot" className="mb-4 w-12 h-12" />
            <h3 className="font-bold mb-2 text-xl">Investment Hotspot</h3>
            <p className="text-gray-600 mb-4">
              Discover the top localities in your city for investment
            </p>
            <button
              onClick={openInvestmentHotspotModal} 
              className="mt-auto text-red-500 font-semibold hover:underline"
            >
              View now &#8594;
            </button>
          </div>
          <div className="border rounded-lg p-6 flex flex-col items-start">
            <img src="/images/research.png" alt="Research Insights" className="mb-4 w-12 h-12" />
            <h3 className="font-bold mb-2 text-xl">Research Insights</h3>
            <p className="text-gray-600 mb-4">
              Get experts insights and research reports on real estate
            </p>
            <button
              onClick={openResearchInsightsModal}
              className="mt-auto text-red-500 font-semibold hover:underline"
            >
              View now &#8594;
            </button>
          </div>
        </div>

        {/* Modals */}
        <Modal isOpen={isEMIModalOpen} onClose={closeEMIModal} />
        <Modal1 isOpen={isRatesTrendsModalOpen} onClose={closeRatesTrendsModal} />
        <InvestmentHotspotModal isOpen={isInvestmentHotspotModalOpen} onClose={closeInvestmentHotspotModal} />
        <ResearchInsightsModal isOpen={isResearchInsightsModalOpen} onClose={closeResearchInsightsModal} />
      </div>
    </section>
  );
};

export default HelpSection;
