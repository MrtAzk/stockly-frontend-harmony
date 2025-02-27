
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { Box, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

const Index = () => {
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </main>
    </div>
  );
};

export default Index;

