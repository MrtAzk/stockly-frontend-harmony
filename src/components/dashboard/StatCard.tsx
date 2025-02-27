
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  isPositive,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h3>
          {change && (
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                isPositive ? "text-success" : "text-error"
              )}
            >
              {isPositive ? "+" : "-"} {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-full p-3",
            isPositive ? "bg-success/10" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6",
              isPositive ? "text-success" : "text-primary"
            )}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/5 to-primary/20" />
    </div>
  );
};

