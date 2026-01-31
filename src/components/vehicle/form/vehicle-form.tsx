import React from "react";

import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import type { Vehicle } from "@/src/lib/types";
import DropdownList from "@/src/components/dropdown-list";

interface VehicleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle | null;
  onSubmit: (data: {
    marca: string;
    modelo: string;
    placa: string;
  }) => Promise<void>;
}

export function VehicleForm({
  open,
  onOpenChange,
  vehicle,
  onSubmit,
}: VehicleFormProps) {
  const [marca, setMarca] = useState(vehicle?.marca || "");
  const [modelo, setModelo] = useState(vehicle?.modelo || "");
  const [placa, setPlaca] = useState(vehicle?.placa || "");
  const [loading, setLoading] = useState(false);

  const Header = vehicle ? "Editar Vehículo" : "Nuevo Vehículo";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ marca, modelo, placa });
      setMarca("");
      setModelo("");
      setPlaca("");
      onOpenChange(false);
    } finally {
      setLoading(false);
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
        {vehicle
          ? "Modifica los datos del vehículo."
          : "Ingresa los datos del nuevo vehículo."}
      </p>

      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col gap-2">
            <label htmlFor="marca">Marca</label>
            <DropdownList
              list={[
                { id: 1, name: "Toyota" },
                { id: 2, name: "Honda" },
                { id: 3, name: "Ford" },
              ]}
              onSelect={(value) => setMarca(value)}
            />
          </div>
          <div className="space-y-2 flex flex-col gap-2">
            <label htmlFor="modelo">Modelo</label>
            <InputText
              id="modelo"
              placeholder="Corolla, Civic, F-150..."
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="placa">Placa</label>
            <InputText
              id="placa"
              className="p-inputtext-sm"
              placeholder="ABC-123"
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : vehicle ? "Actualizar" : "Registrar"}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
