"use client";
import { useEffect, useRef } from "react";
import VehicleCard from "@/src/components/vehicle/card/vehicle-card";
import { VehicleForm } from "@/src/components/vehicle/form/vehicle-form";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";
import { getBrandList } from "@/src/lib/features/core/brand/thunks/brand-list.thunk";
import { getModelList } from "@/src/lib/features/core/model/thunks/model-list.thunk";
import { setFormOpen } from "@/src/lib/features/core/vehicule/slice/vehicle-create.slice";
import { setIsEditing } from "@/src/lib/features/core/vehicule/slice/vehicle-update.slice";

export default function VehiculosPage() {
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null) as React.RefObject<Toast>;

  const { vehiclesList, loading } = useAppSelector(
    (state) => state.vehicleList,
  );

  const handleCreateVehicle = async () => {
    await dispatch(setIsEditing(false));
    await dispatch(setFormOpen(true));
  };

  useEffect(() => {
    dispatch(getVehicleList());
    dispatch(getBrandList());
    dispatch(getModelList());
  }, [dispatch]);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Vehículos</h1>
            <p className=" mt-1">Gestiona los vehículos de tu flota</p>
          </div>
          <Button
            label="Nuevo Vehículo"
            icon="pi pi-plus"
            onClick={() => handleCreateVehicle()}
          />
        </div>

        {loading ? (
          <div className="text-center py-12 ">Cargando...</div>
        ) : vehiclesList === null ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
              <i className="pi pi-truck" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <h3 className="text-lg font-medium mb-2">
              No hay vehículos registrados
            </h3>
            <p className=" mb-4">Comienza agregando tu primer vehículo</p>
            <Button
              label="Agregar Vehículo"
              icon="pi pi-plus"
              onClick={() => handleCreateVehicle()}
            />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehiclesList.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} toast={toast} />
            ))}
          </div>
        )}

        <VehicleForm />
      </div>
    </>
  );
}
