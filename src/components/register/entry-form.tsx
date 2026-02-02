import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import DropdownVehicle from "@/src/components/register/dropdown-vehicle";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  setMovements,
  setIdVehicles,
  setMotorcyclist,
  setMileage,
} from "@/src/lib/features/core/movement/slice/movement-create.slice";
import { InputNumber } from "primereact/inputnumber";
import { postMovementCreate } from "@/src/lib/features/core/movement/thunks/movement-create.thunk";

const EntryForm = () => {
  const dispatch = useAppDispatch();
  const { vehiclesList } = useAppSelector((state) => state.vehicleList);
  const { movements, motorcyclist, mileage } = useAppSelector(
    (state) => state.movementCreate,
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(postMovementCreate());
      dispatch(setIdVehicles(0));
      dispatch(setMotorcyclist(""));
      dispatch(setMileage(0));
      dispatch(setMovements("in"));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const Header = "Registrar Entrada / Salida";

  const Subtitle =
    "Registra el movimiento de un vehículo con los datos del motorista.";

  return (
    <Card className="max-w-2xl mx-auto" title={Header} subTitle={Subtitle}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            label="Entrada"
            outlined={movements === "in"}
            icon="pi pi-arrow-circle-down"
            className="h-20 flex flex-col gap-2"
            onClick={() => dispatch(setMovements("in"))}
          />
          <Button
            type="button"
            label="Salida"
            icon="pi pi-arrow-circle-up"
            outlined={movements === "out"}
            className="h-20 flex flex-col gap-2"
            onClick={() => dispatch(setMovements("out"))}
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label htmlFor="vehicle">Vehículo</label>
          <DropdownVehicle
            list={vehiclesList || []}
            onSelect={(value) => dispatch(setIdVehicles(value))}
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label htmlFor="motorista">Nombre del Motorista</label>
          <InputText
            id="motorista"
            placeholder="Nombre completo"
            maxLength={100}
            value={motorcyclist}
            onChange={(e) => dispatch(setMotorcyclist(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label htmlFor="kilometraje">Kilometraje</label>
          <InputNumber
            inputId="kilometraje"
            placeholder="Ej: 50000"
            max={9223372036854775807}
            maxLength={19}
            value={mileage}
            onChange={(e) => dispatch(setMileage(e.value || 0))}
            required
          />
        </div>

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-lg">
            <i className="pi pi-check-circle"></i>
            <span>Registro guardado exitosamente</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          label={loading ? "Guardando..." : "Registrar"}
        />
      </form>
    </Card>
  );
};

export default EntryForm;
