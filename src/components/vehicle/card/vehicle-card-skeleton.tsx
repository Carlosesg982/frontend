import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const VehicleCardSkeleton = () => {
  const Header = (
    <div className="flex items-center justify-between w-full p-4 group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
          <i
            className="pi pi-truck"
            style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
          ></i>
        </div>
        <Skeleton width="10rem" height="1.5rem" className="mb-2"></Skeleton>
      </div>

      <div className="flex gap-2 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <Button
          icon="pi pi-pencil"
          className="h-10 w-10 p-button-rounded p-button-success"
        />
        <Button
          icon="pi pi-trash"
          className="h-10 w-10 p-button-rounded p-button-danger"
        />
      </div>
    </div>
  );

  const title = `Modelo: `;
  const subtitle = (
    <div className="inline-flex items-center justify-center px-3 py-1 gap-2">
      <span>Placa: </span>
      <Skeleton width="5rem" height="1.5rem"></Skeleton>
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

export default VehicleCardSkeleton;
