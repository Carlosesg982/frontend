"use client";
import Link from "next/link";
import { Button } from "primereact/button";

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer className={`bg-sidebar`}>
      <div className="relative mx-auto px-2 py-8 sm:px-6 lg:px-4">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <Link className="inline-block" onClick={handleClick} href="#">
            <Button
              icon="pi pi-angle-up"
              rounded
              severity="secondary"
              aria-label="Bookmark"
            />
          </Link>
        </div>
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-sidebar-foreground items-center lg:justify-start gap-2">
              <i
                className="pi pi-truck"
                style={{ color: "green", fontSize: "1.5rem" }}
              ></i>
              <span className="text-xl font-semibold">Control de Flota</span>
            </div>
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400 lg:text-left ">
              Control de Flota: Haz Registro de Vehículos, Entradas y Salidas,
              Consulta Historial.
            </p>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                className="text-gray-400 transition hover:text-sidebar-accent-foreground"
                href="/"
              >
                Acerca de nosotros
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-400 transition hover:text-sidebar-accent-foreground"
                href="/"
              >
                Redes Sociales
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-400 transition hover:text-sidebar-accent-foreground"
                href="/"
              >
                Contactanos
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-12 text-center text-sm text-gray-400 lg:text-right dark:text-gray-400">
          &copy; {new Date().getFullYear()} Carlos Sosa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
