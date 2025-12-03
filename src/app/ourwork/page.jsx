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
    { id: 1, category: "application", title: "Viora", description: "Confidence Starts with Your Outfit", image: "/viora3.png" },
    { id: 2, category: "website", title: "Landing Page", description: "A clean, engaging page that highlights the company’s services and identity", image: "/landing7.png" },
    { id: 3, category: "design", title: "Pawsh Pet", description: "pet care at your fingertips", image: "/pawsh3.png" },
    { id: 4, category: "website", title: "Center-dawn &Dashboard", description: "Down Center platform with a fully integrated admin dashboard", image: "/dawn4.jpeg" },
    { id: 5, category: "design", title: "food-zone", description: "goog food lives here", image: "/food4.png" },
    { id: 6, category: "application", title: "Cinon Films", description: "Your World of Movies & Series", image: "/cinon1.png" },
    { id: 7, category: "website", title: "Hotel Booking App", description: "A simple and intuitive platform for browsing hotels and making reservations", image: "/travel5.jpeg" },
    { id: 8, category: "website", title: "Vitrin", description: "A modern online store for browsing and purchasing furniture", image: "/vitrin8.png" },
    { id: 9, category: "website", title: "Restaurant Booking", description: "A seamless platform for table booking and menu browsing", image: "/restaurant7.png" },

    

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
