
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  ArrowUpDown,
  Download,
  FileDown,
  FileUp,
  Filter,
  Plus,
  RefreshCw,
  Search,
  TrendingUp,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Inventory = () => {
  const [movementType, setMovementType] = useState("all");
  const [dateRange, setDateRange] = useState("thisWeek");

  // Sample metrics data
  const inventoryMetrics = [
    {
      title: "Toplam Stok Değeri",
      value: "₺784,560",
      change: "+5.3%",
      isPositive: true,
    },
    {
      title: "Ortalama Stok Seviyesi",
      value: "28 gün",
      change: "+2.1%",
      isPositive: true,
    },
    {
      title: "Stok Devir Hızı",
      value: "4.7x",
      change: "-1.2%",
      isPositive: false,
    },
  ];

  // Sample stock movement data
  const recentMovements = [
    {
      id: 1,
      date: "2023-06-15T10:30:00",
      product: "Akıllı Telefon XS",
      sku: "PHN-XS-128",
      type: "in",
      quantity: 15,
      previousStock: 30,
      newStock: 45,
      platform: "Shopify",
      user: "Ahmet Şahin",
      reference: "PO-12345",
    },
    {
      id: 2,
      date: "2023-06-14T15:45:00",
      product: "Bluetooth Kulaklık Pro",
      sku: "AUD-BT-PRO",
      type: "out",
      quantity: 3,
      previousStock: 81,
      newStock: 78,
      platform: "Trendyol",
      user: "Sistem",
      reference: "ORD-7890",
    },
    {
      id: 3,
      date: "2023-06-14T09:15:00",
      product: "Akıllı Saat Fit",
      sku: "WCH-FIT-01",
      type: "transfer",
      quantity: 5,
      previousStock: 12,
      newStock: 12,
      platform: "Shopify > Trendyol",
      user: "Ayşe Yılmaz",
      reference: "TRF-1234",
    },
    {
      id: 4,
      date: "2023-06-13T11:20:00",
      product: "Taşınabilir Şarj Cihazı",
      sku: "CHG-PWR-10K",
      type: "in",
      quantity: 10,
      previousStock: 0,
      newStock: 10,
      platform: "Tümü",
      user: "Mehmet Kaya",
      reference: "PO-56789",
    },
    {
      id: 5,
      date: "2023-06-12T14:50:00",
      product: "Kablosuz Mouse",
      sku: "CMP-MS-WL",
      type: "out",
      quantity: 2,
      previousStock: 2,
      newStock: 0,
      platform: "Shopify",
      user: "Sistem",
      reference: "ORD-4321",
    },
  ];

  // Sample trend data for chart
  const trendData = [
    {
      date: "10 Haz",
      in: 25,
      out: 18,
      total: 280,
    },
    {
      date: "11 Haz",
      in: 15,
      out: 12,
      total: 283,
    },
    {
      date: "12 Haz",
      in: 30,
      out: 15,
      total: 298,
    },
    {
      date: "13 Haz",
      in: 22,
      out: 25,
      total: 295,
    },
    {
      date: "14 Haz",
      in: 18,
      out: 20,
      total: 293,
    },
    {
      date: "15 Haz",
      in: 35,
      out: 10,
      total: 318,
    },
  ];

  // Function to get movement type class and label
  const getMovementType = (type: string) => {
    switch (type) {
      case "in":
        return {
          class: "bg-success/10 text-success",
          label: "Giriş",
        };
      case "out":
        return {
          class: "bg-error/10 text-error",
          label: "Çıkış",
        };
      case "transfer":
        return {
          class: "bg-primary/10 text-primary",
          label: "Transfer",
        };
      default:
        return {
          class: "bg-gray-100 text-gray-600",
          label: type,
        };
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-h2 font-semibold text-gray-900">
                Stok Yönetimi
              </h1>
              <p className="mt-1 text-gray-500">
                Stok hareketlerini takip edin ve yönetin
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Dışa Aktar</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                <span>Yeni Hareket</span>
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {inventoryMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-sm font-medium text-gray-500 mb-2">
                  {metric.title}
                </h2>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-semibold text-gray-900">
                    {metric.value}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      metric.isPositive ? "text-success" : "text-error"
                    }`}
                  >
                    {metric.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Stock Movement Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Stok Hareketi Ekle
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="product"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ürün
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      id="product"
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Ürün adı veya SKU ara..."
                    />
                  </div>
                </div>
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
                  <Plus className="w-4 h-4 mr-2" />
                  Hareketi Kaydet
                </button>
              </form>
            </div>

            {/* Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Stok Trendi
                </h2>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <span className="text-sm text-gray-500">Giriş</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-error"></div>
                      <span className="text-sm text-gray-500">Çıkış</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm text-gray-500">Toplam</span>
                    </div>
                  </div>
                  <select
                    className="border border-gray-200 rounded-lg p-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="today">Bugün</option>
                    <option value="thisWeek">Bu Hafta</option>
                    <option value="thisMonth">Bu Ay</option>
                    <option value="custom">Özel Tarih</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, "dataMax + 100"]}
                      />
                      <Tooltip />
                      <Bar
                        yAxisId="left"
                        dataKey="in"
                        name="Stok Girişi"
                        fill="#33CC66"
                        barSize={8}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="out"
                        name="Stok Çıkışı"
                        fill="#FF3333"
                        barSize={8}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="total"
                        name="Toplam Stok"
                        fill="#3366FF"
                        barSize={8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Movements Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">
                  Stok Hareketleri
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Ürün veya SKU ara..."
                    />
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      className={`px-3 py-2 ${
                        movementType === "all"
                          ? "bg-primary text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      onClick={() => setMovementType("all")}
                    >
                      Tümü
                    </button>
                    <button
                      className={`px-3 py-2 ${
                        movementType === "in"
                          ? "bg-success text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      onClick={() => setMovementType("in")}
                    >
                      Giriş
                    </button>
                    <button
                      className={`px-3 py-2 ${
                        movementType === "out"
                          ? "bg-error text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      onClick={() => setMovementType("out")}
                    >
                      Çıkış
                    </button>
                    <button
                      className={`px-3 py-2 ${
                        movementType === "transfer"
                          ? "bg-primary text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      onClick={() => setMovementType("transfer")}
                    >
                      Transfer
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filtrele</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ürün
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Miktar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Önceki Stok
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yeni Stok
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
                  {recentMovements
                    .filter(
                      (movement) =>
                        movementType === "all" || movement.type === movementType
                    )
                    .map((movement) => {
                      const typeInfo = getMovementType(movement.type);
                      return (
                        <tr key={movement.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(movement.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {movement.product}
                              </div>
                              <div className="text-sm text-gray-500">
                                {movement.sku}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${typeInfo.class}`}
                            >
                              {typeInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span
                              className={
                                movement.type === "in"
                                  ? "text-success"
                                  : movement.type === "out"
                                  ? "text-error"
                                  : "text-primary"
                              }
                            >
                              {movement.type === "in"
                                ? "+"
                                : movement.type === "out"
                                ? "-"
                                : "±"}
                              {movement.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {movement.previousStock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {movement.newStock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {movement.platform}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {movement.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {movement.reference}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Toplam {recentMovements.length} hareket
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  Önceki
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Sonraki
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Operations */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Toplu İşlemler
              </h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  <div className="flex items-center">
                    <FileDown className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        Excel Şablonu İndir
                      </div>
                      <div className="text-xs text-gray-500">
                        Toplu stok güncellemesi için
                      </div>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  <div className="flex items-center">
                    <FileUp className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        Excel Dosyası Yükle
                      </div>
                      <div className="text-xs text-gray-500">
                        Hazırladığınız dosyayı içe aktarın
                      </div>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  <div className="flex items-center">
                    <ArrowUpDown className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        Stok Sayım Aracı
                      </div>
                      <div className="text-xs text-gray-500">
                        Fiziksel sayım sonuçlarını girin
                      </div>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  <div className="flex items-center">
                    <RefreshCw className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        Gerçek Zamanlı Stok Kontrolü
                      </div>
                      <div className="text-xs text-gray-500">
                        Tüm platformlarla senkronize edin
                      </div>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        Stok Analizi Raporu
                      </div>
                      <div className="text-xs text-gray-500">
                        Detaylı stok performans raporu
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Kritik Stok Seviyeleri
              </h2>
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
                        Mevcut Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kritik Seviye
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tahmini Tükenme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Taşınabilir Şarj Cihazı
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CHG-PWR-10K
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-warning/10 text-warning">
                          5
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        10
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        7 gün
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary/80">
                          Stok Ekle
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Akıllı Saat Fit
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        WCH-FIT-01
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-warning/10 text-warning">
                          12
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        14 gün
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary/80">
                          Stok Ekle
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Bluetooth Mikrofon
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        MIC-BT-01
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-warning/10 text-warning">
                          8
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        10 gün
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary/80">
                          Stok Ekle
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Kablosuz Mouse
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CMP-MS-WL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-error/10 text-error">
                          0
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Tükendi
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary/80">
                          Stok Ekle
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
