"use client"

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FilterSection from "@/components/filtersection";
import Header from "@/components/Header";
import { useState } from "react";

export default function ProjectsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("all");
  const filters = [
    { value: "all", label: "all projects" },
    { value: "application", label: "mobile applications" },
    { value: "website", label: "website development" },
    { value: "design", label: "ui/ux design" },
  ];

  const items = [
    { id: 1, category: "application", title: "Viora", description: "Confidence Starts with Your Outfit", image: "/viora3.webp" },
    { id: 2, category: "website", title: "Landing Page", description: "A clean, engaging page that highlights the company’s services and identity", image: "/landing7.webp" },
    { id: 3, category: "design", title: "Pawsh Pet", description: "pet care at your fingertips", image: "/pawsh3.webp" },
    { id: 4, category: "website", title: "Center-dawn &Dashboard", description: "Down Center platform with a fully integrated admin dashboard", image: "/dawn4.webp" },
    { id: 5, category: "design", title: "food-zone", description: "goog food lives here", image: "/food4.webp" },
    { id: 6, category: "application", title: "Cinon Films", description: "Your World of Movies & Series", image: "/cinon1.webp" },
    { id: 7, category: "website", title: "Hotel Booking App", description: "A simple and intuitive platform for browsing hotels and making reservations", image: "/tourism.webp" },
    { id: 8, category: "website", title: "Vitrin", description: "A modern online store for browsing and purchasing furniture", image: "/vitriin.webp" },
    { id: 9, category: "website", title: "Restaurant Booking", description: "A seamless platform for table booking and menu browsing", image: "/restaurant7.webp" },
    { id: 10, category: "website", title: "gift shopping", description: "A gift e-commerce website featuring an integrated admin dashboard for managing products, orders, and promotions.", image: "/gift5.webp" },
    { id: 11, category: "application", title: "SwiftStock", description: "Multi-user warehouse management with sales, expenses, stock analytics, profit calculations and low-stock alerts.", image: "/swiftStockImg/Gemini_Generated_Image_mk07iomk07iomk07.webp" },
    { id: 12, category: "website", title: "Aldawlia Publishing", description: "Digital bookstore for electronic books with advanced security and analytics.", image: "/imgpublish1.webp" },
    { id: 13, category: "website", title: "Herodex", description: "Medical e-commerce for skin and hair care products with Telegram bot integration.", image: "/imgherodex1.webp" },
  ];

  return (
    <main>
      <Header
        title={"our work speaks for us"}
        description={
          "from designe to programming integrated digital solutions that made a real difference whit our clients."
        }
      />
      <FilterSection  filters={filters} items={items}
       activeFilter={activeFilter}
       setActiveFilter={setActiveFilter}
       onCardClick={(item) => router.push(`/ourwork/${item.id}`)}
     />

      <div className="flex justify-center items-center mb-12">
     <PrimaryButton href={"/contact"} text= "START YOUR PROJECT NOW" />
     </div>
    </main>
  );
}
