
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label?: string;
  title?: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  description?: string;
  isPositive?: boolean;
  className?: string;
}

export const StatCard = ({
  icon: Icon,
  label,
  title,
  value,
  change,
  trend,
  description,
  isPositive,
  className,
}: StatCardProps) => {
  // Eğer trend belirtilmişse bunu isPositive olarak kullan
  const isPositiveValue = trend ? trend === "up" : isPositive;
  // title veya label kullan - geriye uyumluluk için
  const displayLabel = title || label;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{displayLabel}</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h3>
          {change && (
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                isPositiveValue ? "text-success" : "text-error"
              )}
            >
              {isPositiveValue ? "+" : "-"} {change}
              {description && <span className="text-gray-500 ml-1 text-xs">{description}</span>}
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-full p-3",
            isPositiveValue ? "bg-success/10" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6",
              isPositiveValue ? "text-success" : "text-primary"
            )}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/5 to-primary/20" />
    </div>
  );
};
