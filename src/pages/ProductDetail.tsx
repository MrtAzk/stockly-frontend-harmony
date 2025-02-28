
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { ArrowLeft, Edit, ExternalLink, Package, RefreshCw, Share2, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [stockValue, setStockValue] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  // Mock ürün verisi - Gerçek uygulamada API'den gelir
  const product = {
    id: id || "1",
    name: "Akıllı Telefon XS",
    sku: "PHN-XS-128",
    barcode: "8682044294728",
    category: "Elektronik",
    brand: "TechX",
    supplier: "TechX Distribütör",
    description: "Yüksek performanslı akıllı telefon, 128 GB depolama, 6 GB RAM, 6.1 inç OLED ekran.",
    price: 12999,
    stock: 45,
    status: "active" as const,
    lastUpdated: "2023-06-15T14:30:00",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    platforms: [
      {
        name: "Shopify",
        id: "SHF-1234",
        stock: 40,
        price: 12999,
        url: "https://example.com/product",
        status: "active" as const,
        lastSync: "2023-06-15T14:30:00"
      },
      {
        name: "Trendyol",
        id: "TY-5678",
        stock: 5,
        price: 13499,
        url: "https://example.com/product",
        status: "active" as const,
        lastSync: "2023-06-15T14:30:00"
      }
    ],
    variants: [
      {
        id: "1",
        name: "Siyah / 128GB",
        sku: "PHN-XS-128-BLK",
        stock: 25,
        shopifyStock: 22,
        trendyolStock: 3
      },
      {
        id: "2",
        name: "Beyaz / 128GB",
        sku: "PHN-XS-128-WHT",
        stock: 20,
        shopifyStock: 18,
        trendyolStock: 2
      }
    ],
    stockHistory: [
      {
        id: "1",
        date: "2023-06-15T14:30:00",
        type: "in",
        quantity: 10,
        platform: "Shopify",
        user: "Ahmet Yılmaz",
        reference: "PO-12345"
      },
      {
        id: "2",
        date: "2023-06-14T11:15:00",
        type: "out",
        quantity: 2,
        platform: "Trendyol",
        user: "Sistem",
        reference: "ORD-6789"
      },
      {
        id: "3",
        date: "2023-06-13T09:45:00",
        type: "in",
        quantity: 15,
        platform: "Shopify",
        user: "Ahmet Yılmaz",
        reference: "PO-12344"
      }
    ]
  };

  // Stok geçmişi için tablo sütunları
  const stockHistoryColumns = [
    {
      header: "Tarih",
      accessorKey: "date",
      cell: (item: any) => new Date(item.date).toLocaleString('tr-TR')
    },
    {
      header: "İşlem",
      accessorKey: "type",
      cell: (item: any) => (
        <StatusBadge 
          status={item.type === "in" ? "success" : "error"} 
          text={item.type === "in" ? "Giriş" : "Çıkış"} 
        />
      )
    },
    {
      header: "Miktar",
      accessorKey: "quantity",
      cell: (item: any) => (
        <span className={item.type === "in" ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
          {item.type === "in" ? "+" : "-"}{item.quantity}
        </span>
      )
    },
    {
      header: "Platform",
      accessorKey: "platform"
    },
    {
      header: "Kullanıcı",
      accessorKey: "user"
    },
    {
      header: "Referans",
      accessorKey: "reference",
      cell: (item: any) => (
        <span className="text-primary font-medium">{item.reference}</span>
      )
    }
  ];

  // Varyant tablo sütunları
  const variantColumns = [
    {
      header: "Varyant",
      accessorKey: "name"
    },
    {
      header: "SKU",
      accessorKey: "sku"
    },
    {
      header: "Shopify Stok",
      accessorKey: "shopifyStock"
    },
    {
      header: "Trendyol Stok",
      accessorKey: "trendyolStock"
    },
    {
      header: "Toplam Stok",
      accessorKey: "stock",
      cell: (item: any) => (
        <span className="font-medium">{item.stock}</span>
      )
    }
  ];

  // Platform tablo sütunları
  const platformColumns = [
    {
      header: "Platform",
      accessorKey: "name"
    },
    {
      header: "Platform ID",
      accessorKey: "id"
    },
    {
      header: "Stok",
      accessorKey: "stock"
    },
    {
      header: "Fiyat",
      accessorKey: "price",
      cell: (item: any) => (
        <span className="font-medium">₺{item.price.toLocaleString('tr-TR')}</span>
      )
    },
    {
      header: "Durum",
      accessorKey: "status",
      cell: (item: any) => (
        <StatusBadge status={item.status as any} />
      )
    },
    {
      header: "Son Güncelleme",
      accessorKey: "lastSync",
      cell: (item: any) => new Date(item.lastSync).toLocaleString('tr-TR')
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => window.open(item.url, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const getStockStatusText = () => {
    if (product.stock <= 0) return "Tükendi";
    if (product.stock <= 10) return "Kritik Stok";
    return "Yeterli Stok";
  };

  const getStockStatusType = (): any => {
    if (product.stock <= 0) return "out-of-stock";
    if (product.stock <= 10) return "low-stock";
    return "success";
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/products" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Ürünlere Dön</span>
        </Link>
      </div>

      <PageHeader 
        title={product.name}
        description={`SKU: ${product.sku}`}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Düzenle
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Package className="w-4 h-4 mr-2" />
                  Stok Güncelle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Stok Güncelle</DialogTitle>
                  <DialogDescription>
                    "{product.name}" ürünü için stok güncelleme yapın.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="platform" className="text-right">
                      Platform
                    </Label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Platform Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Platformlar</SelectItem>
                        <SelectItem value="shopify">Shopify</SelectItem>
                        <SelectItem value="trendyol">Trendyol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Yeni Stok
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={stockValue}
                      onChange={(e) => setStockValue(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Stok Güncelle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Sol Sütun - Ürün Görseli */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-square w-full overflow-hidden bg-gray-50">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`w-16 h-16 rounded border ${index === 0 ? 'border-primary' : 'border-gray-200'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index+1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orta ve Sağ Sütun - Ürün Detayları */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={getStockStatusType()} text={getStockStatusText()} />
                  <StatusBadge status={product.status as any} />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">{product.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Barkod: {product.barcode} | SKU: {product.sku}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Satış Fiyatı</div>
                <div className="text-2xl font-bold text-gray-900">₺{product.price.toLocaleString('tr-TR')}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Ürün Bilgileri</h3>
                <div className="grid grid-cols-3 gap-y-2 text-sm">
                  <div className="text-gray-500">Kategori:</div>
                  <div className="col-span-2">{product.category}</div>
                  
                  <div className="text-gray-500">Marka:</div>
                  <div className="col-span-2">{product.brand}</div>
                  
                  <div className="text-gray-500">Tedarikçi:</div>
                  <div className="col-span-2">{product.supplier}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Stok Bilgileri</h3>
                <div className="grid grid-cols-3 gap-y-2 text-sm">
                  <div className="text-gray-500">Toplam Stok:</div>
                  <div className="col-span-2 font-medium">{product.stock} adet</div>
                  
                  <div className="text-gray-500">Shopify Stok:</div>
                  <div className="col-span-2">{product.platforms[0].stock} adet</div>
                  
                  <div className="text-gray-500">Trendyol Stok:</div>
                  <div className="col-span-2">{product.platforms[1].stock} adet</div>
                  
                  <div className="text-gray-500">Son Güncelleme:</div>
                  <div className="col-span-2">{new Date(product.lastUpdated).toLocaleString('tr-TR')}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Ürün Açıklaması</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="default" 
                className="gap-2"
                onClick={() => window.open(product.platforms[0].url, '_blank')}
              >
                <ShoppingCart className="w-4 h-4" />
                Shopify'da Görüntüle
              </Button>
              <Button 
                variant="default" 
                className="gap-2"
                onClick={() => window.open(product.platforms[1].url, '_blank')}
              >
                <ShoppingCart className="w-4 h-4" />
                Trendyol'da Görüntüle
              </Button>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Senkronize Et
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="platforms" className="mb-6">
        <TabsList>
          <TabsTrigger value="platforms">Platform Bilgileri</TabsTrigger>
          <TabsTrigger value="variants">Varyantlar</TabsTrigger>
          <TabsTrigger value="stockHistory">Stok Hareketleri</TabsTrigger>
        </TabsList>
        
        <TabsContent value="platforms" className="p-6 rounded-xl bg-white shadow-sm mt-4">
          <h3 className="text-lg font-medium mb-4">Platform Bilgileri</h3>
          <DataTable
            data={product.platforms}
            columns={platformColumns}
          />
        </TabsContent>
        
        <TabsContent value="variants" className="p-6 rounded-xl bg-white shadow-sm mt-4">
          <h3 className="text-lg font-medium mb-4">Varyantlar</h3>
          <DataTable
            data={product.variants}
            columns={variantColumns}
          />
        </TabsContent>
        
        <TabsContent value="stockHistory" className="p-6 rounded-xl bg-white shadow-sm mt-4">
          <h3 className="text-lg font-medium mb-4">Stok Hareketleri</h3>
          <DataTable
            data={product.stockHistory}
            columns={stockHistoryColumns}
            pagination
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProductDetail;
