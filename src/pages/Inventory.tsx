
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Database, FileInput, Filter, PackageOpen, Plus, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  PieChart,
  Pie,
  Cell
} from "recharts";

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [movementType, setMovementType] = useState("add");
  const [platform, setPlatform] = useState("all");
  
  // Mock veriler
  const stockSummary = {
    totalStock: 432,
    totalValue: 68450,
    lowStock: 8,
    outOfStock: 3,
    avgTurnover: 12.5
  };
  
  const stockDistribution = [
    { name: "Elektronik", value: 45 },
    { name: "Giyim", value: 30 },
    { name: "Ev & Yaşam", value: 15 },
    { name: "Kozmetik", value: 10 }
  ];
  
  const stockTurnover = [
    { name: "Ocak", value: 10.2 },
    { name: "Şubat", value: 11.5 },
    { name: "Mart", value: 12.1 },
    { name: "Nisan", value: 14.3 },
    { name: "Mayıs", value: 13.8 },
    { name: "Haziran", value: 12.5 }
  ];
  
  const products = [
    {
      id: "1",
      name: "Akıllı Telefon XS",
      sku: "PHN-XS-128",
      image: "/placeholder.svg",
      category: "Elektronik",
      stock: 45,
      criticalLevel: 10,
      shopifyStock: 40,
      trendyolStock: 5,
      value: 12999,
      lastUpdated: "2023-06-15T14:30:00"
    },
    {
      id: "2",
      name: "Kablosuz Kulaklık",
      sku: "AUD-WL-001",
      image: "/placeholder.svg",
      category: "Elektronik",
      stock: 3,
      criticalLevel: 5,
      shopifyStock: 2,
      trendyolStock: 1,
      value: 1299,
      lastUpdated: "2023-06-14T12:15:00"
    },
    {
      id: "3",
      name: "Tablet Bilgisayar",
      sku: "TAB-X-64",
      image: "/placeholder.svg",
      category: "Elektronik",
      stock: 0,
      criticalLevel: 5,
      shopifyStock: 0,
      trendyolStock: 0,
      value: 5999,
      lastUpdated: "2023-06-12T10:45:00"
    },
    {
      id: "4",
      name: "Bluetooth Hoparlör",
      sku: "SPK-BT-002",
      image: "/placeholder.svg",
      category: "Elektronik",
      stock: 15,
      criticalLevel: 10,
      shopifyStock: 10,
      trendyolStock: 5,
      value: 899,
      lastUpdated: "2023-06-10T16:20:00"
    },
    {
      id: "5",
      name: "Pamuklu T-Shirt",
      sku: "CLT-TS-M",
      image: "/placeholder.svg",
      category: "Giyim",
      stock: 85,
      criticalLevel: 20,
      shopifyStock: 65,
      trendyolStock: 20,
      value: 199,
      lastUpdated: "2023-06-14T09:30:00"
    },
    {
      id: "6",
      name: "Kot Pantolon",
      sku: "CLT-JP-32",
      image: "/placeholder.svg",
      category: "Giyim",
      stock: 42,
      criticalLevel: 15,
      shopifyStock: 30,
      trendyolStock: 12,
      value: 399,
      lastUpdated: "2023-06-13T11:15:00"
    }
  ];
  
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= p.criticalLevel);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  
  const stockMovements = [
    {
      id: "1",
      date: "2023-06-15T14:30:00",
      product: "Akıllı Telefon XS",
      sku: "PHN-XS-128",
      type: "add",
      quantity: 10,
      platform: "Shopify",
      user: "Ahmet Yılmaz",
      reference: "PO-12345"
    },
    {
      id: "2",
      date: "2023-06-14T11:15:00",
      product: "Kablosuz Kulaklık",
      sku: "AUD-WL-001",
      type: "remove",
      quantity: 2,
      platform: "Trendyol",
      user: "Sistem",
      reference: "ORD-6789"
    },
    {
      id: "3",
      date: "2023-06-13T09:45:00",
      product: "Akıllı Telefon XS",
      sku: "PHN-XS-128",
      type: "add",
      quantity: 15,
      platform: "Shopify",
      user: "Ahmet Yılmaz",
      reference: "PO-12344"
    },
    {
      id: "4",
      date: "2023-06-12T15:20:00",
      product: "Kot Pantolon",
      sku: "CLT-JP-32",
      type: "transfer",
      quantity: 5,
      platform: "Shopify → Trendyol",
      user: "Mehmet Demir",
      reference: "TRF-001"
    },
    {
      id: "5",
      date: "2023-06-11T10:30:00",
      product: "Bluetooth Hoparlör",
      sku: "SPK-BT-002",
      type: "add",
      quantity: 20,
      platform: "Tüm Platformlar",
      user: "Ahmet Yılmaz",
      reference: "PO-12343"
    }
  ];

  // Tablo sütunları
  const productColumns = [
    {
      header: "Ürün",
      accessorKey: "name",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-500">{item.sku}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Kategori",
      accessorKey: "category",
    },
    {
      header: "Stok",
      accessorKey: "stock",
      cell: (item: any) => {
        let status: any = "success";
        if (item.stock <= 0) status = "out-of-stock";
        else if (item.stock <= item.criticalLevel) status = "low-stock";
        
        return (
          <div className="flex flex-col gap-1">
            <StatusBadge status={status} text={`${item.stock} adet`} />
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>S: {item.shopifyStock}</span>
              <span className="text-gray-300">|</span>
              <span>T: {item.trendyolStock}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Kritik Seviye",
      accessorKey: "criticalLevel",
      cell: (item: any) => <span>{item.criticalLevel} adet</span>,
    },
    {
      header: "Değer",
      accessorKey: "value",
      cell: (item: any) => <span className="font-medium">₺{(item.stock * item.value).toLocaleString('tr-TR')}</span>,
    },
    {
      header: "Son Güncelleme",
      accessorKey: "lastUpdated",
      cell: (item: any) => (
        <span className="text-gray-500 text-sm">
          {new Date(item.lastUpdated).toLocaleDateString('tr-TR')}
        </span>
      ),
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Stok Güncelle</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Stok Güncelle</DialogTitle>
                <DialogDescription>
                  "{item.name}" ürünü için stok güncelleme yapın.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <RadioGroup
                  defaultValue="add"
                  value={movementType}
                  onValueChange={setMovementType}
                  className="grid grid-cols-3 gap-2"
                >
                  <div>
                    <RadioGroupItem value="add" id="add" className="peer sr-only" />
                    <Label
                      htmlFor="add"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <PackageOpen className="mb-2 h-5 w-5 text-primary" />
                      Stok Giriş
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="remove" id="remove" className="peer sr-only" />
                    <Label
                      htmlFor="remove"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <PackageOpen className="mb-2 h-5 w-5 rotate-180 text-red-500" />
                      Stok Çıkış
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="adjust" id="adjust" className="peer sr-only" />
                    <Label
                      htmlFor="adjust"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <RefreshCw className="mb-2 h-5 w-5 text-amber-500" />
                      Stok Düzelt
                    </Label>
                  </div>
                </RadioGroup>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Select
                    value={platform}
                    onValueChange={setPlatform}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Platform Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Platformlar</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="trendyol">Trendyol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    {movementType === "adjust" ? "Yeni Stok" : "Miktar"}
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    defaultValue={movementType === "adjust" ? item.stock.toString() : "1"}
                    min={0}
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="reference" className="text-right">
                    Referans
                  </Label>
                  <Input
                    id="reference"
                    placeholder="Sipariş/Fatura No"
                    className="col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notlar
                  </Label>
                  <Input
                    id="notes"
                    placeholder="Opsiyonel"
                    className="col-span-2"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Stok Güncelle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link to={`/products/${item.id}`}>
            <Button variant="ghost" size="sm">Detaylar</Button>
          </Link>
        </div>
      ),
    },
  ];

  const movementColumns = [
    {
      header: "Tarih",
      accessorKey: "date",
      cell: (item: any) => new Date(item.date).toLocaleString('tr-TR')
    },
    {
      header: "Ürün",
      accessorKey: "product",
      cell: (item: any) => (
        <div>
          <div className="font-medium">{item.product}</div>
          <div className="text-xs text-gray-500">{item.sku}</div>
        </div>
      )
    },
    {
      header: "İşlem",
      accessorKey: "type",
      cell: (item: any) => {
        let status: any = "success";
        let text = "Giriş";
        
        if (item.type === "remove") {
          status = "error";
          text = "Çıkış";
        } else if (item.type === "transfer") {
          status = "info";
          text = "Transfer";
        }
        
        return <StatusBadge status={status} text={text} />;
      }
    },
    {
      header: "Miktar",
      accessorKey: "quantity",
      cell: (item: any) => (
        <span className={`font-medium ${
          item.type === "add" ? "text-emerald-600" : 
          item.type === "remove" ? "text-red-600" : 
          "text-blue-600"
        }`}>
          {item.type === "add" ? "+" : 
           item.type === "remove" ? "-" : 
           "↔"}{item.quantity}
        </span>
      )
    },
    {
      header: "Platform",
      accessorKey: "platform",
    },
    {
      header: "Referans",
      accessorKey: "reference",
      cell: (item: any) => (
        <span className="text-primary font-medium">{item.reference}</span>
      )
    },
    {
      header: "Kullanıcı",
      accessorKey: "user",
    }
  ];

  // Filtreler
  const filters = [
    {
      id: "platform",
      label: "Platform",
      options: [
        { id: "shopify", label: "Shopify", value: "shopify" },
        { id: "trendyol", label: "Trendyol", value: "trendyol" },
        { id: "common", label: "Her İkisi", value: "common" },
      ],
    },
    {
      id: "stock",
      label: "Stok Durumu",
      options: [
        { id: "instock", label: "Stokta", value: "instock" },
        { id: "lowstock", label: "Kritik Stok", value: "lowstock" },
        { id: "outofstock", label: "Tükendi", value: "outofstock" },
      ],
    },
    {
      id: "category",
      label: "Kategori",
      options: [
        { id: "electronics", label: "Elektronik", value: "electronics" },
        { id: "clothing", label: "Giyim", value: "clothing" },
        { id: "home", label: "Ev & Yaşam", value: "home" },
        { id: "beauty", label: "Kozmetik", value: "beauty" },
      ],
    },
  ];

  const handleFilterChange = (groupId: string, values: string[]) => {
    console.log(`Filter ${groupId} changed:`, values);
    // Burada gerçek filtreleme mantığı olacak
  };

  // Stok hareket formundaki alanlar
  const [quantity, setQuantity] = useState(1);
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [product, setProduct] = useState("");

  // RENK PALETİ
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PageLayout>
      <PageHeader
        title="Stok Yönetimi"
        description="Ürün stoklarınızı takip edin ve yönetin"
        icon={Database}
        actions={
          <>
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Toplu Stok Yükle
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <FileInput className="w-4 h-4" />
              Stok Sayım
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Stok Hareketi
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Stok Hareketi</DialogTitle>
                  <DialogDescription>
                    Stok giriş, çıkış veya transfer işlemi yapın.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <RadioGroup
                    defaultValue="add"
                    value={movementType}
                    onValueChange={setMovementType}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div>
                      <RadioGroupItem value="add" id="movement-add" className="peer sr-only" />
                      <Label
                        htmlFor="movement-add"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <PackageOpen className="mb-2 h-5 w-5 text-primary" />
                        Stok Giriş
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="remove" id="movement-remove" className="peer sr-only" />
                      <Label
                        htmlFor="movement-remove"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <PackageOpen className="mb-2 h-5 w-5 rotate-180 text-red-500" />
                        Stok Çıkış
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="transfer" id="movement-transfer" className="peer sr-only" />
                      <Label
                        htmlFor="movement-transfer"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <RefreshCw className="mb-2 h-5 w-5 text-blue-500" />
                        Transfer
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="product-select">Ürün</Label>
                    <Select
                      value={product}
                      onValueChange={setProduct}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ürün Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform-from">
                        {movementType === "transfer" ? "Kaynak Platform" : "Platform"}
                      </Label>
                      <Select
                        value={platform}
                        onValueChange={setPlatform}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Platform Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {movementType !== "transfer" && (
                            <SelectItem value="all">Tüm Platformlar</SelectItem>
                          )}
                          <SelectItem value="shopify">Shopify</SelectItem>
                          <SelectItem value="trendyol">Trendyol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {movementType === "transfer" && (
                      <div className="space-y-2">
                        <Label htmlFor="platform-to">Hedef Platform</Label>
                        <Select defaultValue="trendyol">
                          <SelectTrigger>
                            <SelectValue placeholder="Platform Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="shopify">Shopify</SelectItem>
                            <SelectItem value="trendyol">Trendyol</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Miktar</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      min={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">Referans</Label>
                    <Input
                      id="reference"
                      placeholder="Sipariş/Fatura No"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notlar</Label>
                    <Input
                      id="notes"
                      placeholder="Opsiyonel"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">Stok Hareketi Ekle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3 h-auto p-1 bg-gray-100/80">
          <TabsTrigger
            value="overview"
            className="text-sm py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="text-sm py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Ürünler
          </TabsTrigger>
          <TabsTrigger
            value="movements"
            className="text-sm py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Stok Hareketleri
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab İçerikleri */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              title="Toplam Stok"
              value={stockSummary.totalStock.toString()}
              icon={Database}
              className="hover-scale card-gradient"
            />
            <StatCard
              title="Stok Değeri"
              value={`₺${stockSummary.totalValue.toLocaleString('tr-TR')}`}
              icon={Database}
              className="hover-scale card-gradient"
            />
            <StatCard
              title="Kritik Stok"
              value={stockSummary.lowStock.toString()}
              change={`${lowStockProducts.length} ürün`}
              trend="down"
              icon={Database}
              className="hover-scale card-gradient"
            />
            <StatCard
              title="Tükenen Ürünler"
              value={stockSummary.outOfStock.toString()}
              change={`${outOfStockProducts.length} ürün`}
              trend="down"
              icon={Database}
              className="hover-scale card-gradient"
            />
            <StatCard
              title="Stok Devir Hızı"
              value={`${stockSummary.avgTurnover}`}
              change="Aylık ortalama"
              icon={RefreshCw}
              className="hover-scale card-gradient"
            />
          </div>

          {/* Grafik ve Listeler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stok Dağılımı */}
            <Card className="hover-scale overflow-hidden">
              <CardHeader>
                <CardTitle>Stok Dağılımı</CardTitle>
                <CardDescription>Kategorilere göre stok dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {stockDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Dağılım']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stok Devir Hızı */}
            <Card className="hover-scale overflow-hidden">
              <CardHeader>
                <CardTitle>Stok Devir Hızı Trendi</CardTitle>
                <CardDescription>Son 6 aydaki stok devir hızı değişimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockTurnover}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Devir Hızı"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2, r: 4, stroke: "#4f46e5", fill: "white" }}
                        activeDot={{ r: 6, stroke: "#4f46e5", strokeWidth: 2, fill: "white" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kritik ve Tükenen Ürünler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kritik Stok */}
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between py-5">
                <div>
                  <CardTitle>Kritik Stok Ürünleri</CardTitle>
                  <CardDescription>Stok seviyesi düşük ürünler</CardDescription>
                </div>
                <StatusBadge status="warning" text={`${lowStockProducts.length} Ürün`} />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge status="low-stock" text={`${product.stock}/${product.criticalLevel}`} />
                        <div className="text-xs text-gray-500">
                          S: {product.shopifyStock} | T: {product.trendyolStock}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {lowStockProducts.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      Kritik stok seviyesinde ürün bulunmuyor.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">
                  Tümünü Görüntüle
                </Button>
              </CardFooter>
            </Card>

            {/* Tükenen Ürünler */}
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between py-5">
                <div>
                  <CardTitle>Tükenen Ürünler</CardTitle>
                  <CardDescription>Stok seviyesi sıfır olan ürünler</CardDescription>
                </div>
                <StatusBadge status="error" text={`${outOfStockProducts.length} Ürün`} />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outOfStockProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge status="out-of-stock" text="Tükendi" />
                        <div className="text-xs text-gray-500">
                          S: {product.shopifyStock} | T: {product.trendyolStock}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {outOfStockProducts.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      Tükenen ürün bulunmuyor.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">
                  Tümünü Görüntüle
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
            
            <DataTable
              data={products}
              columns={productColumns}
              searchable
              searchField="name"
              pagination
            />
          </div>
        </div>
      )}

      {activeTab === "movements" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center flex-wrap gap-4">
              <FilterBar
                filters={[
                  {
                    id: "movementType",
                    label: "İşlem Tipi",
                    options: [
                      { id: "add", label: "Stok Giriş", value: "add" },
                      { id: "remove", label: "Stok Çıkış", value: "remove" },
                      { id: "transfer", label: "Transfer", value: "transfer" },
                    ],
                  },
                  {
                    id: "platform",
                    label: "Platform",
                    options: [
                      { id: "all", label: "Tüm Platformlar", value: "all" },
                      { id: "shopify", label: "Shopify", value: "shopify" },
                      { id: "trendyol", label: "Trendyol", value: "trendyol" },
                    ],
                  },
                ]}
                onFilterChange={handleFilterChange}
              />
            </div>
            
            <DataTable
              data={stockMovements}
              columns={movementColumns}
              searchable
              searchField="product"
              pagination
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Inventory;
