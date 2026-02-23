import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const EntryListSkeleton = () => {
  const items = Array.from({ length: 5 }, (v, i) => ({ id: i }));

  return (
    <div className="overflow-x-auto">
      <DataTable
        value={items}
        className="w-full"
        tableStyle={{ width: "100%", minWidth: "60rem" }}
      >
        <Column header="Tipo" body={() => <Skeleton width="80%" />}></Column>
        <Column
          header="Vehículo"
          body={() => <Skeleton width="100%" />}
        ></Column>
        <Column header="Placa" body={() => <Skeleton width="100%" />}></Column>
        <Column
          header="Motorista"
          body={() => <Skeleton width="100%" />}
        ></Column>
        <Column header="Fecha" body={() => <Skeleton width="100%" />}></Column>
        <Column header="Hora" body={() => <Skeleton width="100%" />}></Column>
        <Column
          header="Kilometraje"
          body={() => <Skeleton width="100%" />}
        ></Column>
      </DataTable>
    </div>
  );
};

export default EntryListSkeleton;
