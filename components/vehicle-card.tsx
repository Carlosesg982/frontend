import { Card } from "primereact/card";
import { Button } from "primereact/button";

const VehicleCard = () => {
  const Header = (
    <div className="p-2 bg-primary/10 rounded-lg">
      <i
        className="pi pi-truck"
        style={{ color: "green", fontSize: "1.5rem" }}
      ></i>
    </div>
  );
  return (
    <Card
      header={Header}
      title="marca"
      subTitle="modelo"
      className="group hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button icon="pi pi-pencil" className="h-8 w-8" />
          <Button
            icon="pi pi-trash"
            className="h-8 w-8 text-destructive hover:text-destructive"
          />
        </div>
      </div>
      <div className="inline-flex items-center px-3 py-1 bg-secondary rounded-full">
        <span className="text-sm font-mono font-medium text-secondary-foreground">
          placa
        </span>
      </div>
    </Card>
  );
};

export default VehicleCard;
