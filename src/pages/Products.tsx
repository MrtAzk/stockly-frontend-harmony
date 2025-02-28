
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Box, Download, Filter, Grid3X3, ListFilter, Package, Plus, RefreshCw, TableProperties, Upload } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { CardGrid } from "@/components/ui/card-grid";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FilterBar } from "@/components/ui/filter-bar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Products = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Mock kategoriler
  const categories = [
    { id: "all", name: "Tüm Kategoriler" },
    { id: "electronics", name: "Elektronik" },
    { id: "clothing", name: "Giyim" },
    { id: "home", name: "Ev & Yaşam" },
    { id: "beauty", name: "Kozmetik" },
  ];

  // Mock filtreler
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
      id: "status",
      label: "Durum",
      options: [
        { id: "active", label: "Aktif", value: "active" },
        { id: "inactive", label: "Pasif", value: "inactive" },
      ],
    },
  ];

  // Mock ürün verileri
  const products = [
    {
      id: "1",
      name: "Akıllı Telefon XS",
      sku: "PHN-XS-128",
      image: "/placeholder.svg",
      category: "electronics",
      stock: 45,
      shopifyStock: 40,
      trendyolStock: 5,
      price: 12999,
      status: "active",
      lastUpdated: "2023-06-15T14:30:00",
    },
    {
      id: "2",
      name: "Kablosuz Kulaklık",
      sku: "AUD-WL-001",
      image: "/placeholder.svg",
      category: "electronics",
      stock: 3,
      shopifyStock: 2,
      trendyolStock: 1,
      price: 1299,
      status: "active",
      lastUpdated: "2023-06-14T12:15:00",
    },
    {
      id: "3",
      name: "Tablet Bilgisayar",
      sku: "TAB-X-64",
      image: "/placeholder.svg",
      category: "electronics",
      stock: 0,
      shopifyStock: 0,
      trendyolStock: 0,
      price: 5999,
      status: "inactive",
      lastUpdated: "2023-06-12T10:45:00",
    },
    {
      id: "4",
      name: "Bluetooth Hoparlör",
      sku: "SPK-BT-002",
      image: "/placeholder.svg",
      category: "electronics",
      stock: 15,
      shopifyStock: 10,
      trendyolStock: 5,
      price: 899,
      status: "active",
      lastUpdated: "2023-06-10T16:20:00",
    },
    {
      id: "5",
      name: "Pamuklu T-Shirt",
      sku: "CLT-TS-M",
      image: "/placeholder.svg",
      category: "clothing",
      stock: 85,
      shopifyStock: 65,
      trendyolStock: 20,
      price: 199,
      status: "active",
      lastUpdated: "2023-06-14T09:30:00",
    },
    {
      id: "6",
      name: "Kot Pantolon",
      sku: "CLT-JP-32",
      image: "/placeholder.svg",
      category: "clothing",
      stock: 42,
      shopifyStock: 30,
      trendyolStock: 12,
      price: 399,
      status: "active",
      lastUpdated: "2023-06-13T11:15:00",
    }
  ];

  // Kategoriye göre filtreleme
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
      header: "Stok",
      accessorKey: "stock",
      cell: (item: any) => {
        let status: any = "success";
        if (item.stock <= 0) status = "out-of-stock";
        else if (item.stock <= 5) status = "low-stock";
        
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
      header: "Kategori",
      accessorKey: "category",
      cell: (item: any) => {
        const categoryName = 
          item.category === "electronics" ? "Elektronik" :
          item.category === "clothing" ? "Giyim" :
          item.category === "home" ? "Ev & Yaşam" :
          item.category === "beauty" ? "Kozmetik" : item.category;
        
        return <Badge variant="secondary">{categoryName}</Badge>;
      },
    },
    {
      header: "Fiyat",
      accessorKey: "price",
      cell: (item: any) => <span className="font-medium">₺{item.price.toLocaleString('tr-TR')}</span>,
    },
    {
      header: "Durum",
      accessorKey: "status",
      cell: (item: any) => (
        <StatusBadge 
          status={item.status === "active" ? "active" : "inactive" as any}
          text={item.status === "active" ? "Aktif" : "Pasif"}
        />
      ),
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
          <Link to={`/products/${item.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem>Stok Güncelle</DropdownMenuItem>
              <DropdownMenuItem>Senkronize Et</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={item.status === "active" ? "text-orange-500" : "text-green-500"}>
                {item.status === "active" ? "Pasife Al" : "Aktife Al"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Sil</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  // Filtre değişiklik işleyicisi
  const handleFilterChange = (groupId: string, values: string[]) => {
    console.log(`Filter ${groupId} changed:`, values);
    // Burada gerçek filtreleme mantığı olacak
  };

  return (
    <PageLayout>
      <PageHeader
        title="Ürünler"
        description="Tüm ürünlerinizi görüntüleyin ve yönetin"
        icon={Package}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              İçe Aktar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Dışa Aktar
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Yeni Ürün
            </Button>
          </>
        }
      />

      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-wrap h-auto p-1 bg-gray-100/80">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setViewMode("table")}
            >
              <TableProperties className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0"
              onClick={() => console.log("Yenile")}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          className="py-2"
        />
      </div>

      {viewMode === "table" ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <DataTable
            data={filteredProducts}
            columns={productColumns}
            searchable
            searchField="name"
            pagination
            pageSize={10}
            onRowClick={(item) => console.log(`Row clicked: ${item.id}`)}
          />
        </div>
      ) : (
        <CardGrid
          data={filteredProducts}
          renderCard={(product) => (
            <Card className="hover:shadow-md transition-shadow overflow-hidden">
              <div className="aspect-square w-full overflow-hidden bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                  <StatusBadge 
                    status={product.status === "active" ? "active" : "inactive" as any}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-3">{product.sku}</p>
                
                <div className="flex justify-between items-baseline mb-3">
                  <div className="text-sm font-semibold">₺{product.price.toLocaleString('tr-TR')}</div>
                  
                  <div className="text-xs">
                    {product.stock <= 0 ? (
                      <span className="text-red-500 font-medium">Tükendi</span>
                    ) : product.stock <= 5 ? (
                      <span className="text-amber-500 font-medium">Son {product.stock} adet</span>
                    ) : (
                      <span className="text-emerald-500 font-medium">{product.stock} adet</span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Badge variant="outline" className="h-5 px-1.5 text-xs">S</Badge>
                    <span className="ml-1">{product.shopifyStock} adet</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="h-5 px-1.5 text-xs">T</Badge>
                    <span className="ml-1">{product.trendyolStock} adet</span>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="p-2 flex justify-between">
                <Link to={`/products/${product.id}`} className="w-full">
                  <Button variant="ghost" size="sm" className="w-full">
                    Detaylar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )}
          searchable
          searchField="name"
          pagination
          pageSize={12}
          className="pb-8"
        />
      )}
    </PageLayout>
  );
};

export default Products;
