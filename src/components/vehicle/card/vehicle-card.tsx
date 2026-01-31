import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { VehicleList } from "@/src/lib/features/core/vehicule/types/vehicule-list.type";
import { Badge } from "primereact/badge";
import { useAppDispatch } from "@/src/lib/hooks";
import { setIdVehicule } from "@/src/lib/features/core/vehicule/slice/vehicule-delete.slice";
import { deleteVehicleDelete } from "@/src/lib/features/core/vehicule/thunks/vehicule-delete.thunk";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";

type VehicleCardProps = {
  vehicle: VehicleList;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(setIdVehicule(vehicle.id));
    await dispatch(deleteVehicleDelete());
    await dispatch(getVehicleList());
  };

  const Header = (
    <div className="flex gap-2">
      <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-2 ml-6 mt-6">
        <i
          className="pi pi-truck"
          style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
        ></i>
      </div>
      <h3 className="font-semibold text-3xl p-3 mt-6 ml-6">{vehicle.brand}</h3>
      <div className="flex items-start justify-between mt-6 ml-6">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button icon="pi pi-pencil" className="h-8 w-8" severity="success" />
          <Button
            icon="pi pi-trash"
            className="h-8 w-8"
            severity="danger"
            onClick={() => handleDelete()}
          />
        </div>
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
        className="group hover:shadow-md transition-shadow h-50"
      ></Card>
    </div>
  );
};

export default VehicleCard;
