
import { cn } from "@/lib/utils";

type StatusType = 
  | "success" 
  | "warning" 
  | "error" 
  | "info" 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled" 
  | "active" 
  | "inactive" 
  | "out-of-stock" 
  | "low-stock";

interface StatusBadgeProps {
  status: StatusType;
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({ status, text, size = "md", className }: StatusBadgeProps) {
  const getStatusStyles = (): string => {
    switch (status) {
      case "success":
      case "delivered":
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "warning":
      case "pending":
      case "low-stock":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "error":
      case "cancelled":
      case "out-of-stock":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "info":
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (): string => {
    if (text) return text;
    
    switch (status) {
      case "success": return "Başarılı";
      case "warning": return "Uyarı";
      case "error": return "Hata";
      case "info": return "Bilgi";
      case "pending": return "Beklemede";
      case "processing": return "Hazırlanıyor";
      case "shipped": return "Kargoda";
      case "delivered": return "Teslim Edildi";
      case "cancelled": return "İptal Edildi";
      case "active": return "Aktif";
      case "inactive": return "Pasif";
      case "out-of-stock": return "Tükendi";
      case "low-stock": return "Kritik Stok";
      default: return status;
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case "sm": return "text-xs px-2 py-0.5";
      case "lg": return "text-sm px-3 py-1";
      default: return "text-xs px-2.5 py-0.5"; // md
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        getStatusStyles(),
        getSizeClasses(),
        className
      )}
    >
      {getStatusText()}
    </span>
  );
}
