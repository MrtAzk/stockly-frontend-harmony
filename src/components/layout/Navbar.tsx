
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [platform, setPlatform] = useState("all");

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold">Stok Yönetimi</h1>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ürün, SKU veya sipariş ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span>{platform === "all" ? "Tüm Platformlar" : platform}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium text-sm">AS</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

