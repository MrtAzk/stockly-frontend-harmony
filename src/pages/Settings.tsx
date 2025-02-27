
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Bell, CreditCard, Globe, Lock, Mail, Save, UserCircle, Users } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    stockAlerts: true,
    salesReport: true,
  });

  const tabs = [
    { id: "profile", label: "Profil", icon: UserCircle },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "security", label: "Güvenlik", icon: Lock },
    { id: "users", label: "Kullanıcılar", icon: Users },
    { id: "integrations", label: "Entegrasyonlar", icon: Globe },
    { id: "billing", label: "Faturalama", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="container p-6">
          <div className="mb-8">
            <h1 className="text-h2 font-semibold text-gray-900">Ayarlar</h1>
            <p className="mt-1 text-gray-500">Hesap ve sistem ayarlarınızı yönetin</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 mb-6 md:mb-0">
              <div className="bg-white rounded-xl shadow-sm p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Profil Bilgileri
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                          AS
                        </div>
                        <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                          Fotoğraf Değiştir
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Ad
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            defaultValue="Ahmet"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Soyad
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            defaultValue="Şahin"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            E-posta Adresi
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            defaultValue="ahmet@sirket.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Telefon
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            defaultValue="+90 555 123 4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Şirket
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          defaultValue="XYZ Elektronik A.Ş."
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Rol
                        </label>
                        <select
                          id="role"
                          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          defaultValue="admin"
                        >
                          <option value="admin">Yönetici</option>
                          <option value="manager">Müdür</option>
                          <option value="user">Kullanıcı</option>
                        </select>
                      </div>

                      <div className="flex justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90 transition-colors">
                          <Save className="w-4 h-4" />
                          <span>Değişiklikleri Kaydet</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Bildirim Ayarları
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-md font-medium text-gray-800 mb-4">
                          Bildirim Kanalları
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  E-posta Bildirimleri
                                </p>
                                <p className="text-sm text-gray-500">
                                  Önemli güncellemeler için e-posta alın
                                </p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.email}
                                onChange={() =>
                                  setNotifications({
                                    ...notifications,
                                    email: !notifications.email,
                                  })
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <Bell className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  Uygulama Bildirimleri
                                </p>
                                <p className="text-sm text-gray-500">
                                  Uygulama içi bildirimler
                                </p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.app}
                                onChange={() =>
                                  setNotifications({
                                    ...notifications,
                                    app: !notifications.app,
                                  })
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-md font-medium text-gray-800 mb-4">
                          Bildirim Türleri
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                Stok Uyarıları
                              </p>
                              <p className="text-sm text-gray-500">
                                Stok kritik seviyeye düştüğünde bildirim alın
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.stockAlerts}
                                onChange={() =>
                                  setNotifications({
                                    ...notifications,
                                    stockAlerts: !notifications.stockAlerts,
                                  })
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                Haftalık Satış Raporu
                              </p>
                              <p className="text-sm text-gray-500">
                                Haftalık performans özeti alın
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.salesReport}
                                onChange={() =>
                                  setNotifications({
                                    ...notifications,
                                    salesReport: !notifications.salesReport,
                                  })
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90 transition-colors">
                          <Save className="w-4 h-4" />
                          <span>Değişiklikleri Kaydet</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab !== "profile" && activeTab !== "notifications" && (
                  <div className="py-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {tabs.find((tab) => tab.id === activeTab)?.label} Sayfası
                    </h3>
                    <p className="text-gray-500">
                      Bu bölüm henüz geliştirme aşamasında
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
