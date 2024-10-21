import React from 'react';

const agents = [
  {
    name: "Kamil Pathan",
    role: "Advisor",
    image: "/images/kamil.JPG",
    bio: "Meet our expert advisor,Kamil, dedicated to finding your dream home with personalized service and local knowledge.",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ahtisham Hussain",
    role: "Advisor",
    image: "/images/ahtisham.jpg",
    bio: "Introducing Ahtisham, your trusted real estate advisor, committed to guiding you through every step of your property journey.",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    name: "Asif Hussain",
    role: "Advisor",
    image: "/images/asif.jpg",
    bio: "Say hello to Asif, a passionate real estate professional ready to help you navigate the market with ease.",
    social: {
      twitter: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
];

const MeetOurAgentsSection = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Meet Our Advisors</h2>
        <p className="text-gray-600">Flatpur connects you with top agents who provide personalized assistance for all your real estate needs</p>
      </div>

      <div className="flex justify-center space-x-6">
        {agents.map((agent, index) => (
          <div key={index} className="text-center">
            <div className="mb-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-40 h-40 object-cover rounded-full mx-auto"
                width={100} // Set the width of the image
                height={180}
              />
            </div>
            <h3 className="font-bold">{agent.name}</h3>
            <p className="text-gray-500">{agent.role}</p>
            <p className="text-gray-600 mt-2">{agent.bio}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href={agent.social.twitter}>
                <img src="/images/twitter.png" alt="Twitter" className="w-6 h-6" />
              </a>
              <a href={agent.social.facebook}>
                <img src="/images/Instagram.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href={agent.social.linkedin}>
                <img src="/images/google.png" alt="LinkedIn" className="w-6 h-6" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurAgentsSection;
