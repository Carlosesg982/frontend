import DropdownVehicle from "@/src/components/register/dropdown-vehicle";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  setMotorcyclist,
  setIdVehicles,
  setCreatedAt,
} from "@/src/lib/features/core/movement/slice/movement-list.slice";
import { postMovementList } from "@/src/lib/features/core/movement/thunks/movement-list.thunk";
import { Button } from "primereact/button";

const EntryList = () => {
  const dispatch = useAppDispatch();
  const { vehiclesList } = useAppSelector((state) => state.vehicleList);
  const { movements, loading, motorcyclist, id_vehicles, created_at } =
    useAppSelector((state) => state.movementList);

  const clearFilters = async () => {
    await dispatch(setCreatedAt(null));
    await dispatch(setIdVehicles(0));
    await dispatch(setMotorcyclist(""));
  };

  const hasActiveFilters =
    created_at === null && id_vehicles === 0 && motorcyclist === "";

  console.log(id_vehicles);
  const handleSearch = () => {
    dispatch(postMovementList());
    clearFilters();
  };

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
              value={created_at ? created_at.split("T")[0] : ""}
              onChange={(e) =>
                dispatch(setCreatedAt(e.target.value ? e.target.value : null))
              }
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="filterVehicle">Vehículo</label>
            <DropdownVehicle
              list={vehiclesList || []}
              onSelect={(value) => dispatch(setIdVehicles(value))}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="filterMotorcyclist">Motorista</label>
            <InputText
              id="filterMotorcyclist"
              placeholder="Buscar por nombre..."
              max={100}
              value={motorcyclist}
              onChange={(e) => dispatch(setMotorcyclist(e.target.value))}
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
          <div className="text-center py-8 text-muted-foreground">
            Cargando...
          </div>
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
