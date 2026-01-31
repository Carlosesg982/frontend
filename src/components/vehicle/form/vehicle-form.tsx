import React from "react";

import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import type { Vehicle } from "@/src/lib/types";
import DropdownList from "@/src/components/dropdown-list";
import {
  setIdBrand,
  setIdModel,
  setPlate,
} from "@/src/lib/features/core/vehicule/slice/vehicle-create.slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { postVehicleCreate } from "@/src/lib/features/core/vehicule/thunks/vehicle-create.thunk";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";

interface VehicleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle | null;
  isEditing: boolean;
}

export function VehicleForm({
  open,
  onOpenChange,
  vehicle,
  isEditing,
}: VehicleFormProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const Header = isEditing ? "Editar Vehículo" : "Nuevo Vehículo";
  const { brandList } = useAppSelector((state) => state.brandList);
  const { modelList } = useAppSelector((state) => state.modelList);
  const { id_brand, id_model, plate } = useAppSelector(
    (state) => state.vehicleCreate,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("se disparo el formulario");
    try {
      await dispatch(postVehicleCreate({ id_brand, id_model, plate }));
      console.log("se creo el vehiculo");
      dispatch(setIdBrand(0));
      dispatch(setIdModel(0));
      dispatch(setPlate(""));
      onOpenChange(false);
    } finally {
      setLoading(false);
      dispatch(getVehicleList());
    }
  };

  return (
    <Dialog
      visible={open}
      header={Header}
      onHide={() => {
        if (!open) return;
        onOpenChange(false);
      }}
      style={{ width: "40vw" }}
    >
      <p className="text-gray-600 mb-4">
        {isEditing
          ? "Modifica los datos del vehículo."
          : "Ingresa los datos del nuevo vehículo."}
      </p>

      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col gap-2">
            <label htmlFor="marca">Marca</label>
            <DropdownList
              list={brandList || []}
              onSelect={(value) => dispatch(setIdBrand(Number(value)))}
            />
          </div>
          <div className="space-y-2 flex flex-col gap-2">
            <label htmlFor="modelo">Modelo</label>
            <DropdownList
              list={modelList || []}
              onSelect={(value) => dispatch(setIdModel(Number(value)))}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="placa">Placa</label>
            <InputText
              id="placa"
              className="p-inputtext-sm"
              placeholder="ABC-123"
              value={plate}
              onChange={(e) => dispatch(setPlate(e.target.value.toUpperCase()))}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              label="Cancelar"
              onClick={() => onOpenChange(false)}
            />
            <Button
              type="submit"
              disabled={loading}
              label={
                loading
                  ? "Guardando..."
                  : isEditing
                    ? "Actualizar"
                    : "Registrar"
              }
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}
