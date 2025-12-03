import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useServiceStore = create(
  persist(
    (set) => ({
      selectedService: null,
      setSelectedService: (service) => set({ selectedService: service }),
    }),
    {
      name: "service-storage", // اسم المفتاح في localStorage
    }
  )
);
