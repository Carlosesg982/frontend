"use client";

import { useState, useEffect } from "react";
import VehicleCard from "@/src/components/vehicle/card/vehicle-card";
import { VehicleForm } from "@/src/components/vehicle/form/vehicle-form";
import { Button } from "primereact/button";
import type { Vehicle } from "@/src/lib/types";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";
import { getBrandList } from "@/src/lib/features/core/brand/thunks/brand-list.thunk";

export default function VehiculosPage() {
  const dispatch = useAppDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const { vehiclesList, loading } = useAppSelector(
    (state) => state.vehicleList,
  );

  // const fetchVehicles = async () => {
  //   const { data } = await supabase
  //     .from("vehicles")
  //     .select("*")
  //     .order("created_at", { ascending: false });
  //   if (data) setVehicles(data);
  //   setLoading(false);
  // };

  const handleSubmit = async (data: {
    marca: string;
    modelo: string;
    placa: string;
  }) => {
    // const supabase = createClient();

    // if (editingVehicle) {
    //   await supabase.from("vehicles").update(data).eq("id", editingVehicle.id);
    // } else {
    //   await supabase.from("vehicles").insert(data);
    // }

    setEditingVehicle(null);
    // fetchVehicles();
  };

  // const handleEdit = (vehicle: Vehicle) => {
  //   setEditingVehicle(vehicle);
  //   setFormOpen(true);
  // };

  // const handleDelete = async () => {
  //   if (!deleteId) return;
  //   const supabase = createClient();
  //   await supabase.from("vehicles").delete().eq("id", deleteId);
  //   setDeleteId(null);
  //   fetchVehicles();
  // };

  // const openNewForm = () => {
  //   setEditingVehicle(null);
  //   setFormOpen(true);
  // };

  // useEffect(() => {
  //   fetchVehicles();
  // }, []);

  useEffect(() => {
    dispatch(getVehicleList());
    dispatch(getBrandList());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vehículos</h1>
          <p className=" mt-1">Gestiona los vehículos de tu flota</p>
        </div>
        <Button
          label="Nuevo Vehículo"
          icon="pi pi-plus"
          onClick={() => setFormOpen(true)}
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
            onClick={() => setFormOpen(true)}
          />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} />
          ))}
        </div>
      )}

      <VehicleForm
        open={formOpen}
        onOpenChange={setFormOpen}
        vehicle={editingVehicle}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
