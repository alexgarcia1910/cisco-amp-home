import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RefreshCw,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ArrowLeft,
} from "lucide-react";

// Mock data for GL transactions
const generateMockData = () => {
  const nodeLevel2Options = ["Global", "Americas", "EMEA", "APJC"];
  const nodeLevel3Options = ["Enterprise", "Commercial", "Service Provider", "Public Sector"];
  const nodeLevel4Options = ["Sales", "Engineering", "Operations", "Finance", "Marketing"];
  const nodeLevel5Options = ["Team A", "Team B", "Team C", "Team D", "Team E"];
  const deptCodes = ["1001", "1002", "1003", "2001", "2002", "3001", "3002", "4001"];
  const fiscalQuarters = ["Q1FY26", "Q2FY26", "Q3FY26", "Q4FY26"];
  const fiscalPeriods = ["JUL FY2026", "AUG FY2026", "SEP FY2026", "OCT FY2026", "NOV FY2026", "DEC FY2026"];
  const glTypes = ["Amortization", "Depreciation", "Accrual", "Reversal", "Transfer"];
  const poNumbers = ["ESP000EP001", "ESP000EP002", "AUT000DE001", "GBR000UK001", "DEU000DE002"];
  const accounts = ["50100", "50200", "50300", "60100", "60200", "70100"];
  const deptNames = ["CX EMEA Sales", "CX EMEA Engineering", "CX Americas Ops", "CX APJC Finance", "CX Global Marketing"];
  const accountDescs = ["Software License", "Hardware Maintenance", "Electronically Delivered", "Cloud Services", "Professional Services"];

  return Array.from({ length: 100 }, (_, i) => ({
    id: `gl-${i + 1}`,
    nodeLevel2: nodeLevel2Options[Math.floor(Math.random() * nodeLevel2Options.length)],
    nodeLevel3: nodeLevel3Options[Math.floor(Math.random() * nodeLevel3Options.length)],
    nodeLevel4: nodeLevel4Options[Math.floor(Math.random() * nodeLevel4Options.length)],
    nodeLevel5: nodeLevel5Options[Math.floor(Math.random() * nodeLevel5Options.length)],
    deptCode: deptCodes[Math.floor(Math.random() * deptCodes.length)],
    fiscalQuarter: fiscalQuarters[Math.floor(Math.random() * fiscalQuarters.length)],
    fiscalPeriod: fiscalPeriods[Math.floor(Math.random() * fiscalPeriods.length)],
    glTransactionType: glTypes[Math.floor(Math.random() * glTypes.length)],
    poNumber: poNumbers[Math.floor(Math.random() * poNumbers.length)],
    account: accounts[Math.floor(Math.random() * accounts.length)],
    deptName: deptNames[Math.floor(Math.random() * deptNames.length)],
    accountDesc: accountDescs[Math.floor(Math.random() * accountDescs.length)],
  }));
};

const mockData = generateMockData();

const columns = [
  { key: "nodeLevel2", label: "Node Level 2" },
  { key: "nodeLevel3", label: "Node Level 3" },
  { key: "nodeLevel4", label: "Node Level 4" },
  { key: "nodeLevel5", label: "Node Level 5" },
  { key: "deptCode", label: "Department Code" },
  { key: "fiscalQuarter", label: "Fiscal Quarter" },
  { key: "fiscalPeriod", label: "Fiscal Period" },
  { key: "glTransactionType", label: "GL Transaction Type" },
  { key: "poNumber", label: "PO Number" },
  { key: "account", label: "Account" },
  { key: "deptName", label: "Department Name" },
  { key: "accountDesc", label: "Account Description" },
];

