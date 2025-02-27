
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Box, 
  Package, 
  RefreshCw, 
  ShoppingCart 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Örnek veri
const salesData = [
  { name: "Pzt", shopify: 12, trendyol: 18, total: 30 },
  { name: "Sal", shopify: 19, trendyol: 15, total: 34 },
  { name: "Çrş", shopify: 15, trendyol: 20, total: 35 },
  { name: "Prş", shopify: 22, trendyol: 16, total: 38 },
  { name: "Cum", shopify: 25, trendyol: 22, total: 47 },
  { name: "Cmt", shopify: 30, trendyol: 28, total: 58 },
  { name: "Paz", shopify: 22, trendyol: 23, total: 45 }
];

const stockData = [
  { name: "1 Haz", value: 120 },
  { name: "8 Haz", value: 145 },
  { name: "15 Haz", value: 132 },
  { name: "22 Haz", value: 167 },
  { name: "29 Haz", value: 188 },
];

const recentAlerts = [
  {
    id: 1,
    type: "low_stock",
    product: "Akıllı Telefon XS",
    value: "5 adet",
    time: "2 saat önce",
    platform: "Shopify",
  },
  {
    id: 2,
    type: "price_change",
    product: "Kablosuz Kulaklık",
    value: "₺1.299 → ₺1.199",
    time: "5 saat önce",
    platform: "Trendyol",
  },
  {
    id: 3,
    type: "out_of_stock",
    product: "Tablet Bilgisayar",
    value: "Tükendi",
    time: "1 gün önce",
    platform: "Shopify",
  },
  {
    id: 4,
    type: "stock_update",
    product: "Bluetooth Hoparlör",
    value: "+15 adet",
    time: "1 gün önce",
    platform: "Trendyol",
  },
];

const lowStockItems = [
  {
    id: 1,
    name: "Akıllı Telefon XS",
    sku: "PHN-XS-128",
    stock: 5,
    threshold: 10,
    platform: "Shopify",
  },
  {
    id: 2,
    name: "Kablosuz Kulaklık",
    sku: "AUD-WL-001",
    stock: 3,
    threshold: 5,
    platform: "Trendyol",
  },
  {
    id: 3,
    name: "Akıllı Saat",
    sku: "WCH-SM-202",
    stock: 8,
    threshold: 15,
    platform: "Shopify",
  },
];

const recentOrders = [
  {
    id: "ORD-4231",
    customer: "Ahmet Yılmaz",
    date: "15 Haz 2023",
    status: "shipped",
    total: "₺2.598",
    platform: "Shopify",
  },
  {
    id: "ORD-4230",
    customer: "Zeynep Kaya",
    date: "15 Haz 2023",
    status: "processing",
    total: "₺13.499",
    platform: "Trendyol",
  },
  {
    id: "ORD-4229",
    customer: "Mehmet Demir",
    date: "14 Haz 2023",
    status: "delivered",
    total: "₺899",
    platform: "Shopify",
  },
  {
    id: "ORD-4228",
    customer: "Ayşe Yıldız",
    date: "14 Haz 2023",
    status: "cancelled",
    total: "₺1.299",
    platform: "Trendyol",
  },
];

const Index = () => {
  const [dateRange, setDateRange] = useState("week");

  // Durum metni renkleri
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-blue-50 text-blue-600";
      case "processing":
        return "bg-yellow-50 text-yellow-600";
      case "delivered":
        return "bg-green-50 text-green-600";
      case "cancelled":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
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
              <h1 className="text-2xl font-semibold text-gray-900">Gösterge Paneli</h1>
              <p className="text-gray-500 mt-1">
                Tüm satış, stok ve sipariş bilgileriniz için genel bakış.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
                <button
                  className={`px-3 py-1 text-sm rounded ${
                    dateRange === "week"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setDateRange("week")}
                >
                  Haftalık
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded ${
                    dateRange === "month"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setDateRange("month")}
                >
                  Aylık
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded ${
                    dateRange === "year"
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setDateRange("year")}
                >
                  Yıllık
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Yenile
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Toplam Satış"
              value="₺45.782"
              change="+12.3%"
              trend="up"
              description="Geçen haftaya göre"
              icon={ShoppingCart}
            />
            <StatCard
              title="Sipariş Sayısı"
              value="128"
              change="+5.4%"
              trend="up"
              description="Geçen haftaya göre"
              icon={Box}
            />
            <StatCard
              title="Stok Değeri"
              value="₺124.892"
              change="-2.1%"
              trend="down"
              description="Geçen haftaya göre"
              icon={Package}
            />
            <StatCard
              title="Bekleyen Siparişler"
              value="12"
              change="+3"
              trend="up"
              description="Dün'e göre"
              icon={ShoppingCart}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Satış Performansı
                </h2>
                <div className="text-sm text-gray-500">
                  {dateRange === "week"
                    ? "Son 7 gün"
                    : dateRange === "month"
                    ? "Son 30 gün"
                    : "Son 12 ay"}
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="shopify"
                      name="Shopify"
                      fill="#3366FF"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="trendyol"
                      name="Trendyol"
                      fill="#FF6633"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Stok Trendi
                </h2>
                <div className="text-sm text-gray-500">Haziran 2023</div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Toplam Stok"
                      stroke="#3366FF"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Alerts and Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Son Uyarılar
                </h2>
                <Link
                  to="/notifications"
                  className="text-sm text-primary hover:text-primary/90"
                >
                  Tümünü Gör
                </Link>
              </div>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${
                        alert.type === "low_stock" || alert.type === "out_of_stock"
                          ? "bg-warning/10 text-warning"
                          : alert.type === "price_change"
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {alert.type === "low_stock" || alert.type === "out_of_stock" ? (
                        <ArrowDownRight className="w-5 h-5" />
                      ) : alert.type === "price_change" ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <RefreshCw className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {alert.product}
                        </h3>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">
                          {alert.type === "low_stock"
                            ? "Düşük Stok"
                            : alert.type === "out_of_stock"
                            ? "Stok Tükendi"
                            : alert.type === "price_change"
                            ? "Fiyat Değişikliği"
                            : "Stok Güncellemesi"}
                          : {alert.value}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          {alert.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Kritik Stok Ürünleri
                </h2>
                <Link
                  to="/inventory"
                  className="text-sm text-primary hover:text-primary/90"
                >
                  Tümünü Gör
                </Link>
              </div>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning">
                        {item.stock}/{item.threshold}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{item.sku}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {item.platform}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Son Siparişler
              </h2>
              <Link
                to="/orders"
                className="text-sm text-primary hover:text-primary/90"
              >
                Tümünü Gör
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sipariş ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Müşteri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {order.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {order.status === "shipped"
                            ? "Kargoda"
                            : order.status === "processing"
                            ? "Hazırlanıyor"
                            : order.status === "delivered"
                            ? "Teslim Edildi"
                            : "İptal Edildi"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
