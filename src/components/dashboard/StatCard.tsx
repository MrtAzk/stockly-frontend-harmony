
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
        "relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
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
                "mt-2 text-sm font-medium flex items-center",
                isPositiveValue ? "text-emerald-600" : "text-rose-600"
              )}
            >
              <span className={`inline-flex items-center justify-center rounded-full p-1 mr-1 ${isPositiveValue ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-3 h-3"
                >
                  <path 
                    fillRule="evenodd" 
                    d={isPositiveValue 
                      ? "M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                      : "M10 3a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0v-10.5A.75.75 0 0110 3zm-3.75 6a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75z"
                    } 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
              {isPositiveValue ? "+" : ""}{change}
              {description && <span className="text-gray-500 ml-1 text-xs">{description}</span>}
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-full p-3",
            isPositiveValue 
              ? "bg-gradient-to-br from-emerald-50 to-emerald-100" 
              : "bg-gradient-to-br from-blue-50 to-blue-100"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6",
              isPositiveValue ? "text-emerald-600" : "text-blue-600"
            )}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/5 to-primary/30" />
    </div>
  );
};
