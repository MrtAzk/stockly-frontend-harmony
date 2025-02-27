
import { Bell, ChevronDown, Filter, Menu, Search } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [platform, setPlatform] = useState("all");

  const platforms = [
    { id: "all", name: "Tüm Platformlar" },
    { id: "shopify", name: "Shopify" },
    { id: "trendyol", name: "Trendyol" }
  ];

  const handlePlatformChange = (id: string) => {
    setPlatform(id);
  };

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Filter className="w-4 h-4" />
                <span>{platforms.find(p => p.id === platform)?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuGroup>
                {platforms.map((p) => (
                  <DropdownMenuItem 
                    key={p.id} 
                    className={`text-sm ${platform === p.id ? 'bg-gray-100' : ''}`}
                    onClick={() => handlePlatformChange(p.id)}
                  >
                    {p.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 text-center text-sm font-medium border-b">
                Bildirimler
              </div>
              <div className="py-2">
                <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Stok Uyarısı</div>
                  <div className="text-gray-500 text-xs mt-1">
                    "Akıllı Telefon XS" ürünü için stok seviyesi düşük (5 adet)
                  </div>
                  <div className="text-xs text-gray-400 mt-1">2 saat önce</div>
                </div>
                <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Fiyat Değişikliği</div>
                  <div className="text-gray-500 text-xs mt-1">
                    Trendyol'da "Kablosuz Kulaklık" ürünü için fiyat değişti
                  </div>
                  <div className="text-xs text-gray-400 mt-1">5 saat önce</div>
                </div>
                <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Yeni Sipariş</div>
                  <div className="text-gray-500 text-xs mt-1">
                    Shopify'da yeni bir sipariş oluşturuldu (#12345)
                  </div>
                  <div className="text-xs text-gray-400 mt-1">1 gün önce</div>
                </div>
              </div>
              <div className="p-2 text-center text-sm text-primary border-t cursor-pointer hover:bg-gray-50">
                Tüm Bildirimleri Görüntüle
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">AS</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-sm">Profilim</DropdownMenuItem>
                <DropdownMenuItem className="text-sm">Hesap Ayarları</DropdownMenuItem>
                <DropdownMenuItem className="text-sm">Yardım</DropdownMenuItem>
                <DropdownMenuItem className="text-sm text-red-500">Çıkış Yap</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
