"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems = [
  { href: "/", label: "Inicio", icon: "pi pi-objects-column" },
  { href: "/vehiculos", label: "Vehículos", icon: "pi pi-truck" },
  {
    href: "/registrar",
    label: "Registrar E/S",
    icon: "pi pi-arrow-right-arrow-left",
  },
  { href: "/historial", label: "Historial", icon: "pi pi-clipboard" },
];

const Footer = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <i
              className="pi pi-truck"
              style={{ color: "green", fontSize: "1.5rem" }}
            ></i>
            <span className="text-xl font-semibold">Control de Flota</span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }
                  `}
                >
                  <i className={Icon}></i>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
