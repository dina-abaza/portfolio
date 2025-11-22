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
    { id: 1, category: "application", title: "BOOKING APP", description: "Reservation app UI and flow.", image: "/service5.png" },
    { id: 2, category: "website", title: "FURNITURE STORE", description: "E-commerce website for furniture.", image: "/service2.png" },
    { id: 3, category: "design", title: "ADMIN DASHBOARD", description: "Management dashboard UI.", image: "/service14.png" },
    { id: 4, category: "website", title: "EDUCATION PLATFORM", description: "Interactive learning website.", image: "/service4.png" },
    { id: 5, category: "application", title: "FLIGHT BOOKING APP", description: "Flight search and reservation app.", image: "/service1.png" },
    { id: 6, category: "design", title: "BRAND IDENTITY", description: "Logo and visual system design.", image: "/service7.png" },
    { id: 7, category: "application", title: "RESTAURANT ORDER APP", description: "Mobile ordering and delivery tracking.", image: "/service6.png" },
    { id: 8, category: "website", title: "HOTEL BOOKING SITE", description: "Booking and room management system.", image: "/service8.png" },
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
