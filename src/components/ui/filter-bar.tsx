
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export type FilterOption = {
  id: string;
  label: string;
  value: string;
  group?: string;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
};

interface FilterBarProps {
  filters: FilterGroup[];
  onFilterChange: (groupId: string, selectedValues: string[]) => void;
  className?: string;
}

export function FilterBar({ filters, onFilterChange, className }: FilterBarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterSelect = (groupId: string, optionValue: string, multiSelect: boolean = false) => {
    setSelectedFilters((prev) => {
      // Çoklu seçim etkinse mevcut değerlere ekle veya çıkar
      if (multiSelect) {
        const currentValues = prev[groupId] || [];
        const newValues = currentValues.includes(optionValue) 
          ? currentValues.filter(v => v !== optionValue)
          : [...currentValues, optionValue];
        
        const updatedFilters = {
          ...prev,
          [groupId]: newValues
        };
        
        onFilterChange(groupId, newValues);
        return updatedFilters;
      }
      
      // Tek seçim ise değeri değiştir
      const newValues = [optionValue];
      const updatedFilters = {
        ...prev,
        [groupId]: newValues
      };
      
      onFilterChange(groupId, newValues);
      return updatedFilters;
    });
  };

  const getActiveFilterCount = (): number => {
    return Object.values(selectedFilters).reduce(
      (count, values) => count + values.length,
      0
    );
  };

  const clearFilters = () => {
    setSelectedFilters({});
    // Her bir filtre grubu için boş dizi ile callback'i çağır
    filters.forEach(group => {
      onFilterChange(group.id, []);
    });
  };

  const isOptionSelected = (groupId: string, optionValue: string): boolean => {
    return (selectedFilters[groupId] || []).includes(optionValue);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {filters.map((group) => (
        <DropdownMenu key={group.id}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>{group.label}</span>
              {selectedFilters[group.id]?.length > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {selectedFilters[group.id]?.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {group.options.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  className={`flex items-center gap-2 ${
                    isOptionSelected(group.id, option.value) ? "bg-primary/10" : ""
                  }`}
                  onClick={() => handleFilterSelect(group.id, option.value, group.multiSelect)}
                >
                  <div className={`w-4 h-4 border rounded-sm ${
                    isOptionSelected(group.id, option.value) 
                      ? "bg-primary border-primary flex items-center justify-center" 
                      : "border-gray-300"
                  }`}>
                    {isOptionSelected(group.id, option.value) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sıralama</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>İsim (A-Z)</DropdownMenuItem>
          <DropdownMenuItem>İsim (Z-A)</DropdownMenuItem>
          <DropdownMenuItem>Fiyat (Artan)</DropdownMenuItem>
          <DropdownMenuItem>Fiyat (Azalan)</DropdownMenuItem>
          <DropdownMenuItem>Stok (Artan)</DropdownMenuItem>
          <DropdownMenuItem>Stok (Azalan)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {getActiveFilterCount() > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );
}
