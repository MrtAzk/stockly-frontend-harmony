
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { AlertCircle, CheckCircle, Link, Plus, RefreshCw, Settings as SettingsIcon, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Entegrasyon durumları
const platforms = [
  {
    id: "shopify",
    name: "Shopify",
    icon: ShoppingBag,
    status: "connected",
    lastSync: "2023-06-10T14:30:00",
    products: 156,
    orders: 45,
    color: "#7AB55C",
  },
  {
    id: "trendyol",
    name: "Trendyol",
    icon: TrendingUp,
    status: "connected",
    lastSync: "2023-06-10T12:15:00",
    products: 124,
    orders: 32,
    color: "#FF6633",
  },
  {
    id: "n11",
    name: "N11",
    icon: ShoppingBag,
    status: "disconnected",
    lastSync: null,
    products: 0,
    orders: 0,
    color: "#7C00FF",
  },
  {
    id: "hepsiburada",
    name: "Hepsiburada",
    icon: ShoppingBag,
    status: "error",
    lastSync: "2023-06-05T09:15:00",
    products: 98,
    orders: 0,
    color: "#FF6600",
  },
];

const Integrations = () => {
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const { toast } = useToast();

  // Durum renkleri
  const getStatusClass = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-success/10 text-success";
      case "disconnected":
        return "bg-gray-100 text-gray-600";
      case "error":
        return "bg-error/10 text-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Platformu bağlama
  const handleConnect = (platform: any) => {
    setSelectedPlatform(platform);
    setIsConnectDialogOpen(true);
  };

  // Bağlantı formu gönderimi
  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Platform Bağlandı",
      description: `${selectedPlatform?.name} platformu başarıyla bağlandı.`,
    });
    setIsConnectDialogOpen(false);
  };

  // Senkronizasyon başlatma
  const handleSync = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    if (platform) {
      toast({
        title: "Senkronizasyon Başlatıldı",
        description: `${platform.name} platformu için senkronizasyon başlatıldı.`,
      });
    }
  };

  // Tarihi formatlama
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Hiç";
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="container p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Entegrasyonlar</h1>
              <p className="text-gray-500 mt-1">
                E-ticaret platformlarıyla entegrasyonları yönetin.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Yeni Entegrasyon
              </Button>
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <div key={platform.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      <platform.icon
                        className="w-5 h-5"
                        style={{ color: platform.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {platform.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusClass(
                          platform.status
                        )}`}
                      >
                        {platform.status === "connected"
                          ? "Bağlı"
                          : platform.status === "disconnected"
                          ? "Bağlı Değil"
                          : "Hata"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Son Senkronizasyon:</span>
                      <span className="font-medium">{formatDate(platform.lastSync)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Ürünler:</span>
                      <span className="font-medium">{platform.products}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Siparişler:</span>
                      <span className="font-medium">{platform.orders}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {platform.status === "connected" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={() => handleSync(platform.id)}
                        >
                          <RefreshCw className="w-4 h-4" />
                          Senkronize Et
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="flex-1 gap-1"
                        onClick={() => handleConnect(platform)}
                      >
                        <Link className="w-4 h-4" />
                        {platform.status === "disconnected" ? "Bağlan" : "Yeniden Bağlan"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Entegrasyon Bilgileri */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Entegrasyon Yardımı</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Bağlı Platformlar</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Bağlı platformlardan otomatik olarak ürün, stok ve sipariş bilgileri alınır.
                      Stok güncellemeleri otomatik olarak senkronize edilir.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <AlertCircle className="h-5 w-5 text-warning" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Hata Durumları</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Eğer bir platformda hata varsa, API anahtarlarını kontrol edin ve yeniden
                      bağlanmayı deneyin. Sorun devam ederse, platform ayarlarından
                      API izinlerini kontrol edin.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Link className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Yeni Platform Bağlama</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Yeni bir platform bağlamak için, ilgili platformdan API anahtarlarına
                      ihtiyacınız olacak. Platformun geliştirici sayfasından bu bilgileri edinebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Platform Bağlantı Modal */}
      <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPlatform?.name} Platformuna Bağlan
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {selectedPlatform && (
              <form onSubmit={handleConnectSubmit} className="space-y-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    {selectedPlatform.name} platformuna bağlanmak için aşağıdaki bilgileri girin.
                    API anahtarlarını platformun geliştirici sayfasından edinebilirsiniz.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Anahtarı
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="API anahtarınızı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Gizli Anahtarı
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="API gizli anahtarınızı girin"
                  />
                </div>

                {selectedPlatform.id === "shopify" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mağaza URL
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="örn: magaza.myshopify.com"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsConnectDialogOpen(false)}
                  >
                    İptal
                  </Button>
                  <Button type="submit">Bağlan</Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Integrations;
