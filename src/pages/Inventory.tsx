
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArrowDownUp, ArrowUpDown, ChevronDown, Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Stok verileri
const inventoryData = [
  {
    id: 1,
    name: "Akıllı Telefon XS",
    sku: "PHN-XS-128",
    category: "Elektronik",
    totalStock: 45,
    shopifyStock: 40,
    trendyolStock: 5,
    value: 12999,
    lastUpdate: "2023-06-10T14:30:00",
    status: "normal",
  },
  {
    id: 2,
    name: "Kablosuz Kulaklık",
    sku: "AUD-WL-001",
    category: "Elektronik",
    totalStock: 10,
    shopifyStock: 5,
    trendyolStock: 5,
    value: 1299,
    lastUpdate: "2023-06-09T11:20:00",
    status: "low",
  },
  {
    id: 3,
    name: "Bluetooth Hoparlör",
    sku: "SPK-BT-101",
    category: "Elektronik",
    totalStock: 23,
    shopifyStock: 15,
    trendyolStock: 8,
    value: 899,
    lastUpdate: "2023-06-08T09:15:00",
    status: "normal",
  },
  {
    id: 4,
    name: "Akıllı Saat",
    sku: "WCH-SM-202",
    category: "Elektronik",
    totalStock: 8,
    shopifyStock: 3,
    trendyolStock: 5,
    value: 2499,
    lastUpdate: "2023-06-07T16:40:00",
    status: "low",
  },
  {
    id: 5,
    name: "Tablet Bilgisayar",
    sku: "TAB-102-64",
    category: "Elektronik",
    totalStock: 0,
    shopifyStock: 0,
    trendyolStock: 0,
    value: 4999,
    lastUpdate: "2023-06-05T10:30:00",
    status: "out",
  },
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();

  // Filtreleme
  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stok Durumu rengini belirleme
  const getStockStatusClass = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-success/10 text-success";
      case "low":
        return "bg-warning/10 text-warning";
      case "out":
        return "bg-error/10 text-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Stok ekleme işlemi
  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Stok Güncellendi",
      description: `${selectedProduct?.name} için stok başarıyla güncellendi.`,
    });
    setIsAddStockOpen(false);
  };

  // Stok düzenleme başlatma
  const handleEditStock = (product: any) => {
    setSelectedProduct(product);
    setIsAddStockOpen(true);
  };

  // Tarihi formatlama
  const formatDate = (dateString: string) => {
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
              <h1 className="text-2xl font-semibold text-gray-900">Stok Yönetimi</h1>
              <p className="text-gray-500 mt-1">
                Tüm ürünlerinizin stok durumlarını görüntüleyin ve yönetin.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtrele
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Yeni Ürün
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ürün Adı
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SKU
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategori
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Shopify Stok
                          </label>
                          <input
                            type="number"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trendyol Stok
                          </label>
                          <input
                            type="number"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fiyat (₺)
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline">İptal</Button>
                        <Button type="submit">Ekle</Button>
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ürün adı veya SKU ile arayın..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center cursor-pointer">
                        Ürün <ArrowUpDown className="ml-1 w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center cursor-pointer">
                        SKU <ArrowUpDown className="ml-1 w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center cursor-pointer">
                        Toplam Stok <ArrowUpDown className="ml-1 w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shopify
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trendyol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center cursor-pointer">
                        Değer <ArrowUpDown className="ml-1 w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center cursor-pointer">
                        Son Güncelleme <ArrowUpDown className="ml-1 w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.totalStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.shopifyStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.trendyolStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₺{item.value.toLocaleString("tr-TR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.lastUpdate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStockStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status === "normal"
                            ? "Normal"
                            : item.status === "low"
                            ? "Düşük"
                            : "Tükendi"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              İşlemler
                              <ChevronDown className="ml-1 w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuItem onClick={() => handleEditStock(item)}>
                                Stok Ekle/Çıkar
                              </DropdownMenuItem>
                              <DropdownMenuItem>Platforma Gönder</DropdownMenuItem>
                              <DropdownMenuItem>Detaylar</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Stok Ekleme/Çıkarma Modal */}
      <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stok Güncelleme</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {selectedProduct && (
              <form onSubmit={handleAddStock} className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İşlem Tipi
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="add">Stok Ekle</option>
                    <option value="remove">Stok Çıkar</option>
                    <option value="transfer">Platform Transferi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Miktar
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="shopify">Shopify</option>
                    <option value="trendyol">Trendyol</option>
                    <option value="both">Her İkisi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referans
                  </label>
                  <input
                    type="text"
                    placeholder="Sipariş/Fatura no"
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notlar
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bu işlemle ilgili notlar"
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsAddStockOpen(false)}>
                    İptal
                  </Button>
                  <Button type="submit">Güncelle</Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
