
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArrowLeft, ChevronDown, Edit, ExternalLink, Eye, FileBarChart, History, MoreHorizontal, RefreshCw, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy product data
  const product = {
    id: 1,
    name: "Akıllı Telefon XS",
    sku: "PHN-XS-128",
    barcode: "8682510123456",
    category: "Elektronik",
    tags: ["Telefon", "Mobil", "Akıllı Cihaz"],
    brand: "TechBrand",
    supplier: "TechSupplies A.Ş.",
    description:
      "Son teknoloji 6.1 inç OLED ekran, 128GB depolama, 12MP kamera ve uzun pil ömrü sunan premium akıllı telefon.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    platforms: [
      {
        name: "Shopify",
        productId: "SHF123456",
        stock: 40,
        price: 12999,
        url: "#",
        status: "active",
        lastUpdate: "2023-06-10T14:30:00",
        syncStatus: "synced",
      },
      {
        name: "Trendyol",
        productId: "TRD987654",
        stock: 5,
        price: 13499,
        url: "#",
        status: "active",
        lastUpdate: "2023-06-10T12:15:00",
        syncStatus: "synced",
      },
    ],
    variants: [
      {
        name: "Renk",
        options: [
          {
            value: "Siyah",
            sku: "PHN-XS-128-BLK",
            shopifyStock: 25,
            trendyolStock: 3,
          },
          {
            value: "Beyaz",
            sku: "PHN-XS-128-WHT",
            shopifyStock: 15,
            trendyolStock: 2,
          },
        ],
      },
      {
        name: "Kapasite",
        options: [
          {
            value: "128GB",
            sku: "PHN-XS-128",
            shopifyStock: 40,
            trendyolStock: 5,
          },
          {
            value: "256GB",
            sku: "PHN-XS-256",
            shopifyStock: 20,
            trendyolStock: 8,
          },
        ],
      },
    ],
    stockHistory: [
      {
        id: 1,
        date: "2023-06-10T10:30:00",
        type: "in",
        quantity: 15,
        platform: "Shopify",
        user: "Ahmet Şahin",
        reference: "PO-12345",
        notes: "Tedarikçiden gelen yeni stok",
      },
      {
        id: 2,
        date: "2023-06-09T14:15:00",
        type: "out",
        quantity: 3,
        platform: "Trendyol",
        user: "Sistem",
        reference: "ORD-7890",
        notes: "Sipariş nedeniyle otomatik düşüş",
      },
      {
        id: 3,
        date: "2023-06-05T09:45:00",
        type: "transfer",
        quantity: 5,
        platform: "Shopify > Trendyol",
        user: "Ayşe Yılmaz",
        reference: "TRF-1234",
        notes: "Platform arası stok transferi",
      },
    ],
  };

  // Sales data for chart
  const salesData = [
    { date: "10 Haz", shopify: 3, trendyol: 2, total: 5 },
    { date: "11 Haz", shopify: 5, trendyol: 1, total: 6 },
    { date: "12 Haz", shopify: 2, trendyol: 3, total: 5 },
    { date: "13 Haz", shopify: 4, trendyol: 2, total: 6 },
    { date: "14 Haz", shopify: 3, trendyol: 4, total: 7 },
    { date: "15 Haz", shopify: 6, trendyol: 2, total: 8 },
    { date: "16 Haz", shopify: 5, trendyol: 3, total: 8 },
  ];

  // Stock history data for chart
  const stockHistoryData = [
    { date: "10 May", stock: 32 },
    { date: "15 May", stock: 40 },
    { date: "20 May", stock: 35 },
    { date: "25 May", stock: 28 },
    { date: "30 May", stock: 45 },
    { date: "05 Haz", stock: 38 },
    { date: "10 Haz", stock: 45 },
  ];

  // Get stock status class
  const getStockStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "inactive":
        return "bg-gray-100 text-gray-600";
      case "synced":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "error":
        return "bg-error/10 text-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Get stock movement type class
  const getStockMovementTypeClass = (type: string) => {
    switch (type) {
      case "in":
        return "bg-success/10 text-success";
      case "out":
        return "bg-error/10 text-error";
      case "transfer":
        return "bg-primary/10 text-primary";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Format date
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
            <div className="flex items-center mb-4 md:mb-0">
              <Link
                to="/products"
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-h2 font-semibold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center mt-1">
                  <p className="text-gray-500">SKU: {product.sku}</p>
                  <span className="mx-2 text-gray-300">|</span>
                  <p className="text-gray-500">Barkod: {product.barcode}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                <ExternalLink className="w-4 h-4" />
                <span>Platformda Görüntüle</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90">
                <Edit className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-1 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Genel Bakış
              </button>
              <button
                onClick={() => setActiveTab("stock")}
                className={`px-1 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "stock"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Stok Hareketleri
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-1 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "analytics"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Analitik
              </button>
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Ürün Bilgileri
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Kategori
                          </h3>
                          <p className="text-gray-900">{product.category}</p>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Marka
                          </h3>
                          <p className="text-gray-900">{product.brand}</p>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Tedarikçi
                          </h3>
                          <p className="text-gray-900">{product.supplier}</p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Etiketler
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Açıklama
                          </h3>
                          <p className="text-gray-900">{product.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Comparison Table */}
                <div className="bg-white rounded-xl shadow-sm mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Platform Karşılaştırma
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Platform
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ürün ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Stok
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fiyat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Son Güncelleme
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Durum
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Senkronizasyon
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              İşlem
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {product.platforms.map((platform, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {platform.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {platform.productId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {platform.stock}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ₺{platform.price.toLocaleString("tr-TR")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(platform.lastUpdate)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStockStatusClass(
                                    platform.status
                                  )}`}
                                >
                                  {platform.status === "active"
                                    ? "Aktif"
                                    : "Pasif"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStockStatusClass(
                                    platform.syncStatus
                                  )}`}
                                >
                                  {platform.syncStatus === "synced"
                                    ? "Senkronize"
                                    : platform.syncStatus === "pending"
                                    ? "Bekliyor"
                                    : "Hata"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className="text-gray-500 hover:text-gray-700">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Variants */}
                {product.variants.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Varyantlar
                      </h2>
                      {product.variants.map((variant, vIndex) => (
                        <div
                          key={vIndex}
                          className={vIndex > 0 ? "mt-6 pt-6 border-t border-gray-100" : ""}
                        >
                          <h3 className="text-md font-medium text-gray-900 mb-3">
                            {variant.name}
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Değer
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SKU
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Shopify Stok
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trendyol Stok
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Toplam
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {variant.options.map((option, oIndex) => (
                                  <tr key={oIndex}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {option.value}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {option.sku}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {option.shopifyStock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {option.trendyolStock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {option.shopifyStock + option.trendyolStock}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Product Images */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 grid grid-cols-3 gap-2">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`aspect-square bg-gray-100 rounded border-2 ${
                          index === 0
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Hızlı İşlemler
                  </h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                      <span className="flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Stok Güncelle
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Platformda Görüntüle
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </button>
                    <button className="w-full flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      <History className="w-4 h-4 mr-2" />
                      Geçmiş
                    </button>
                    <button className="w-full flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      <FileBarChart className="w-4 h-4 mr-2" />
                      Rapor Oluştur
                    </button>
                  </div>
                </div>

                {/* Stock Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Stok Özeti
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Toplam Stok:</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Shopify:</span>
                      <span className="font-medium">40</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Trendyol:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Stok Değeri:</span>
                      <span className="font-medium">
                        ₺{(45 * 12999).toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Son Güncelleme:</span>
                      <span className="text-sm text-gray-500">10 Haz 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stock Movements Tab */}
          {activeTab === "stock" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Stok Hareketleri
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarih
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            İşlem
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Miktar
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Platform
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kullanıcı
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Referans
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {product.stockHistory.map((history) => (
                          <tr key={history.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(history.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStockMovementTypeClass(
                                  history.type
                                )}`}
                              >
                                {history.type === "in"
                                  ? "Giriş"
                                  : history.type === "out"
                                  ? "Çıkış"
                                  : "Transfer"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <span
                                className={
                                  history.type === "in"
                                    ? "text-success"
                                    : history.type === "out"
                                    ? "text-error"
                                    : "text-primary"
                                }
                              >
                                {history.type === "in"
                                  ? "+"
                                  : history.type === "out"
                                  ? "-"
                                  : "±"}
                                {history.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {history.platform}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {history.user}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {history.reference}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Stok Değişim Grafiği
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={stockHistoryData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="stock"
                          name="Stok"
                          stroke="#3366FF"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Yeni Stok Hareketi
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="movementType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        İşlem Tipi
                      </label>
                      <select
                        id="movementType"
                        className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue="in"
                      >
                        <option value="in">Stok Girişi</option>
                        <option value="out">Stok Çıkışı</option>
                        <option value="transfer">Platform Transferi</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Miktar
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        min="1"
                        defaultValue="1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="platform"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Platform
                      </label>
                      <select
                        id="platform"
                        className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue="shopify"
                      >
                        <option value="shopify">Shopify</option>
                        <option value="trendyol">Trendyol</option>
                        <option value="both">Her İkisi</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="reference"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Referans
                      </label>
                      <input
                        type="text"
                        id="reference"
                        className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Sipariş/Fatura no"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Notlar
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Bu işlemle ilgili notlar"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Stok Güncelle
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    İpuçları
                  </h2>
                  <div className="space-y-4 text-sm text-gray-500">
                    <p>
                      <span className="font-medium text-gray-900">Stok Girişi:</span>{" "}
                      Yeni ürün geldiğinde veya sayım sonrası düzeltme için kullanın.
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Stok Çıkışı:</span>{" "}
                      Hasar, kayıp veya manuel satışlar için kullanın.
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Transfer:</span>{" "}
                      Platformlar arası stok aktarımı için kullanın.
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Referans:</span>{" "}
                      Sipariş no, fatura no gibi ilgili belgeleri belirtin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Satış Performansı
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="shopify"
                          name="Shopify"
                          fill="#3366FF"
                          barSize={15}
                        />
                        <Bar
                          dataKey="trendyol"
                          name="Trendyol"
                          fill="#FF6633"
                          barSize={15}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Stok Trendleri
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={stockHistoryData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="stock"
                          name="Stok"
                          stroke="#3366FF"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Performans Özeti
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Satış Adedi (7 gün):</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Ciro (7 gün):</span>
                      <span className="font-medium">
                        ₺{(45 * 12999).toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Stok Devir Hızı:</span>
                      <span className="font-medium">6.4 gün</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Ortalama Satış Fiyatı:</span>
                      <span className="font-medium">
                        ₺{13249.toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Görüntülenme:</span>
                      <span className="font-medium">1,245</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Platform Dağılımı
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Shopify Satışları
                        </span>
                        <span className="text-sm font-medium text-primary">
                          65%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Trendyol Satışları
                        </span>
                        <span className="text-sm font-medium text-secondary">
                          35%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Stok Tahminleri
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Mevcut Trend:</span>
                      <span className="text-success font-medium">Yükseliş</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-500">Tahmini Tükenme:</span>
                      <span className="font-medium">18 gün sonra</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Önerilen Sipariş:</span>
                      <span className="font-medium">50 adet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
