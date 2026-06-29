"use client"

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FilterSection from "@/components/filtersection";
import Header from "@/components/Header";
import { useState } from "react";
import { ourworkData } from "@/data/ourworkdata";

export default function ProjectsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("all");
  const filters = [
    { value: "all", label: "all projects" },
    { value: "application", label: "mobile applications" },
    { value: "website", label: "website development" },
    { value: "design", label: "ui/ux design" },
  ];

  const items = ourworkData.map(project => ({
    id: project.id,
    category: project.category,
    title: project.title,
    description: project.description,
    image: project.subImages[0] // استخدام أول صورة كصورة رئيسية
  }));

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
