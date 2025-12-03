// OurWorkShowcase.jsx
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { ourworkData } from "@/data/ourworkdata";
import { FaUsers, FaClock } from "react-icons/fa"; 
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";

export default function OurWorkShowcase() {
  const { id } = useParams();
  const project = ourworkData.find((item) => item.id == id);

  if (!project) {
    return (
      <div className="text-white text-center py-20">
        <p>Project not found.</p>
      </div>
    );
  }
  
  const showcaseImages = project.subImages ? project.subImages.slice(0, 3) : [];

  return (
    <>
      <section className="w-full flex justify-center bg-[#0C0C0C] py-[60px] px-[20px]">
        <div className="w-full lg:max-w-[1550px] mx-auto flex flex-col gap-[20px] md:gap-[44px]">

        <div className="flex flex-col sm:flex-row justify-center gap-4">
  {showcaseImages.map((img, i) => (
    <div
      key={i}
      className="w-full sm:w-1/3 aspect-[4/3] overflow-hidden rounded-[16px]"
    >
      <Image
        src={img}
        alt={`showcase-image-${i}`}
        width={800}
        height={600}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>

          
          {project.demoLink && project.category?.toLowerCase() === 'website' && (
            <div className="flex justify-center items-center mt-8">
              <PrimaryButton 
                href={project.demoLink} 
                text="SEE LIVE DEMO"
                target="_blank" 
                rel="noopener noreferrer"
              />
            </div>
          )}

          <div className="w-full h-[2px] bg-white my-[20px] md:my-[40px]"></div>

        
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 px-6 py-2 sm:py-3 md:py-4 lg:py-6 mx-auto rounded-[16px]">

            {/* Title & Description */}
            <div className="w-full sm:w-full md:w-full lg:w-1/4 text-white text-center lg:text-left">
              <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold mb-[6px] uppercase tracking-wide">
                {project.title}{" "}
                <span className="block text-[12px] sm:text-[14px] md:text-[18px] font-extralight text-gray-200 ml-2">
                  (case study)
                </span>
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-extralight text-gray-200">
                {project.description}
              </p>
            </div>

            {/* Time & Team Members */}
            <div className="flex justify-center items-center gap-2 sm:gap-8 md:gap-8 lg:gap-8 flex-nowrap flex-row">
              <div className="w-1/2 bg-white rounded-[16px] px-6 py-4 flex flex-col items-center justify-center gap-2 w-[170px] sm:w-[200px] md:w-[250px] h-[120px] shadow-md">
                <h3 className="text-[14px] sm:text-[16px] md:text-[18px] text-[#0C0C0C] font-medium mb-1 whitespace-nowrap">
                  Project time
                </h3>
                <div className="flex items-center gap-2 text-[#0C0C0C]">
                  <FaClock size={20} />
                  <p className="text-[12px] sm:text-[14px] md:text-[16px]">{project.time}</p>
                </div>
              </div>

              <div className="bg-white rounded-[16px] px-6 py-4 flex flex-col items-center justify-center gap-2 w-[170px] sm:w-[200px] md:w-[250px] h-[120px] shadow-md">
                <h3 className="text-[14px] sm:text-[16px] md:text-[18px] text-[#0C0C0C] font-medium mb-1 whitespace-nowrap">
                  Team members
                </h3>
                <div className="flex items-center gap-2 text-[#0C0C0C]">
                  <FaUsers size={20} />
                  <p className="text-[12px] sm:text-[14px] md:text-[16px]">
                    {project.members} Members
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <PrimaryButton href={"/contact"} text={"start your project now"} />

          </div>
        </div>
      </section>


  <section className="w-full flex justify-center bg-[#0C0C0C] py-[60px] px-[20px]">
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[44px] auto-rows-fr">
      <div className="bg-white rounded-[16px] flex flex-col p-[32px] h-full">

            <div className="flex flex-col lg:flex-row items-center justify-center gap-[20px] mb-[20px] ">
              <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] bg-[#E53935] rounded-full flex items-center justify-center">
                <span className="text-white text-[20px] md:text-[30px] font-bold">!</span>
              </div>
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-[#0C0C0C] leading-[1.2] whitespace-nowrap">
                Problem Statement
              </h3>
            </div>
            <p className="text-[20px] md:text-[24px] text-[#444] font-light leading-[32px] text-center max-w-[556px] mx-auto normal-case">
              {project.problem}
            </p>
          </div>

          <div className="bg-white rounded-[16px] flex flex-col p-[32px] h-full">

            <div className="flex flex-col lg:flex-row items-center justify-center gap-[20px] mb-[20px]">
              <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-[20px] md:text-[30px] font-bold">✓</span>
              </div>
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-[#0C0C0C] leading-[1.2] whitespace-nowrap">
                Solution
              </h3>
            </div>
            <p className="text-[20px] md:text-[24px] text-[#444] font-light leading-[32px] text-center max-w-[556px] mx-auto normal-case">
              {project.solution}
            </p>
          </div>

        </div>
      </section>

      <section className="w-full flex justify-center bg-white py-[40px] px-[20px]">
        <div className="w-full mx-auto flex flex-col items-center">

          <h2 className="text-[24px] md:text-[40px] font-semibold text-black text-center mb-[20px] md:mb-[40px]">
            {project.keyFeaturesTitle || "Key Features"}
          </h2>

          <div className="w-full flex flex-col sm:flex-col md:flex-row justify-center items-center gap-[14px] md:gap-[14px] lg:gap-[20px]">
            {project.keyFeatures?.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="w-[250px] h-[85px] sm:w-[300px] sm:h-[100px] md:w-[400px] md:h-[140px] bg-[#0C0C0C] rounded-[12px] flex items-center px-[20px] md:px-[32px] gap-[20px] md:gap-[32px]"
              >
                <div className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[48px] md:h-[48px] flex items-center justify-center text-white text-[24px] sm:text-[28px] md:text-[32px]">
                  {feature.icon}
                </div>
                <h4 className="text-white text-[14px] sm:text-[16px] md:text-[16px] font-medium text-center whitespace-nowrap">
                  {feature.text}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-50 w-full mx-auto bg-white flex flex-col items-center justify-center px-[40px] md:px-[27px] py-[36px] md:py-[70px] mt-[40px] md:mt-[72px]">
        <h2 className="w-full text-[16px] sm:text-[24px] md:text-[24px] lg:text-[30px] font-bold text-center mb-[20px] sm:mb-[30px] md:mb-[40px] text-black">
          Technology Used
        </h2>

        <div className="flex items-center justify-center flex-wrap gap-[16px] sm:gap-[20px] md:gap-[24px] lg:gap-[30px]">
          {project.technologies.map((tech, index) => (
            <span key={index} className=" text-[14px] sm:text-[18px] md:text-[20px] font-extralight text-gray-800">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <div className="my-[40px] md:my-[72px] flex flex-col sm:flex-row md:flex-row justify-center items-center gap-4">
        <PrimaryButton href={"/contact"} text={"start your project now"}/>
        <SecondaryButton href={"/ourwork"} text={"see all projects"}/>
      </div>
    </>
  );
}
