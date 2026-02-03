import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type DropdownListProps = {
  list: { id: number; name: string }[];
  onSelect: (value: number) => void;
  selectedCountry: string | null;
  setSelectedCountry: (value: string | null) => void;
};

const DropdownList = ({
  list,
  onSelect,
  selectedCountry,
  setSelectedCountry,
}: DropdownListProps) => {
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

export default DropdownList;
