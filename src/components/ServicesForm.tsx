"use client";

import store from "@/store/store";
import ComboBox from "@/components/ui/ComboBox";
import { Value } from "@/components/Form";
import Pill from "@/components/ui/Pill";

interface Props {
  services: Value[];
  categories: Value[];
}

export function ServicesForm({ services, categories }: Props) {
  const selectedServices = store((state) => state.quotation.services);
  const selectedCategories = store((state) => state.quotation.categories);
  const addCategory = store((state) => state.addCategory);
  const addService = store((state) => state.addService);
  const removeCategory = store((state) => state.removeCategory);
  const removeService = store((state) => state.removeService);

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-bold mb-4">Services:</h1>
        <ComboBox
          options={services}
          addOption={addService}
          placeholder="Select a service"
        >
          <div className="flex gap-2 flex-wrap mt-6">
            {Array.from(selectedServices).map((service) => (
              <Pill
                key={service.value}
                item={service}
                onRemove={removeService}
              />
            ))}
          </div>
        </ComboBox>
      </div>
      <div>
        <h1 className="font-bold mb-4">Categories:</h1>
        <ComboBox
          options={categories}
          addOption={addCategory}
          placeholder="Select a service"
        >
          <div className="flex gap-2 flex-wrap mt-6">
            {Array.from(selectedCategories).map((category) => (
              <Pill
                key={category.value}
                item={category}
                onRemove={removeCategory}
              />
            ))}
          </div>
        </ComboBox>
      </div>
    </div>
  );
}
