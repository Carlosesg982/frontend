import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Link from "next/link";

export default function Home() {
  const header1 = (
    <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-2 ml-6 mt-6">
      <i
        className="pi pi-truck"
        style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
      ></i>
    </div>
  );

  const header2 = (
    <div className="p-3 bg-green-500/10 rounded-lg w-fit mb-2 ml-6 mt-6">
      <i
        className="pi pi-arrow-right-arrow-left"
        style={{ color: "green", fontSize: "1.5rem" }}
      ></i>
    </div>
  );

  const header3 = (
    <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-2 ml-6 mt-6">
      <i
        className="pi pi-clipboard"
        style={{ color: "black", fontSize: "1.5rem" }}
      ></i>
    </div>
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-balance">
          Sistema de Control de Flota
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-pretty">
          Gestiona tus vehículos, registra entradas y salidas, y mantén un
          historial completo de movimientos.
        </p>
      </div>

      <div className="group grid md:grid-cols-3 gap-6">
        <Card
          header={header1}
          title="Gestión de Vehículos"
          subTitle="Registra, edita y elimina vehículos de tu flota."
          className="group hover:shadow-lg transition-shadow"
        >
          <Link href="/vehicles">
            <Button
              label="Ver Vehículos"
              icon="pi pi-arrow-right"
              className="w-full"
              iconPos="right"
            />
          </Link>
        </Card>

        <Card
          header={header2}
          title="Registrar Movimiento"
          subTitle="Registra entradas y salidas de vehículos"
          className="group hover:shadow-lg transition-shadow"
        >
          <Link href="/register">
            <Button
              label="Nuevo Registro"
              icon="pi pi-arrow-right"
              className="w-full"
              iconPos="right"
              severity="success"
              outlined
            />
          </Link>
        </Card>

        <Card
          header={header3}
          title="Historial"
          subTitle="Consulta el historial de movimientos"
          className="group hover:shadow-lg transition-shadow"
        >
          <Link href="/record">
            <Button
              label="Ver Historial"
              icon="pi pi-arrow-right"
              className="w-full"
              iconPos="right"
              severity="secondary"
              raised
            />
          </Link>
        </Card>
      </div>
    </div>
  );
}
