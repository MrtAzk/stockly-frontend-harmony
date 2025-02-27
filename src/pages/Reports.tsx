
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { AreaChart, BarChart as BarChartIcon, CalendarDays, Download, FileBarChart, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Reports = () => {
  const [reportType, setReportType] = useState("stock");
  const [timePeriod, setTimePeriod] = useState("monthly");

  // Sample data for stock levels
  const stockData = [
    { name: "Ocak", shopify: 140, trendyol: 80, total: 220 },
    { name: "Şubat", shopify: 120, trendyol: 110, total: 230 },
    { name: "Mart", shopify: 160, trendyol: 130, total: 290 },
    { name: "Nisan", shopify: 180, trendyol: 160, total: 340 },
    { name: "Mayıs", shopify: 200, trendyol: 180, total: 380 },
    { name: "Haziran", shopify: 220, trendyol: 190, total: 410 },
  ];

  // Sample data for sales performance
  const salesData = [
    { name: "Ocak", shopify: 45000, trendyol: 32000, total: 77000 },
    { name: "Şubat", shopify: 52000, trendyol: 41000, total: 93000 },
    { name: "Mart", shopify: 49000, trendyol: 38000, total: 87000 },
    { name: "Nisan", shopify: 60000, trendyol: 45000, total: 105000 },
    { name: "Mayıs", shopify: 68000, trendyol: 51000, total: 119000 },
    { name: "Haziran", shopify: 75000, trendyol: 58000, total: 133000 },
  ];

  const displayData = reportType === "stock" ? stockData : salesData;

  const reportTypes = [
    {
      id: "stock",
      name: "Stok Analizi",
      description: "Platform bazında stok seviyeleri",
      icon: BarChartIcon,
    },
    {
      id: "sales",
      name: "Satış Performansı",
      description: "Aylık satış metrikleri",
      icon: AreaChart,
    },
    {
      id: "inventory",
      name: "Envanter Raporu",
      description: "Stok durumu ve değeri",
      icon: FileBarChart,
    },
    {
      id: "transactions",
      name: "İşlem Geçmişi",
      description: "Tüm stok hareketleri",
      icon: FileText,
    },
  ];

  const timePeriods = [
    { id: "daily", name: "Günlük" },
    { id: "weekly", name: "Haftalık" },
    { id: "monthly", name: "Aylık" },
    { id: "yearly", name: "Yıllık" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="container p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-h2 font-semibold text-gray-900">Raporlar</h1>
              <p className="mt-1 text-gray-500">
                Stok ve satış performansınızı analiz edin
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg p-2">
                <CalendarDays className="w-5 h-5 text-gray-500 mr-2" />
                <select
                  className="bg-transparent text-gray-700 text-sm focus:outline-none"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                >
                  {timePeriods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Dışa Aktar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              const isActive = reportType === report.id;
              return (
                <div
                  key={report.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => setReportType(report.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full ${
                        isActive
                          ? "bg-white/20"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-primary"
                        }`}
                      />
                    </div>
                    <div className="ml-3">
                      <h3
                        className={`font-medium ${
                          isActive ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {report.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {report.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {reportType === "stock" ? "Stok Seviyesi Analizi" : "Satış Performansı"}
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {reportType === "stock" ? (
                  <BarChart data={displayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="shopify" name="Shopify" fill="#3366FF" />
                    <Bar dataKey="trendyol" name="Trendyol" fill="#FF6633" />
                  </BarChart>
                ) : (
                  <LineChart data={displayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₺${value.toLocaleString('tr-TR')}`} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Toplam"
                      stroke="#33CC66"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="shopify"
                      name="Shopify"
                      stroke="#3366FF"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="trendyol"
                      name="Trendyol"
                      stroke="#FF6633"
                      strokeWidth={2}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Platform Dağılımı
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Shopify
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {reportType === "stock" ? "65%" : "60%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: reportType === "stock" ? "65%" : "60%",
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Trendyol
                    </span>
                    <span className="text-sm font-medium text-secondary">
                      {reportType === "stock" ? "35%" : "40%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{
                        width: reportType === "stock" ? "35%" : "40%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Özet Metrikler
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Toplam Ürün</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Aktif Ürün</span>
                  <span className="font-medium">1,180</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Kritik Stok</span>
                  <span className="font-medium text-warning">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tükenen Ürün</span>
                  <span className="font-medium text-error">15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
