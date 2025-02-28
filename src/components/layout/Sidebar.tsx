
import { BarChart3, Box, Database, Home, Link2, PackageOpen, Settings, ShoppingCart, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const primaryMenuItems = [
  { icon: Home, label: "Gösterge Paneli", href: "/" },
  { icon: Box, label: "Ürünler", href: "/products" },
  { icon: Database, label: "Stok Yönetimi", href: "/inventory" },
  { icon: ShoppingCart, label: "Siparişler", href: "/orders" },
];

const secondaryMenuItems = [
  { icon: BarChart3, label: "Raporlar", href: "/reports" },
  { icon: Link2, label: "Entegrasyonlar", href: "/integrations" },
  { icon: Users, label: "Kullanıcılar", href: "/users" },
  { icon: Settings, label: "Ayarlar", href: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  const renderMenuItem = (item: any, index: number) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;
    
    return (
      <Link
        key={index}
        to={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
          isActive
            ? "bg-primary text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100/60"
        }`}
      >
        <div className={`flex items-center justify-center w-6 h-6 ${isActive ? "text-white" : "text-gray-500 group-hover:text-primary"}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"}>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-sidebar-background border-r border-gray-200 pt-16 shadow-sm z-30">
      <div className="flex-1 px-4 py-6 flex flex-col gap-4 overflow-y-auto">
        <div className="space-y-1.5">
          {primaryMenuItems.map(renderMenuItem)}
        </div>
        
        <div className="mt-2 py-2 border-t border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 uppercase px-4 mb-2">Yönetim</h3>
          <div className="space-y-1.5">
            {secondaryMenuItems.map(renderMenuItem)}
          </div>
        </div>
      </div>
      
      <div className="p-4 mb-2">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
          <div className="flex items-center mb-3">
            <PackageOpen className="w-5 h-5 text-primary mr-2" />
            <h4 className="text-sm font-medium text-primary">Stok Yönetimi Pro</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">Gelişmiş raporlar ve otomatik stok yönetimi için Pro sürüme yükseltin.</p>
          <button className="w-full bg-primary text-white text-xs py-2 px-3 rounded-md hover:bg-primary/90 transition-colors">
            Şimdi Yükselt
          </button>
        </div>
      </div>
    </aside>
  );
};
