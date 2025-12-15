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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchableDropdown } from "@/components/SearchableDropdown";
import {
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ArrowLeft,
  Filter,
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
  const softwarePublishers = ["UNKNOWN", "GENUA GMBH", "MICROSOFT", "ORACLE", "SAP", "ADOBE", "SALESFORCE"];
  const glDescriptions = [
    "ESP900EP6215791|EKAHAU OY|Wireless tool to perform activities",
    "AUT350EP5246311|SHI INTERNATIONAL BV|Techsmith Camtasia 2024",
    "DEU000EP6101864|SHI INTERNATIONAL BV|Smartcard Middleware",
    "GBR000EP5764291|GITLAB INC|GitLab SaaS - Premium - 1 Year",
    "ESP900EP6258021|EKAHAU OY|Renewal of my Ekahau Subscription",
    "DEU000EP6322201|SHI INTERNATIONAL BV|PyCharm Professional - License",
  ];

  return Array.from({ length: 100 }, (_, i) => ({
    id: `gl-${i + 1}`,
    softwarePublisher: softwarePublishers[Math.floor(Math.random() * softwarePublishers.length)],
    usdNet: Math.round((Math.random() * 10000 - 5000) * 100) / 100,
    glDescription: glDescriptions[Math.floor(Math.random() * glDescriptions.length)],
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

// Mock data for Asset Depreciation
const generateAssetDepreciationData = () => {
  const assetCategories = ["Software", "Hardware", "Equipment", "Furniture", "Vehicles"];
  const level2Leaders = ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "Robert Wilson"];
  const level3Leaders = ["James Lee", "Lisa Wang", "David Chen", "Amanda White", "Chris Martin"];
  const level4Leaders = ["Tom Anderson", "Jennifer Taylor", "Kevin Moore", "Rachel Green", "Mark Thompson"];
  const level5Leaders = ["Alex Garcia", "Nicole Harris", "Brian Clark", "Stephanie Lewis", "Daniel Walker"];
  const ssTableCodes = ["SW001", "HW002", "EQ003", "FN004", "VH005", "SW006", "HW007"];
  const glPostedFlags = ["Y", "N"];

  return Array.from({ length: 100 }, (_, i) => ({
    id: `asset-${i + 1}`,
    assetCategory: assetCategories[Math.floor(Math.random() * assetCategories.length)],
    assetNumber: `AST${String(100000 + i).padStart(6, "0")}`,
    departmentNumber: `${1000 + Math.floor(Math.random() * 9000)}`,
    purchaseReqNumber: `PR${String(200000 + Math.floor(Math.random() * 100000)).padStart(7, "0")}`,
    poNumber: `PO${String(300000 + Math.floor(Math.random() * 100000)).padStart(7, "0")}`,
    level2Leader: level2Leaders[Math.floor(Math.random() * level2Leaders.length)],
    level3Leader: level3Leaders[Math.floor(Math.random() * level3Leaders.length)],
    level4Leader: level4Leaders[Math.floor(Math.random() * level4Leaders.length)],
    level5Leader: level5Leaders[Math.floor(Math.random() * level5Leaders.length)],
    ssTableCd: ssTableCodes[Math.floor(Math.random() * ssTableCodes.length)],
    glPostedFlag: glPostedFlags[Math.floor(Math.random() * glPostedFlags.length)],
  }));
};

const mockData = generateMockData();
const assetDepreciationData = generateAssetDepreciationData();

const glColumns = [
  { key: "softwarePublisher", label: "Software Publisher" },
  { key: "usdNet", label: "USD Net", isNumeric: true },
  { key: "glDescription", label: "GL Description" },
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

const assetDepreciationColumns = [
  { key: "assetCategory", label: "Asset Category" },
  { key: "assetNumber", label: "Asset #" },
  { key: "departmentNumber", label: "Department #" },
  { key: "purchaseReqNumber", label: "Purchase REQ #" },
  { key: "poNumber", label: "PO #" },
  { key: "level2Leader", label: "Level 2 Leader" },
  { key: "level3Leader", label: "Level 3 Leader" },
  { key: "level4Leader", label: "Level 4 Leader" },
  { key: "level5Leader", label: "Level 5 Leader" },
  { key: "ssTableCd", label: "SS Table CD" },
  { key: "glPostedFlag", label: "GL Posted Flag" },
];

const GLDataView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gl-transactions");
  const [fiscalYear, setFiscalYear] = useState("FY2026");
  
  // GL Transactions state
  const [glSelectedRows, setGlSelectedRows] = useState<string[]>([]);
  const [glCurrentPage, setGlCurrentPage] = useState(1);
  const [glItemsPerPage, setGlItemsPerPage] = useState(100);
  const [glActiveFilters, setGlActiveFilters] = useState<Record<string, string[]>>({});
  
  // Asset Depreciation state
  const [assetSelectedRows, setAssetSelectedRows] = useState<string[]>([]);
  const [assetCurrentPage, setAssetCurrentPage] = useState(1);
  const [assetItemsPerPage, setAssetItemsPerPage] = useState(100);
  const [assetActiveFilters, setAssetActiveFilters] = useState<Record<string, string[]>>({});
  
  // Shared filter modal state
  const [filterSearch, setFilterSearch] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilterField, setSelectedFilterField] = useState<string>("");
  const [pendingFilterValues, setPendingFilterValues] = useState<string[]>([]);

  // Dynamic columns based on active tab
  const currentColumns = activeTab === "gl-transactions" ? glColumns : assetDepreciationColumns;
  const currentData = activeTab === "gl-transactions" ? mockData : assetDepreciationData;
  const currentFilters = activeTab === "gl-transactions" ? glActiveFilters : assetActiveFilters;
  const setCurrentFilters = activeTab === "gl-transactions" ? setGlActiveFilters : setAssetActiveFilters;
  const currentSelectedRows = activeTab === "gl-transactions" ? glSelectedRows : assetSelectedRows;
  const setCurrentSelectedRows = activeTab === "gl-transactions" ? setGlSelectedRows : setAssetSelectedRows;
  const currentPage = activeTab === "gl-transactions" ? glCurrentPage : assetCurrentPage;
  const setCurrentPage = activeTab === "gl-transactions" ? setGlCurrentPage : setAssetCurrentPage;
  const itemsPerPage = activeTab === "gl-transactions" ? glItemsPerPage : assetItemsPerPage;
  const setItemsPerPage = activeTab === "gl-transactions" ? setGlItemsPerPage : setAssetItemsPerPage;

  // Get unique values for each column (as strings for filtering)
  const getColumnOptions = (columnKey: string): string[] => {
    const values = currentData.map((row) => String(row[columnKey as keyof typeof row]));
    return [...new Set(values)].sort();
  };

  // Filter data based on active filters
  const filteredData = useMemo(() => {
    return currentData.filter((row) => {
      for (const [key, filterValues] of Object.entries(currentFilters)) {
        if (filterValues.length > 0) {
          const cellValue = String(row[key as keyof typeof row]);
          if (!filterValues.includes(cellValue)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [currentFilters, currentData]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const toggleFilter = (columnKey: string, value: string) => {
    setCurrentFilters((prev) => {
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
    setCurrentFilters({});
    setCurrentPage(1);
  };

  const toggleRowSelection = (rowId: string) => {
    setCurrentSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const toggleAllRows = () => {
    if (currentSelectedRows.length === paginatedData.length) {
      setCurrentSelectedRows([]);
    } else {
      setCurrentSelectedRows(paginatedData.map((row) => row.id));
    }
  };

  const hasActiveFilters = Object.values(currentFilters).some((f) => f.length > 0);

  const getActiveFilterCount = () => {
    let count = 0;
    for (const values of Object.values(currentFilters)) {
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterModalOpen(true)}
              className="gap-1.5"
            >
              <Filter className="h-4 w-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              {hasActiveFilters ? `${getActiveFilterCount()} filter(s) applied` : "No Filters"}
            </span>
            {Object.entries(currentFilters).map(([key, values]) =>
              values.map((value) => (
                <Badge
                  key={`${key}-${value}`}
                  variant="secondary"
                  className="gap-1 bg-primary/10 text-primary"
                >
                  {currentColumns.find((c) => c.key === key)?.label}: {value}
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

        {/* Filter Modal */}
        <Dialog open={filterModalOpen} onOpenChange={(open) => {
          setFilterModalOpen(open);
          if (!open) {
            setSelectedFilterField("");
            setPendingFilterValues([]);
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Filter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Field</label>
                <Select 
                  value={selectedFilterField} 
                  onValueChange={(value) => {
                    setSelectedFilterField(value);
                    setPendingFilterValues(currentFilters[value] || []);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a field" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {currentColumns.map((column) => (
                      <SelectItem key={column.key} value={column.key}>
                        {column.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedFilterField && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Value(s)</label>
                  <div className="relative mb-2">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search values..."
                      value={filterSearch}
                      onChange={(e) => setFilterSearch(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <ScrollArea className="border border-border rounded-lg h-48">
                    <div className="p-2 space-y-1">
                      {getColumnOptions(selectedFilterField)
                        .filter((opt) => opt.toLowerCase().includes(filterSearch.toLowerCase()))
                        .map((value) => (
                          <label 
                            key={value} 
                            className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded"
                          >
                            <Checkbox 
                              checked={pendingFilterValues.includes(value)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setPendingFilterValues([...pendingFilterValues, value]);
                                } else {
                                  setPendingFilterValues(pendingFilterValues.filter(v => v !== value));
                                }
                              }}
                            />
                            <span className="text-sm">{value}</span>
                          </label>
                        ))}
                    </div>
                  </ScrollArea>
                  {pendingFilterValues.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pendingFilterValues.map((value) => (
                        <Badge
                          key={value}
                          variant="secondary"
                          className="gap-1 bg-primary/10 text-primary"
                        >
                          {value}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => setPendingFilterValues(pendingFilterValues.filter(v => v !== value))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => {
                setFilterModalOpen(false);
                setSelectedFilterField("");
                setPendingFilterValues([]);
              }}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (selectedFilterField && pendingFilterValues.length > 0) {
                    setCurrentFilters(prev => ({
                      ...prev,
                      [selectedFilterField]: pendingFilterValues
                    }));
                    setCurrentPage(1);
                  }
                  setFilterModalOpen(false);
                  setSelectedFilterField("");
                  setPendingFilterValues([]);
                }}
                disabled={!selectedFilterField || pendingFilterValues.length === 0}
              >
                Apply Filter
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Data Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                {/* Column headers */}
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-3 text-left w-12">
                    <Checkbox
                      checked={currentSelectedRows.length === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleAllRows}
                    />
                  </th>
                  {currentColumns.map((column) => (
                    <th 
                      key={column.key} 
                      className={`p-3 font-medium text-card-foreground whitespace-nowrap ${column.key === 'usdNet' ? 'text-right' : 'text-left'}`}
                    >
                      {column.label}
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
                        checked={currentSelectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    {currentColumns.map((column) => {
                      const cellValue = row[column.key as keyof typeof row] as string | number;
                      const isNumeric = column.key === 'usdNet';
                      
                      return (
                        <td
                          key={column.key}
                          className={`p-3 whitespace-nowrap cursor-pointer hover:bg-primary/10 ${isNumeric ? 'text-right' : ''}`}
                          onClick={() => navigate(`/gldataview/${row.poNumber}`)}
                        >
                          {isNumeric && typeof cellValue === 'number'
                            ? cellValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              {/* Sticky footer row with total - only for GL transactions */}
              {activeTab === "gl-transactions" && (
                <tfoot className="sticky bottom-0 bg-primary/10 border-t-2 border-primary">
                  <tr>
                    <td className="p-3 font-semibold text-card-foreground" colSpan={2}>
                      Total Amount
                    </td>
                    <td className="p-3 font-semibold text-card-foreground">
                      ${(filteredData as typeof mockData).reduce((sum, row) => sum + row.usdNet, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td colSpan={currentColumns.length - 2}></td>
                  </tr>
                </tfoot>
              )}
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
