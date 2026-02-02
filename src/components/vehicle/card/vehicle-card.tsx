import { RefObject } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { VehicleList } from "@/src/lib/features/core/vehicule/types/vehicle-list.type";
import { Badge } from "primereact/badge";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setIdVehicule } from "@/src/lib/features/core/vehicule/slice/vehicle-delete.slice";
import { deleteVehicleDelete } from "@/src/lib/features/core/vehicule/thunks/vehicle-delete.thunk";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";
import {
  setIsEditing,
  setId,
} from "@/src/lib/features/core/vehicule/slice/vehicle-update.slice";
import {
  setIdBrand,
  setIdModel,
  setPlate,
  setFormOpen,
} from "@/src/lib/features/core/vehicule/slice/vehicle-create.slice";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

type VehicleCardProps = {
  vehicle: VehicleList;
  toast: RefObject<Toast>;
};

const VehicleCard = ({ vehicle, toast }: VehicleCardProps) => {
  const dispatch = useAppDispatch();
  const { brandList } = useAppSelector((state) => state.brandList);
  const { modelList } = useAppSelector((state) => state.modelList);

  const accept = () => {
    handleDelete();
    toast.current?.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Se ha eliminado el vehículo",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rechazado",
      detail: "No se ha eliminado el vehículo",
      life: 3000,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "¿Quieres eliminar este vehículo?",
      header: "Eliminación de registro",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  const handleUpdateVehicle = async () => {
    await dispatch(setIsEditing(true));
    await dispatch(setId(vehicle.id));
    await dispatch(
      setIdBrand(brandList?.find((b) => b.name === vehicle.brand)?.id || 0),
    );
    await dispatch(
      setIdModel(modelList?.find((m) => m.name === vehicle.model)?.id || 0),
    );
    await dispatch(setPlate(vehicle.plate));
    await dispatch(setFormOpen(true));
  };

  const handleDelete = async () => {
    await dispatch(setIdVehicule(vehicle.id));
    await dispatch(deleteVehicleDelete());
    await dispatch(getVehicleList());
  };

  const Header = (
    <div className="flex items-center justify-between w-full p-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
          <i
            className="pi pi-truck"
            style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
          ></i>
        </div>
        <h3 className="font-semibold text-3xl whitespace-nowrap">
          {vehicle.brand}
        </h3>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          icon="pi pi-pencil"
          className="h-8 w-8"
          severity="success"
          onClick={() => handleUpdateVehicle()}
        />
        <Button
          icon="pi pi-trash"
          className="h-8 w-8"
          severity="danger"
          onClick={confirm2}
        />
      </div>
    </div>
  );

  const title = `Modelo: ${vehicle.model}`;
  const subtitle = (
    <div className="inline-flex items-center px-3 py-1 gap-2">
      <span>Placa: </span>
      <Badge value={vehicle.plate} severity="secondary"></Badge>
    </div>
  );

  return (
    <div className="card">
      <Card
        header={Header}
        title={title}
        subTitle={subtitle}
        className="group hover:shadow-md transition-shadow"
      ></Card>
    </div>
  );
};

export default VehicleCard;
