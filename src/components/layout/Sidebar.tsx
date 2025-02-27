
import { BarChart3, Box, Database, Home, Link2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Gösterge Paneli", href: "/" },
  { icon: Box, label: "Ürünler", href: "/products" },
  { icon: Database, label: "Stok Yönetimi", href: "/inventory" },
  { icon: BarChart3, label: "Raporlar", href: "/reports" },
  { icon: Link2, label: "Entegrasyonlar", href: "/integrations" },
  { icon: Settings, label: "Ayarlar", href: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 pt-16">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
