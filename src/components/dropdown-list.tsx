import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type DropdownListProps = {
  list: { id: number; name: string }[];
  onSelect: (value: string) => void;
};

const DropdownList = ({ list, onSelect }: DropdownListProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const selectedCountryTemplate = (option: { id: number; name: string }) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{option}</span>;
  };

  const countryOptionTemplate = (option: { id: number; name: string }) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const handleChange = (e: DropdownChangeEvent) => {
    setSelectedCountry(e.value);
    onSelect(e.value);
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCountry}
        onChange={handleChange}
        options={list}
        optionLabel="name"
        placeholder="Selecciones una marca"
        filter
        filterDelay={400}
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="w-full h-12"
      />
    </div>
  );
};

export default DropdownList;
