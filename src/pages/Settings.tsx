
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("tr");
  
  // Mock kullanıcı verisi
  const user = {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    role: "admin",
    avatar: "/placeholder.svg",
    createdAt: "2023-01-15T10:00:00",
    lastLogin: "2023-06-15T09:30:00"
  };

  // Mock kullanıcı listesi
  const users = [
    {
      id: "1",
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2023-06-15T09:30:00"
    },
    {
      id: "2",
      name: "Mehmet Demir",
      email: "mehmet@example.com",
      role: "manager",
      status: "active",
      lastLogin: "2023-06-14T14:15:00"
    },
    {
      id: "3",
      name: "Ayşe Kaya",
      email: "ayse@example.com",
      role: "editor",
      status: "inactive",
      lastLogin: "2023-06-10T11:45:00"
    }
  ];

  // Kullanıcı tablosu sütunları
  const userColumns = [
    {
      header: "Kullanıcı",
      accessorKey: "name",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      header: "Rol",
      accessorKey: "role",
      cell: (item: any) => {
        const roleName = 
          item.role === "admin" ? "Yönetici" :
          item.role === "manager" ? "Müdür" :
          item.role === "editor" ? "Editör" : item.role;
        
        return <span className="capitalize">{roleName}</span>;
      }
    },
    {
      header: "Durum",
      accessorKey: "status",
      cell: (item: any) => (
        <StatusBadge 
          status={item.status === "active" ? "active" : "inactive" as any}
          text={item.status === "active" ? "Aktif" : "Pasif"}
        />
      )
    },
    {
      header: "Son Giriş",
      accessorKey: "lastLogin",
      cell: (item: any) => new Date(item.lastLogin).toLocaleString('tr-TR')
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">Düzenle</Button>
          <Button 
            size="sm" 
            variant="outline"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Kaldır
          </Button>
        </div>
      )
    }
  ];

  // API Anahtarları
  const apiKeys = [
    {
      id: "api_1",
      name: "Web Uygulaması",
      key: "sk_test_••••••••••••••••••••••••",
      created: "2023-05-10T10:00:00",
      lastUsed: "2023-06-15T08:45:00",
      status: "active"
    },
    {
      id: "api_2",
      name: "Mobil Uygulama",
      key: "sk_test_••••••••••••••••••••••••",
      created: "2023-05-12T14:30:00",
      lastUsed: "2023-06-14T16:20:00",
      status: "active"
    }
  ];

  // API Anahtarları tablosu sütunları
  const apiKeyColumns = [
    {
      header: "API Anahtarı",
      accessorKey: "name",
      cell: (item: any) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-xs text-gray-500">{item.key}</div>
        </div>
      )
    },
    {
      header: "Oluşturulma",
      accessorKey: "created",
      cell: (item: any) => new Date(item.created).toLocaleDateString('tr-TR')
    },
    {
      header: "Son Kullanım",
      accessorKey: "lastUsed",
      cell: (item: any) => new Date(item.lastUsed).toLocaleString('tr-TR')
    },
    {
      header: "Durum",
      accessorKey: "status",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Switch id={`api-${item.id}`} defaultChecked={item.status === "active"} />
          <Label htmlFor={`api-${item.id}`}>
            {item.status === "active" ? "Aktif" : "Pasif"}
          </Label>
        </div>
      )
    },
    {
      header: "İşlemler",
      accessorKey: "actions",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">Göster</Button>
          <Button 
            size="sm" 
            variant="outline"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Sil
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="Ayarlar"
        description="Hesap ve uygulama ayarlarını yönetin"
        icon={SettingsIcon}
      />

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Kullanıcılar</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline">Görünüm</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">Bildirimler</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">Güvenlik</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span className="hidden md:inline">API</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>
                  Profil bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-4">
                      Fotoğraf Değiştir
                    </Button>
                  </div>
                  <div className="md:w-3/4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" defaultValue={user.email} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rol</Label>
                      <Select defaultValue={user.role} disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Rol Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Yönetici</SelectItem>
                          <SelectItem value="manager">Müdür</SelectItem>
                          <SelectItem value="editor">Editör</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">Rol değişikliği için yöneticinize başvurun</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Profili Güncelle</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Kullanıcı Yönetimi</CardTitle>
                <CardDescription>
                  Sistem kullanıcılarını yönetin
                </CardDescription>
              </div>
              <Button size="sm">
                Yeni Kullanıcı
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                data={users}
                columns={userColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Ayarları</CardTitle>
              <CardDescription>
                Uygulama görünümünü özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Koyu Mod</Label>
                  <p className="text-sm text-gray-500">Kullanıcı arayüzünü koyu tema olarak görüntüleyin</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="language">Dil</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Dil Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="date-format">Tarih Formatı</Label>
                <Select defaultValue="dd/MM/yyyy">
                  <SelectTrigger>
                    <SelectValue placeholder="Format Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Zaman Dilimi</Label>
                <Select defaultValue="Europe/Istanbul">
                  <SelectTrigger>
                    <SelectValue placeholder="Zaman Dilimi Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Istanbul">İstanbul (UTC+3)</SelectItem>
                    <SelectItem value="Europe/London">Londra (UTC+0/1)</SelectItem>
                    <SelectItem value="America/New_York">New York (UTC-5/4)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Ayarları Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Bildirim tercihlerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">E-posta Bildirimleri</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-stock">Stok Uyarıları</Label>
                    <Switch id="email-stock" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-orders">Yeni Siparişler</Label>
                    <Switch id="email-orders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reports">Haftalık Raporlar</Label>
                    <Switch id="email-reports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-system">Sistem Bildirimleri</Label>
                    <Switch id="email-system" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Uygulama İçi Bildirimler</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-stock">Stok Uyarıları</Label>
                    <Switch id="app-stock" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-orders">Yeni Siparişler</Label>
                    <Switch id="app-orders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-price">Fiyat Değişiklikleri</Label>
                    <Switch id="app-price" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-sync">Senkronizasyon Uyarıları</Label>
                    <Switch id="app-sync" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Bildirim Kriterleri</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock-threshold" className="col-span-2">
                      Kritik Stok Eşiği
                    </Label>
                    <Input
                      id="stock-threshold"
                      type="number"
                      className="col-span-2"
                      defaultValue="5"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price-percent" className="col-span-2">
                      Fiyat Değişimi Yüzdesi
                    </Label>
                    <Input
                      id="price-percent"
                      type="number"
                      className="col-span-2"
                      defaultValue="10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Ayarları Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Şifre Değiştirme</CardTitle>
                <CardDescription>
                  Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mevcut Şifre</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Yeni Şifre</Label>
                  <Input id="new-password" type="password" />
                  <p className="text-xs text-gray-500">En az 8 karakter, büyük-küçük harf ve rakam içermeli</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Şifre Değiştir</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>İki Faktörlü Kimlik Doğrulama</CardTitle>
                <CardDescription>
                  Hesabınızı daha güvenli hale getirin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">İki Faktörlü Kimlik Doğrulama</Label>
                    <p className="text-sm text-gray-500">Her girişte SMS veya uygulama ile doğrulama yapın</p>
                  </div>
                  <Switch id="2fa" />
                </div>
                
                <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                  <p className="text-sm">İki faktörlü kimlik doğrulama aktif değil. Hesabınızı daha güvenli hale getirmek için bu özelliği aktifleştirin.</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Aktifleştir
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Oturum Geçmişi</CardTitle>
                <CardDescription>
                  Hesabınıza giriş yapılan cihazları görüntüleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Windows PC - Chrome</div>
                      <div className="text-sm text-gray-500">İstanbul, Türkiye • 192.168.1.1</div>
                      <div className="text-xs text-gray-400">Son giriş: 15 Haziran 2023, 09:30</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mr-2">Şu an aktif</span>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        Oturumu Kapat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">iPhone - Safari</div>
                      <div className="text-sm text-gray-500">İstanbul, Türkiye • 192.168.1.2</div>
                      <div className="text-xs text-gray-400">Son giriş: 14 Haziran 2023, 16:45</div>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        Oturumu Kapat
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Tüm Oturumları Kapat
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Anahtarları</CardTitle>
                <CardDescription>
                  API erişim anahtarlarınızı yönetin
                </CardDescription>
              </div>
              <Button size="sm">
                Yeni API Anahtarı
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                data={apiKeys}
                columns={apiKeyColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
