
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertTriangle, ArrowUpRight, Box, Clock, FileBarChart, Package, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Index = () => {
  // Platform stock data for charts
  const platformStockData = [
    { name: "Ocak", shopify: 420, trendyol: 240 },
    { name: "Şubat", shopify: 460, trendyol: 280 },
    { name: "Mart", shopify: 480, trendyol: 320 },
    { name: "Nisan", shopify: 520, trendyol: 380 },
    { name: "Mayıs", shopify: 560, trendyol: 420 },
    { name: "Haziran", shopify: 600, trendyol: 450 },
  ];

  // Platform distribution data for pie chart
  const platformDistributionData = [
    { name: "Shopify", value: 600 },
    { name: "Trendyol", value: 450 },
  ];

  // Colors for pie chart
  const COLORS = ["#3366FF", "#FF6633"];

  // Critical stock data for table
  const criticalStockItems = [
    {
      id: 1,
      name: "Taşınabilir Şarj Cihazı",
      sku: "CHG-PWR-10K",
      currentStock: 5,
      threshold: 10,
    },
    {
      id: 2,
      name: "Akıllı Saat Fit",
      sku: "WCH-FIT-01",
      currentStock: 12,
      threshold: 15,
    },
    {
      id: 3,
      name: "Bluetooth Mikrofon",
      sku: "MIC-BT-01",
      currentStock: 8,
      threshold: 20,
    },
    {
      id: 4,
      name: "Kablosuz Kulaklık Mini",
      sku: "AUD-WL-MINI",
      currentStock: 7,
      threshold: 25,
    },
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "stock_update",
      product: "Akıllı Telefon XS",
      action: "Stok güncelleme",
      platform: "Shopify",
      time: "10 dakika önce",
      change: "+15",
    },
    {
      id: 2,
      type: "order",
      product: "Bluetooth Kulaklık Pro",
      action: "Yeni sipariş",
      platform: "Trendyol",
      time: "45 dakika önce",
      change: "-3",
    },
    {
      id: 3,
      type: "sync_error",
      product: "Akıllı Saat Fit",
      action: "Senkronizasyon hatası",
      platform: "Shopify",
      time: "2 saat önce",
      change: null,
    },
    {
      id: 4,
      type: "stock_update",
      product: "Kablosuz Mouse",
      action: "Stok tükendi",
      platform: "Tümü",
      time: "3 saat önce",
      change: "0",
    },
  ];

  // Function to get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "stock_update":
        return <RefreshCw className="text-primary" />;
      case "order":
        return <Package className="text-secondary" />;
      case "sync_error":
        return <AlertTriangle className="text-error" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="container p-6">
          <div className="mb-8">
            <h1 className="text-h2 font-semibold text-gray-900">
              Hoş Geldiniz
            </h1>
            <p className="mt-1 text-gray-500">
              Stok yönetim sisteminize genel bakış
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              icon={Box}
              label="Toplam Ürün"
              value="1,234"
              change="8.5%"
              isPositive={true}
            />
            <StatCard
              icon={AlertTriangle}
              label="Kritik Stok"
              value="28"
              change="12%"
              isPositive={false}
            />
            <StatCard
              icon={TrendingDown}
              label="Tükenen Ürünler"
              value="15"
              change="5"
              isPositive={false}
            />
            <StatCard
              icon={TrendingUp}
              label="Günlük Satış"
              value="₺24,500"
              change="12.5%"
              isPositive={true}
            />
          </div>

          {/* Platform Stock Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Platform Stok Karşılaştırması
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={platformStockData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="shopify"
                        name="Shopify"
                        fill="#3366FF"
                        barSize={20}
                      />
                      <Bar
                        dataKey="trendyol"
                        name="Trendyol"
                        fill="#FF6633"
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Platform Dağılımı
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {platformDistributionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} ürün`, "Stok"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Toplam Stok Değeri:</span>
                    <span className="font-medium">₺2,345,670</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Stock & Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Stock Alerts */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Kritik Stok Uyarıları
                  </h2>
                  <button className="text-sm text-primary flex items-center hover:underline">
                    Tümünü Gör
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
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
                        Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Eşik
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {criticalStockItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-warning/10 text-warning">
                            {item.currentStock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.threshold}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary/80 mr-3">
                            Stok Ekle
                          </button>
                          <button className="text-secondary hover:text-secondary/80">
                            Sipariş Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Son Hareketler
                  </h2>
                  <button className="text-sm text-primary flex items-center hover:underline">
                    Tümünü Gör
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivities.map((activity, idx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {idx !== recentActivities.length - 1 && (
                            <span
                              className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                {getActivityIcon(activity.type)}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">
                                    {activity.product}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {activity.action} • {activity.platform}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">
                                <div className="flex justify-between">
                                  <span>{activity.time}</span>
                                  {activity.change && (
                                    <span
                                      className={`font-medium ${
                                        activity.change.startsWith("+")
                                          ? "text-success"
                                          : activity.change === "0"
                                          ? "text-error"
                                          : "text-secondary"
                                      }`}
                                    >
                                      {activity.change}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
