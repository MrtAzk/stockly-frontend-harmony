
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
import { Link2, Plus, RefreshCw, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Integrations = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [shopDomain, setShopDomain] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("shopify");

  // Mock entegrasyon verileri
  const platforms = [
    {
      id: "shopify",
      name: "Shopify",
      status: "active",
      connectedAt: "2023-06-01T10:00:00",
      lastSync: "2023-06-15T14:30:00",
      productCount: 245,
      domain: "your-store.myshopify.com",
      icon: "/placeholder.svg",
    },
    {
      id: "trendyol",
      name: "Trendyol",
      status: "active",
      connectedAt: "2023-06-02T11:30:00",
      lastSync: "2023-06-15T14:30:00",
      productCount: 180,
      sellerId: "12345",
      icon: "/placeholder.svg",
    }
  ];

  // Senkronizasyon geçmişi
  const syncHistory = [
    {
      id: "1",
      date: "2023-06-15T14:30:00",
      platform: "Shopify",
      operation: "stock_update",
      affectedItems: 45,
      status: "success",
      message: "Başarıyla tamamlandı",
    },
    {
      id: "2",
      date: "2023-06-15T12:15:00",
      platform: "Trendyol",
      operation: "price_update",
      affectedItems: 23,
      status: "success",
      message: "Başarıyla tamamlandı",
    },
    {
      id: "3",
      date: "2023-06-14T16:45:00",
      platform: "Shopify",
      operation: "product_fetch",
      affectedItems: 245,
      status: "error",
      message: "API bağlantı hatası",
    },
    {
      id: "4",
      date: "2023-06-14T10:30:00",
      platform: "Trendyol",
      operation: "stock_update",
      affectedItems: 180,
      status: "success",
      message: "Başarıyla tamamlandı",
    },
    {
      id: "5",
      date: "2023-06-13T14:30:00",
      platform: "Shopify",
      operation: "stock_update",
      affectedItems: 45,
      status: "warning",
      message: "Kısmi başarı, 5 ürün güncellenemedi",
    },
  ];

  // Senkronizasyon geçmişi için tablo sütunları
  const syncHistoryColumns = [
    {
      header: "Tarih",
      accessorKey: "date",
      cell: (item: any) => new Date(item.date).toLocaleString('tr-TR')
    },
    {
      header: "Platform",
      accessorKey: "platform"
    },
    {
      header: "İşlem",
      accessorKey: "operation",
      cell: (item: any) => {
        const operationText = 
          item.operation === "stock_update" ? "Stok Güncelleme" :
          item.operation === "price_update" ? "Fiyat Güncelleme" :
          item.operation === "product_fetch" ? "Ürün Çekme" :
          item.operation;
        
        return <span>{operationText}</span>;
      }
    },
    {
      header: "Etkilenen Ürün",
      accessorKey: "affectedItems",
      cell: (item: any) => `${item.affectedItems} ürün`
    },
    {
      header: "Durum",
      accessorKey: "status",
      cell: (item: any) => (
        <StatusBadge status={item.status as any} />
      )
    },
    {
      header: "Mesaj",
      accessorKey: "message"
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (item: any) => (
        <Button 
          size="sm" 
          variant="ghost"
          className="h-8 w-8 p-0"
          disabled={item.status !== "error"}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      )
    }
  ];

  // Webhook tanımları
  const webhooks = [
    {
      id: "1",
      platform: "Shopify",
      event: "order_created",
      url: "https://api.example.com/webhooks/shopify/order-created",
      status: "active"
    },
    {
      id: "2",
      platform: "Shopify",
      event: "product_updated",
      url: "https://api.example.com/webhooks/shopify/product-updated",
      status: "active"
    },
    {
      id: "3",
      platform: "Trendyol",
      event: "order_created",
      url: "https://api.example.com/webhooks/trendyol/order-created",
      status: "inactive"
    }
  ];

  // Webhook tanımları için tablo sütunları
  const webhookColumns = [
    {
      header: "Platform",
      accessorKey: "platform"
    },
    {
      header: "Olay",
      accessorKey: "event",
      cell: (item: any) => {
        const eventText = 
          item.event === "order_created" ? "Sipariş Oluşturuldu" :
          item.event === "product_updated" ? "Ürün Güncellendi" :
          item.event;
        
        return <span>{eventText}</span>;
      }
    },
    {
      header: "Webhook URL",
      accessorKey: "url",
      cell: (item: any) => (
        <span className="text-xs text-gray-600 truncate max-w-xs inline-block">{item.url}</span>
      )
    },
    {
      header: "Durum",
      accessorKey: "status",
      cell: (item: any) => (
        <StatusBadge status={item.status === "active" ? "active" : "inactive" as any} />
      )
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="Entegrasyonlar"
        description="E-ticaret platformları ile entegrasyon yönetimi"
        icon={Link2}
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Entegrasyon
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Platform Entegrasyonu</DialogTitle>
                <DialogDescription>
                  E-ticaret platformunu bağlamak için API bilgilerini girin.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Platform Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="trendyol">Trendyol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPlatform === "shopify" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="domain">Mağaza Adresi</Label>
                      <Input
                        id="domain"
                        placeholder="your-store.myshopify.com"
                        value={shopDomain}
                        onChange={(e) => setShopDomain(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="apiKey">API Anahtarı</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="apiSecret">API Gizli Anahtarı</Label>
                      <Input
                        id="apiSecret"
                        type="password"
                        value={apiSecret}
                        onChange={(e) => setApiSecret(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {selectedPlatform === "trendyol" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="apiKey">Satıcı ID</Label>
                      <Input
                        id="apiKey"
                        placeholder="123456"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="apiSecret">API Anahtarı</Label>
                      <Input
                        id="apiSecret"
                        type="password"
                        value={apiSecret}
                        onChange={(e) => setApiSecret(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
              
              <DialogFooter>
                <Button type="submit">Entegrasyonu Tamamla</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {platforms.map((platform) => (
          <Card key={platform.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={platform.icon} 
                      alt={platform.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle>{platform.name}</CardTitle>
                    <CardDescription>
                      {platform.id === "shopify" 
                        ? `Mağaza: ${platform.domain}` 
                        : `Satıcı ID: ${platform.sellerId}`
                      }
                    </CardDescription>
                  </div>
                </div>
                <StatusBadge 
                  status={platform.status === "active" ? "active" : "inactive" as any} 
                  text={platform.status === "active" ? "Bağlı" : "Bağlantı Kesildi"}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Ürün Sayısı:</div>
                <div className="font-medium">{platform.productCount}</div>
                
                <div className="text-gray-500">Bağlantı Tarihi:</div>
                <div>{new Date(platform.connectedAt).toLocaleDateString('tr-TR')}</div>
                
                <div className="text-gray-500">Son Senkronizasyon:</div>
                <div>{new Date(platform.lastSync).toLocaleString('tr-TR')}</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <Switch id={`${platform.id}-status`} defaultChecked={platform.status === "active"} />
                <Label htmlFor={`${platform.id}-status`}>Etkin</Label>
              </div>
              <div className="space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => console.log(`Senkronize et: ${platform.id}`)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Senkronize Et
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => console.log(`Ayarlar: ${platform.id}`)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Ayarlar
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="general" className="mb-6">
        <TabsList>
          <TabsTrigger value="general">Genel Ayarlar</TabsTrigger>
          <TabsTrigger value="webhooks">Webhook Ayarları</TabsTrigger>
          <TabsTrigger value="syncHistory">Senkronizasyon Geçmişi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="p-6 rounded-xl bg-white shadow-sm mt-4">
          <h3 className="text-lg font-medium mb-4">Genel Entegrasyon Ayarları</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Otomatik Senkronizasyon</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-sync">Otomatik Senkronizasyon</Label>
                    <p className="text-sm text-gray-500">Belirli aralıklarla platformlar arası otomatik senkronizasyon</p>
                  </div>
                  <Switch id="auto-sync" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-interval">Senkronizasyon Sıklığı</Label>
                    <p className="text-sm text-gray-500">Ne sıklıkla otomatik senkronizasyon yapılacağı</p>
                  </div>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sıklık Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 dakika</SelectItem>
                      <SelectItem value="30">30 dakika</SelectItem>
                      <SelectItem value="60">1 saat</SelectItem>
                      <SelectItem value="360">6 saat</SelectItem>
                      <SelectItem value="720">12 saat</SelectItem>
                      <SelectItem value="1440">24 saat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Stok Yönetimi</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stock-sync">Stok Senkronizasyonu</Label>
                    <p className="text-sm text-gray-500">Platformlar arası stok senkronizasyonu</p>
                  </div>
                  <Switch id="stock-sync" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stock-safety">Güvenlik Payı</Label>
                    <p className="text-sm text-gray-500">Platformlarda gösterilecek stok için güvenlik payı</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="stock-safety" 
                      type="number"
                      className="w-20" 
                      defaultValue="2"
                    />
                    <span className="text-sm text-gray-500">adet</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stock-threshold">Kritik Stok Eşiği</Label>
                    <p className="text-sm text-gray-500">Stok uyarıları için minimum eşik değeri</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="stock-threshold" 
                      type="number"
                      className="w-20" 
                      defaultValue="5"
                    />
                    <span className="text-sm text-gray-500">adet</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Platform Öncelikleri</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stock-priority">Stok Önceliği</Label>
                    <p className="text-sm text-gray-500">Stok çakışması durumunda hangi platformun öncelikli olacağı</p>
                  </div>
                  <Select defaultValue="shopify">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Platform Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="trendyol">Trendyol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="price-priority">Fiyat Önceliği</Label>
                    <p className="text-sm text-gray-500">Fiyat çakışması durumunda hangi platformun öncelikli olacağı</p>
                  </div>
                  <Select defaultValue="shopify">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Platform Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="trendyol">Trendyol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Varsayılanlara Sıfırla</Button>
            <Button>Ayarları Kaydet</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks" className="p-6 rounded-xl bg-white shadow-sm mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Webhook Tanımları</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Webhook
            </Button>
          </div>
          
          <DataTable
            data={webhooks}
            columns={webhookColumns}
          />
        </TabsContent>
        
        <TabsContent value="syncHistory" className="p-6 rounded-xl bg-white shadow-sm mt-4">
          <h3 className="text-lg font-medium mb-4">Senkronizasyon Geçmişi</h3>
          <DataTable
            data={syncHistory}
            columns={syncHistoryColumns}
            pagination
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Integrations;
