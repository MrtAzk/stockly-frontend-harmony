
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Search } from "lucide-react";

interface CardGridProps<T> {
  data: T[];
  renderCard: (item: T) => React.ReactNode;
  searchable?: boolean;
  searchField?: keyof T;
  pagination?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  className?: string;
}

export function CardGrid<T extends Record<string, any>>({
  data,
  renderCard,
  searchable = false,
  searchField,
  pagination = false,
  pageSize = 12,
  emptyMessage = "Veri bulunamadı.",
  className,
}: CardGridProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Arama işlevi
  const filteredData = searchable && searchField 
    ? data.filter(item => 
        String(item[searchField])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : data;

  // Sayfalama
  const totalPages = pagination ? Math.ceil(filteredData.length / pageSize) : 1;
  const paginatedData = pagination 
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize) 
    : filteredData;

  // Sayfa değiştirme
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {paginatedData.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
          {paginatedData.map((item, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              {renderCard(item)}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center p-8 text-gray-500">
          {emptyMessage}
        </div>
      )}

      {pagination && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Önceki
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <Button 
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sonraki
          </Button>
        </div>
      )}
    </div>
  );
}
