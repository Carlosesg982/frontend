"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/lib/hooks";
import { getVehicleList } from "@/src/lib/features/core/vehicule/thunks/vehicle-list.thunk";
import { postMovementList } from "@/src/lib/features/core/movement/thunks/movement-list.thunk";
import { setReset } from "@/src/lib/features/core/movement/slice/movement-list.slice";
import EntryList from "@/src/components/record/entry-list";

const Record = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setReset());
    dispatch(getVehicleList());
    dispatch(postMovementList());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Historial</h1>
        <p className=" mt-1">
          Consulta y filtra los registros de entradas y salidas
        </p>
      </div>
      <EntryList />
    </div>
  );
};

export default Record;
