import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import DropdownList from "@/src/components/dropdown-list";
import {
  setIdBrand,
  setIdModel,
  setPlate,
  setFormOpen,
  setSelectedBrand,
  setSelectedModel,
} from "@/src/lib/features/core/vehicule/slice/vehicle-create.slice";
import { setId } from "@/src/lib/features/core/vehicule/slice/vehicle-update.slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { postVehicleCreate } from "@/src/lib/features/core/vehicule/thunks/vehicle-create.thunk";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";
import { putVehicleUpdate } from "@/src/lib/features/core/vehicule/thunks/vehicle-update.thunk";

export function VehicleForm() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { brandList } = useAppSelector((state) => state.brandList);
  const { modelList } = useAppSelector((state) => state.modelList);
  const { plate, formOpen, selectedBrand, selectedModel } = useAppSelector(
    (state) => state.vehicleCreate,
  );
  const { isEditing } = useAppSelector((state) => state.vehicleUpdate);

  const Header = isEditing ? "Editar Vehículo" : "Nuevo Vehículo";

  const handleReset = () => {
    dispatch(setId(0));
    dispatch(setIdBrand(0));
    dispatch(setIdModel(0));
    dispatch(setPlate(""));
    dispatch(setSelectedBrand(null));
    dispatch(setSelectedModel(null));
    dispatch(setFormOpen(false));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await dispatch(putVehicleUpdate());
      } else {
        await dispatch(postVehicleCreate());
      }
      handleReset();
    } finally {
      setLoading(false);
      dispatch(getVehicleList());
    }
  };

  return (
    <Dialog
      visible={formOpen}
      header={Header}
      onHide={() => {
        if (!formOpen) return;
        dispatch(setFormOpen(false));
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
              onSelect={(value) => dispatch(setIdBrand(value))}
              selectedCountry={selectedBrand}
              setSelectedCountry={(value) => dispatch(setSelectedBrand(value))}
            />
          </div>
          <div className="space-y-2 flex flex-col gap-2">
            <label htmlFor="modelo">Modelo</label>
            <DropdownList
              list={modelList || []}
              onSelect={(value) => dispatch(setIdModel(value))}
              selectedCountry={selectedModel}
              setSelectedCountry={(value) => dispatch(setSelectedModel(value))}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="placa">Placa</label>
            <InputText
              id="placa"
              className="p-inputtext-sm"
              placeholder="ABC-123"
              maxLength={7}
              value={plate}
              onChange={(e) => dispatch(setPlate(e.target.value.toUpperCase()))}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              label="Cancelar"
              onClick={() => handleReset()}
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
