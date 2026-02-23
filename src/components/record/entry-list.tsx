import DropdownVehicle from "@/src/components/register/dropdown-vehicle";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  setSelectedMotorcyclist,
  setSelectedIdVehicles,
  setSelectedCreatedAt,
  setSearchFilters,
  setHasActiveFilters,
  setReset,
} from "@/src/lib/features/core/movement/slice/movement-list.slice";
import { postMovementList } from "@/src/lib/features/core/movement/thunks/movement-list.thunk";
import { Button } from "primereact/button";
import { setSelectedVehicle } from "@/src/lib/features/core/movement/slice/movement-create.slice";
import { useEffect } from "react";
import EntryListSkeleton from "@/src/components/record/entry-list-skeleton";

const EntryList = () => {
  const dispatch = useAppDispatch();
  const { vehiclesList } = useAppSelector((state) => state.vehicleList);
  const { selectedvehicle } = useAppSelector((state) => state.movementCreate);
  const {
    movements,
    loading,
    selectedMotorcyclist,
    selectedCreatedAt,
    hasActiveFilters,
    selectedIdVehicles,
  } = useAppSelector((state) => state.movementList);

  const clearFilters = async () => {
    await dispatch(setReset());
    await dispatch(setSelectedVehicle(null));
  };

  const handleSearch = async () => {
    await dispatch(setSearchFilters());
    await dispatch(postMovementList());
  };

  useEffect(() => {
    dispatch(setHasActiveFilters());
  }, [selectedMotorcyclist, selectedCreatedAt, selectedIdVehicles, dispatch]);

  const typeBodyTemplate = (product: { movements: "in" | "out" }) => {
    return (
      <Badge
        value={
          <div className="flex items-center gap-1">
            {product.movements === "in" ? (
              <i className="pi pi-arrow-circle-down"></i>
            ) : (
              <i className="pi pi-arrow-circle-up"></i>
            )}
            {product.movements === "in" ? "Entrada" : "Salida"}
          </div>
        }
        severity={product.movements === "in" ? "success" : "warning"}
        className="flex items-center gap-1 w-fit"
      ></Badge>
    );
  };

  const vehicleBodyTemplate = (rowData: {
    vehicle: { brand: string; model: string };
  }) => {
    return `${rowData.vehicle.brand} ${rowData.vehicle.model}`;
  };

  const datetimeBodyTemplate = (rowData: { created_at: string }) => {
    const date = new Date(rowData.created_at);
    return date.toLocaleDateString();
  };

  const timeBodyTemplate = (rowData: { created_at: string }) => {
    const date = new Date(rowData.created_at);
    return date.toLocaleTimeString();
  };

  const mileageBodyTemplate = (rowData: { mileage: number }) => {
    return `${rowData.mileage.toLocaleString()} km`;
  };

  const Title = (
    <div className="flex items-center gap-2">
      <i className="pi pi-filter"></i>
      Filtros
    </div>
  );

  return (
    <div className="space-y-6">
      <Card title={Title}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2 flex flex-col">
            <label htmlFor="filterFecha">Fecha</label>
            <InputText
              id="filterFecha"
              type="date"
              value={selectedCreatedAt ? selectedCreatedAt.split("T")[0] : ""}
              onChange={(e) =>
                dispatch(
                  setSelectedCreatedAt(e.target.value ? e.target.value : null),
                )
              }
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="filterVehicle">Vehículo</label>
            <DropdownVehicle
              list={vehiclesList || []}
              onSelect={(value) => dispatch(setSelectedIdVehicles(value))}
              selectedCountry={selectedvehicle}
              setSelectedCountry={(value) =>
                dispatch(setSelectedVehicle(value))
              }
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="filterMotorcyclist">Motorista</label>
            <InputText
              id="filterMotorcyclist"
              placeholder="Buscar por nombre..."
              max={100}
              value={selectedMotorcyclist}
              onChange={(e) =>
                dispatch(setSelectedMotorcyclist(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Button
              label="Buscar"
              onClick={handleSearch}
              disabled={hasActiveFilters}
            />
          </div>
          <div className="flex items-end">
            {!hasActiveFilters && (
              <button
                onClick={() => clearFilters()}
                className="text-sm text-primary hover:underline cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </Card>

      <Card title="Historial de Entradas y Salidas">
        {loading ? (
          <EntryListSkeleton />
        ) : movements?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No se encontraron registros
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable value={movements || []}>
              <Column header="Tipo" body={typeBodyTemplate}></Column>
              <Column header="Vehículo" body={vehicleBodyTemplate}></Column>
              <Column field="vehicle.plate" header="Placa"></Column>
              <Column field="motorcyclist" header="Motorista"></Column>
              <Column header="Fecha" body={datetimeBodyTemplate}></Column>
              <Column header="Hora" body={timeBodyTemplate}></Column>
              <Column
                header="Kilometraje"
                body={mileageBodyTemplate}
                className="text-right"
              ></Column>
            </DataTable>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EntryList;
