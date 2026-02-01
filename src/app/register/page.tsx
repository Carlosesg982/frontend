"use client";
import { useEffect } from "react";
import EntryForm from "@/src/components/register/entry-form";
import { useAppDispatch } from "@/src/lib/hooks";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";

const Register = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVehicleList());
  }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Registrar Movimiento</h1>
        <p className="mt-1">Registra la entrada o salida de un vehículo</p>
      </div>
      <EntryForm />
    </div>
  );
};

export default Register;
