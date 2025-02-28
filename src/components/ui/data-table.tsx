
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Search } from "lucide-react";

interface DataTableColumn<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchable?: boolean;
  searchField?: keyof T;
  onRowClick?: (item: T) => void;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchField,
  onRowClick,
  pagination = false,
  pageSize = 10,
  className,
  emptyMessage = "Veri bulunamadı."
}: DataTableProps<T>) {
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

      <div className={`border rounded-md ${className}`}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIndex) => (
                <TableRow 
                  key={rowIndex} 
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={column.className}>
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] || '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-1">
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
