import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, X, Filter } from "lucide-react";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Generate mock data
const generateMockData = () => {
  const nodeLevel2Names = [
    "*Finance & Adm (Patterson)", "*Subaiya Operations (Subaiya)", "*IT Infrastructure (Johnson)",
    "*Global Services (Williams)", "*Product Engineering (Chen)", "*Sales Operations (Garcia)"
  ];
  const nodeLevel3Names = [
    "Patterson, Mr. Mark A", "Subaiya, Ms. Rachel T", "Johnson, Dr. David K",
    "Williams, Mrs. Sarah M", "Chen, Mr. Wei L", "Garcia, Ms. Elena P"
  ];
  const nodeLevel4Names = [
    "Finance Operations", "Budget Planning", "Cost Analysis", "Revenue Management",
    "Expense Tracking", "Asset Management"
  ];
  const nodeLevel5Names = [
    "Team Alpha", "Team Beta", "Team Gamma", "Team Delta", "Team Epsilon", "Team Zeta"
  ];
  const departments = [
    "020535002", "011272362", "020010058", "020010232", "011285001", "020015003",
    "011290045", "020020100", "011295078", "020025150"
  ];
  const fiscalQuarters = ["Q1FY26", "Q2FY26", "Q3FY26", "Q4FY26"];
  const fiscalMonths = [
    "AUG FY2026", "SEP FY2026", "OCT FY2026", "NOV FY2026", "DEC FY2026",
    "JAN FY2026", "FEB FY2026", "MAR FY2026", "APR FY2026", "MAY FY2026"
  ];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    nodeLevel2: nodeLevel2Names[Math.floor(Math.random() * nodeLevel2Names.length)],
    nodeLevel3: nodeLevel3Names[Math.floor(Math.random() * nodeLevel3Names.length)],
    nodeLevel4: nodeLevel4Names[Math.floor(Math.random() * nodeLevel4Names.length)],
    nodeLevel5: nodeLevel5Names[Math.floor(Math.random() * nodeLevel5Names.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    fiscalQuarter: fiscalQuarters[Math.floor(Math.random() * fiscalQuarters.length)],
    fiscalMonth: fiscalMonths[Math.floor(Math.random() * fiscalMonths.length)],
    actualsTotalAmount: Math.floor(Math.random() * 1000000) - 300000,
  }));
};

const mockData = generateMockData();

const filterableColumns = [
  { key: "nodeLevel2", label: "Node Level 2" },
  { key: "nodeLevel3", label: "Node Level 3" },
  { key: "nodeLevel4", label: "Node Level 4" },
  { key: "nodeLevel5", label: "Node Level 5" },
  { key: "department", label: "Department" },
  { key: "fiscalQuarter", label: "Fiscal Quarter" },
  { key: "fiscalMonth", label: "Fiscal Month" },
];

