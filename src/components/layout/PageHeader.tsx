
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  actions, 
  icon: Icon, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4", className)}>
      <div className="flex items-center">
        {Icon && (
          <div className="mr-3 p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
