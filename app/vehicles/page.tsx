"use client";

import { useState, useEffect, useRef } from "react";
import VehicleCard from "@/components/vehicle-card";
import { VehicleForm } from "@/components/vehicle-form";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import type { Vehicle } from "@/lib/types";

export default function VehiculosPage() {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

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

  const accept = () => {
    toast.current?.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message:
        "Esta acción no se puede deshacer. Se eliminará permanentemente el vehículo del sistema.",
      header: "Confirmar Eliminación",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  // useEffect(() => {
  //   fetchVehicles();
  // }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehículos</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los vehículos de tu flota
          </p>
        </div>
        <Button>
          <i
            className="pi pi-plus"
            style={{ color: "green", fontSize: "1.5rem" }}
          ></i>
          Nuevo Vehículo
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Cargando...
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
            <i
              className="pi pi-truck"
              style={{ color: "green", fontSize: "1.5rem" }}
            ></i>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No hay vehículos registrados
          </h3>
          <p className="text-muted-foreground mb-4">
            Comienza agregando tu primer vehículo
          </p>
          <Button>
            <i
              className="pi pi-plus"
              style={{ color: "green", fontSize: "1.5rem" }}
            ></i>
            Agregar Vehículo
          </Button>
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

      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card flex flex-wrap gap-2 justify-content-center">
        <Button
          onClick={confirm1}
          icon="pi pi-check"
          label="Confirm"
          className="mr-2"
        ></Button>
        <Button
          onClick={confirm2}
          icon="pi pi-times"
          label="Eliminar Vehículo"
        ></Button>
      </div>
    </div>
  );
}