const GLDataView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gl-transactions");
  const [fiscalYear, setFiscalYear] = useState("FY2026");
  const [columnSearches, setColumnSearches] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [openFilterPopover, setOpenFilterPopover] = useState<string | null>(null);
  const [filterSearch, setFilterSearch] = useState("");

  // Get unique values for each column
  const getColumnOptions = (columnKey: string) => {
    const values = mockData.map((row) => row[columnKey as keyof typeof row]);
    return [...new Set(values)].sort();
  };

  // Filter data based on column searches and active filters
  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      // Check column searches
      for (const [key, searchValue] of Object.entries(columnSearches)) {
        if (searchValue) {
          const cellValue = String(row[key as keyof typeof row]).toLowerCase();
          if (!cellValue.includes(searchValue.toLowerCase())) {
            return false;
          }
        }
      }
      // Check active filters
      for (const [key, filterValues] of Object.entries(activeFilters)) {
        if (filterValues.length > 0) {
          const cellValue = String(row[key as keyof typeof row]);
          if (!filterValues.includes(cellValue)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [columnSearches, activeFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleColumnSearch = (columnKey: string, value: string) => {
    setColumnSearches((prev) => ({ ...prev, [columnKey]: value }));
    setCurrentPage(1);
  };

  const toggleFilter = (columnKey: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[columnKey] || [];
      if (current.includes(value)) {
        return { ...prev, [columnKey]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [columnKey]: [...current, value] };
      }
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setColumnSearches({});
    setCurrentPage(1);
  };

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => row.id));
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some((f) => f.length > 0) ||
    Object.values(columnSearches).some((s) => s !== "");

  const getActiveFilterCount = () => {
    let count = 0;
    for (const values of Object.values(activeFilters)) {
      count += values.length;
    }
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        {/* Header with FY dropdown and title */}
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Select value={fiscalYear} onValueChange={setFiscalYear}>
              <SelectTrigger className="w-[120px] h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FY2025">FY 2025</SelectItem>
                <SelectItem value="FY2026">FY 2026</SelectItem>
                <SelectItem value="FY2027">FY 2027</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <h1 className="text-xl font-semibold text-card-foreground">
            General Ledger: Fiscal Year {fiscalYear.replace("FY", "")}
          </h1>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="gl-transactions" className="data-[state=active]:bg-card">
              GL transactions
            </TabsTrigger>
            <TabsTrigger value="asset-depreciation" className="data-[state=active]:bg-card">
              Asset Depreciation
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
            <RefreshCw className="h-4 w-4" />
            Refresh data
          </button>
          <Button size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-4 p-3 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              Filtered: {hasActiveFilters ? `${getActiveFilterCount()} filter(s)` : "No Filters"}
            </span>
            {Object.entries(activeFilters).map(([key, values]) =>
              values.map((value) => (
                <Badge
                  key={`${key}-${value}`}
                  variant="secondary"
                  className="gap-1 bg-primary/10 text-primary"
                >
                  {columns.find((c) => c.key === key)?.label}: {value}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleFilter(key, value)}
                  />
                </Badge>
              ))
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                {/* Column headers with dropdown filters */}
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-3 text-left w-12">
                    <Checkbox
                      checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleAllRows}
                    />
                  </th>
                  {columns.map((column) => (
                    <th key={column.key} className="p-3 text-left font-medium text-card-foreground whitespace-nowrap">
                      <Popover
                        open={openFilterPopover === column.key}
                        onOpenChange={(open) => {
                          setOpenFilterPopover(open ? column.key : null);
                          if (!open) setFilterSearch("");
                        }}
                      >
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-1 hover:text-primary">
                            {column.label}
                            <ChevronDown className="h-4 w-4" />
                            {(activeFilters[column.key]?.length || 0) > 0 && (
                              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                {activeFilters[column.key].length}
                              </span>
                            )}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-0" align="start">
                          <div className="p-2 border-b border-border">
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search..."
                                value={filterSearch}
                                onChange={(e) => setFilterSearch(e.target.value)}
                                className="pl-8 h-8"
                              />
                            </div>
                          </div>
                          <ScrollArea className="h-[200px]">
                            <div className="p-2 space-y-1">
                              {getColumnOptions(column.key)
                                .filter((opt) =>
                                  opt.toLowerCase().includes(filterSearch.toLowerCase())
                                )
                                .map((option) => (
                                  <label
                                    key={option}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 cursor-pointer"
                                  >
                                    <Checkbox
                                      checked={activeFilters[column.key]?.includes(option) || false}
                                      onCheckedChange={() => toggleFilter(column.key, option)}
                                    />
                                    <span className="text-sm">{option}</span>
                                  </label>
                                ))}
                            </div>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                    </th>
                  ))}
                </tr>
                {/* Search boxes row */}
                <tr className="bg-card border-b border-border">
                  <th className="p-2"></th>
                  {columns.map((column) => (
                    <th key={`search-${column.key}`} className="p-2">
                      <Input
                        placeholder="Search..."
                        value={columnSearches[column.key] || ""}
                        onChange={(e) => handleColumnSearch(column.key, e.target.value)}
                        className="h-7 text-xs"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border hover:bg-muted/30 ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="p-3">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    {columns.map((column) => {
                      const cellValue = row[column.key as keyof typeof row];
                      const searchTerm = columnSearches[column.key];
                      const isHighlighted = searchTerm && 
                        String(cellValue).toLowerCase().includes(searchTerm.toLowerCase());
                      
                      return (
                        <td
                          key={column.key}
                          className={`p-3 whitespace-nowrap ${
                            isHighlighted ? "bg-yellow-100" : ""
                          }`}
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Items per page:</span>
              <Select
                value={String(itemsPerPage)}
                onValueChange={(v) => {
                  setItemsPerPage(Number(v));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[80px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 text-sm">Page {currentPage}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLDataView;
