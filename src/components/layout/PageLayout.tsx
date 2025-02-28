
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="container p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