const Reconciliation = () => {
  const navigate = useNavigate();
  const [fiscalYear, setFiscalYear] = useState("FY 2026");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilterColumn, setSelectedFilterColumn] = useState<string>("");
  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  const [tempSelectedValues, setTempSelectedValues] = useState<string[]>([]);

  // Get unique values for selected column
  const getUniqueValues = (columnKey: string) => {
    const values = mockData.map((row) => String(row[columnKey as keyof typeof row]));
    return [...new Set(values)].sort();
  };

  // Filter data based on active filters
  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        return values.includes(String(row[key as keyof typeof row]));
      });
    });
  }, [filters]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return filteredData.reduce((sum, row) => sum + row.actualsTotalAmount, 0);
  }, [filteredData]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const formatCurrency = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return amount < 0 ? `-${formatted}` : formatted;
  };

  const handleApplyFilter = () => {
    if (selectedFilterColumn && tempSelectedValues.length > 0) {
      setFilters((prev) => ({
        ...prev,
        [selectedFilterColumn]: tempSelectedValues,
      }));
    }
    setFilterModalOpen(false);
    setSelectedFilterColumn("");
    setTempSelectedValues([]);
    setFilterSearchTerm("");
    setCurrentPage(1);
  };

  const handleRemoveFilter = (columnKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleColumnSelect = (columnKey: string) => {
    setSelectedFilterColumn(columnKey);
    setTempSelectedValues(filters[columnKey] || []);
    setFilterSearchTerm("");
  };

  const toggleValue = (value: string) => {
    setTempSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const activeFilterCount = Object.values(filters).filter((v) => v.length > 0).length;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-[1600px] px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Fiscal Year Dropdown */}
        <div className="mb-2">
          <Select value={fiscalYear} onValueChange={setFiscalYear}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FY 2025">FY 2025</SelectItem>
              <SelectItem value="FY 2026">FY 2026</SelectItem>
              <SelectItem value="FY 2027">FY 2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-foreground mb-1">
          General Ledger Reconciliation: Fiscal Year {fiscalYear}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          Department-wise GL reconciliation view and analysis
        </p>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Action:</span>
            <button className="text-primary hover:underline flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Refresh data
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtered:</span>
            {activeFilterCount === 0 ? (
              <span className="text-sm text-muted-foreground">No Filters</span>
            ) : (
              <span className="text-sm font-medium">{activeFilterCount} filter(s)</span>
            )}
          </div>

          {/* Active Filter Badges */}
          {Object.entries(filters).map(([key, values]) => {
            if (values.length === 0) return null;
            const column = filterableColumns.find((c) => c.key === key);
            return (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1"
              >
                {column?.label}: {values.length} selected
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => handleRemoveFilter(key)}
                />
              </Badge>
            );
          })}

          {/* Filter Button */}
          <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-3 w-3 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Data</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Step 1: Select Column */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Field</label>
                  <Select value={selectedFilterColumn} onValueChange={handleColumnSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a field to filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterableColumns.map((col) => (
                        <SelectItem key={col.key} value={col.key}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Step 2: Select Values */}
                {selectedFilterColumn && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Values</label>
                    <Input
                      placeholder="Search values..."
                      value={filterSearchTerm}
                      onChange={(e) => setFilterSearchTerm(e.target.value)}
                      className="mb-2"
                    />
                    <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-1">
                      {getUniqueValues(selectedFilterColumn)
                        .filter((v) =>
                          v.toLowerCase().includes(filterSearchTerm.toLowerCase())
                        )
                        .map((value) => (
                          <div key={value} className="flex items-center gap-2">
                            <Checkbox
                              id={value}
                              checked={tempSelectedValues.includes(value)}
                              onCheckedChange={() => toggleValue(value)}
                            />
                            <label htmlFor={value} className="text-sm cursor-pointer">
                              {value}
                            </label>
                          </div>
                        ))}
                    </div>
                    {tempSelectedValues.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {tempSelectedValues.map((v) => (
                          <Badge key={v} variant="secondary" className="text-xs">
                            {v}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer"
                              onClick={() => toggleValue(v)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTempSelectedValues([]);
                    setFilterSearchTerm("");
                  }}
                >
                  Clear
                </Button>
                <Button onClick={handleApplyFilter}>Apply</Button>
              </div>
            </DialogContent>
          </Dialog>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAllFilters}
              className="text-destructive hover:text-destructive"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Data Table */}
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#032D4D] hover:bg-[#032D4D]">
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Node Level 2
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Node Level 3
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Node Level 4
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Node Level 5
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Department
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Fiscal Quarter
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap">
                    Fiscal Month
                  </TableHead>
                  <TableHead className="text-white text-xs font-medium whitespace-nowrap text-right">
                    Actuals Total Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-muted/30"}
                  >
                    <TableCell className="text-xs whitespace-nowrap">{row.nodeLevel2}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{row.nodeLevel3}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{row.nodeLevel4}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{row.nodeLevel5}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{row.department}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{row.fiscalQuarter}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{row.fiscalMonth}</TableCell>
                    <TableCell
                      className={`text-xs whitespace-nowrap text-right font-medium ${
                        row.actualsTotalAmount < 0 ? "text-destructive" : ""
                      }`}
                    >
                      {formatCurrency(row.actualsTotalAmount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Sticky Footer with Total */}
          <div className="bg-primary/10 border-t border-border px-4 py-3 flex justify-between items-center">
            <span className="text-sm font-semibold">Total Amount</span>
            <span className="text-sm font-bold">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(val) => {
                setItemsPerPage(Number(val));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px] h-8 text-xs">
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} ({filteredData.length} records)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reconciliation;
