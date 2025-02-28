
import { Search, Bell, Sun, Moon, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Sabit veriler
  const user = {
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    avatar: "/placeholder.svg",
  };
  
  const notifications = [
    { id: 1, title: "Yeni Sipariş", description: "ORD-4231 siparişi alındı", time: "10 dk önce" },
    { id: 2, title: "Stok Uyarısı", description: "Akıllı Telefon XS kritik stok seviyesinde", time: "2 saat önce" },
    { id: 3, title: "Entegrasyon", description: "Shopify senkronizasyonu tamamlandı", time: "3 saat önce" },
  ];
  
  const platforms = [
    { id: "all", name: "Tüm Platformlar" },
    { id: "shopify", name: "Shopify" },
    { id: "trendyol", name: "Trendyol" },
  ];
  
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);

  // Karanlık mod değişikliği
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Burada tema değişimi için gerekli işlevler eklenebilir
  };

  return (
    <header className="fixed w-full top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-40 px-4 lg:px-6">
      <div className="flex h-full items-center justify-between">
        {/* Logo ve Platform Seçici */}
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-primary text-lg flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span>StokYönetim</span>
          </Link>
          
          {/* Platform Seçici Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                {selectedPlatform.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Platform Seçin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {platforms.map((platform) => (
                <DropdownMenuItem 
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform)}
                  className={selectedPlatform.id === platform.id ? "bg-primary/10" : ""}
                >
                  {platform.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Arama, Bildirimler ve Profil */}
        <div className="flex items-center gap-3">
          {/* Arama */}
          <div className={`${searchOpen ? "w-64 md:w-72" : "w-0 md:w-64"} transition-all duration-200 overflow-hidden`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Ürün, sipariş veya SKU ara..." 
                className="pl-9 h-9 md:h-10 bg-gray-50 border-gray-200 focus:bg-white" 
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Tema Değiştirici */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="text-gray-600 hover:text-gray-900"
          >
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          {/* Bildirimler */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="py-3 px-4 focus:bg-gray-50 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{notification.title}</span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <span className="text-xs text-gray-600">{notification.description}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Link to="/notifications" className="block p-2 text-center text-sm text-primary hover:underline">
                Tüm Bildirimleri Gör
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Kullanıcı Menüsü */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="flex items-center w-full">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex items-center w-full">Ayarlar</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50">
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobil Menü Buton */}
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-30 p-4 animate-fade-in">
          <div className="space-y-4">
            <div className="mb-6">
              <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Ana Menü</p>
              <nav className="space-y-1">
                {[...primaryMenuItems, ...secondaryMenuItems].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                    >
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Platform</p>
              <div className="space-y-1">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="ghost"
                    className={`w-full justify-start text-gray-700 ${
                      selectedPlatform.id === platform.id ? "bg-primary/10" : ""
                    }`}
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              
              <div className="mt-4 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  <Link to="/profile" className="flex items-center w-full">Profil</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700">
                  <Link to="/settings" className="flex items-center w-full">Ayarlar</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600">
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
