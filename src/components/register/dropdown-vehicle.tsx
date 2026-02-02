import { VehicleList } from "@/src/lib/features/core/vehicule/types/vehicle-list.type";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type DropdownVehicleProps = {
  list: VehicleList[];
  onSelect: (value: number) => void;
  selectedCountry: string | null;
  setSelectedCountry: (value: string | null) => void;
};

const DropdownVehicle = ({
  list,
  onSelect,
  selectedCountry,
  setSelectedCountry,
}: DropdownVehicleProps) => {
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
    onSelect(e.value?.id || 0);
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
        required
      />
    </div>
  );
};

export default DropdownVehicle;
