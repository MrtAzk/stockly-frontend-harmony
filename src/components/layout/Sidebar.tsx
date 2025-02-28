
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
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-sidebar-background border-r border-gray-200 pt-16 shadow-sm">
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100/60"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mb-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
          <h4 className="text-sm font-medium text-primary mb-2">Stok Yönetimi Pro</h4>
          <p className="text-xs text-gray-600 mb-3">Daha fazla özellik için Pro sürüme yükseltin.</p>
          <button className="w-full bg-primary text-white text-xs py-1.5 px-3 rounded-md hover:bg-primary/90 transition-colors">
            Yükselt
          </button>
        </div>
      </div>
    </aside>
  );
};
