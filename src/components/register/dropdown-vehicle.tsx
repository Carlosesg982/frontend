import { VehicleList } from "@/src/lib/features/core/vehicule/types/vehicle-list.type";
import { useState, useEffect } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type DropdownVehicleProps = {
  list: VehicleList[];
  onSelect: (value: number) => void;
};

const DropdownVehicle = ({ list, onSelect }: DropdownVehicleProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedId !== null) {
      onSelect(selectedId);
    }
  }, [selectedId, onSelect]);

  const selectedCountryTemplate = (option: VehicleList) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>
            {option.brand} {option.model} - {option.plate}
          </div>
        </div>
      );
    }

    return <span>{option}</span>;
  };

  const countryOptionTemplate = (option: VehicleList) => {
    return (
      <div className="flex align-items-center">
        <div>
          {option.brand} {option.model} - {option.plate}
        </div>
      </div>
    );
  };

  const handleChange = (e: DropdownChangeEvent) => {
    setSelectedCountry(e.value);
    setSelectedId(e.value?.id || null);
  };
  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCountry}
        onChange={handleChange}
        options={list}
        optionLabel="name"
        filter
        filterDelay={400}
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="w-full h-12"
      />
    </div>
  );
};

export default DropdownVehicle;
