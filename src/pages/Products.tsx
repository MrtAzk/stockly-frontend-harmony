
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Filter, Grid, List, Plus, Search, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Akıllı Telefon XS",
      sku: "PHN-XS-128",
      category: "Elektronik",
      price: 12999,
      stock: 45,
      shopifyStock: 40,
      trendyolStock: 5,
      image: "/placeholder.svg",
      status: "active",
    },
    {
      id: 2,
      name: "Bluetooth Kulaklık Pro",
      sku: "AUD-BT-PRO",
      category: "Elektronik",
      price: 1299,
      stock: 78,
      shopifyStock: 50,
      trendyolStock: 28,
      image: "/placeholder.svg",
      status: "active",
    },
    {
      id: 3,
      name: "Akıllı Saat Fit",
      sku: "WCH-FIT-01",
      category: "Giyilebilir",
      price: 2499,
      stock: 12,
      shopifyStock: 10,
      trendyolStock: 2,
      image: "/placeholder.svg",
      status: "active",
    },
    {
      id: 4,
      name: "Taşınabilir Şarj Cihazı",
      sku: "CHG-PWR-10K",
      category: "Aksesuar",
      price: 399,
      stock: 5,
      shopifyStock: 3,
      trendyolStock: 2,
      image: "/placeholder.svg",
      status: "critical",
    },
    {
      id: 5,
      name: "Kablosuz Mouse",
      sku: "CMP-MS-WL",
      category: "Bilgisayar",
      price: 349,
      stock: 0,
      shopifyStock: 0,
      trendyolStock: 0,
      image: "/placeholder.svg",
      status: "out-of-stock",
    },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "critical":
        return "bg-warning/10 text-warning";
      case "out-of-stock":
        return "bg-error/10 text-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Yeterli Stok";
      case "critical":
        return "Kritik Stok";
      case "out-of-stock":
        return "Tükendi";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-h2 font-semibold text-gray-900">Ürünler</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Yeni Ürün</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ürün adı, SKU veya barkod ile ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="hidden md:inline">Filtrele</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden md:inline">Sırala</span>
              </button>
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  className={`p-2 ${
                    viewMode === "list" ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  className={`p-2 ${
                    viewMode === "grid" ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ürün
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiyat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shopify Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trendyol Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Toplam Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₺{product.price.toLocaleString("tr-TR")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.shopifyStock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.trendyolStock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusClass(
                              product.status
                            )}`}
                          >
                            {getStatusText(product.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-900 font-medium truncate">
                        {product.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs leading-5 font-medium rounded-full ${getStatusClass(
                          product.status
                        )}`}
                      >
                        {getStatusText(product.status)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">SKU: {product.sku}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-900 font-semibold">
                        ₺{product.price.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-gray-700 text-sm">
                        Stok: <span className="font-medium">{product.stock}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
