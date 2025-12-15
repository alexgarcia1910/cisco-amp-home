import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import TopNav from "@/components/TopNav";

// Mock data for the detail table
const generateDetailMockData = () => {
  const nodeLevel2Options = ["*Sales (Tuszik)", "*Finance (Patterson)", "*Operations (Subaiya)"];
  const nodeLevel3Options = ["*Sales Strategy, Planning a...", "*Finance Operations", "*IT Operations"];
  const nodeLevel4Options = ["*Sales Software (Canon)", "*Accounting (Smith)", "*Infrastructure (Lee)"];
  const nodeLevel5Options = ["*Direct Sales", "*Revenue Accounting", "*Cloud Services"];
  const departmentCodes = ["020535002", "011272362", "020010058", "020010232"];
  const fiscalQuarters = ["Q1FY26", "Q2FY26", "Q3FY26", "Q4FY26"];
  const fiscalPeriods = ["AUG FY2026", "SEP FY2026", "OCT FY2026", "NOV FY2026"];
  const glTransactionTypes = ["Amortization", "Depreciation", "Accrual", "Journal Entry"];
  const poNumbers = ["USA000EP658744", "USA000EP661539", "USA000EP662101", "USA000EP663422"];
  const accounts = ["62100", "62200", "63100", "64000"];
  const departmentNames = ["Software Development", "Finance Operations", "Sales Operations", "IT Infrastructure"];
  const accountDescriptions = ["SW Amortization", "HW Depreciation", "Service Fees", "License Costs"];

  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    nodeLevel2: nodeLevel2Options[i % nodeLevel2Options.length],
    nodeLevel3: nodeLevel3Options[i % nodeLevel3Options.length],
    nodeLevel4: nodeLevel4Options[i % nodeLevel4Options.length],
    nodeLevel5: nodeLevel5Options[i % nodeLevel5Options.length],
    departmentCode: departmentCodes[i % departmentCodes.length],
    fiscalQuarter: fiscalQuarters[i % fiscalQuarters.length],
    fiscalPeriod: fiscalPeriods[i % fiscalPeriods.length],
    glTransactionType: glTransactionTypes[i % glTransactionTypes.length],
    poNumber: poNumbers[i % poNumbers.length],
    account: accounts[i % accounts.length],
    departmentName: departmentNames[i % departmentNames.length],
    accountDescription: accountDescriptions[i % accountDescriptions.length],
  }));
};

const mockData = generateDetailMockData();

const ReconciliationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fiscalYear, setFiscalYear] = useState("FY 2026");
  const [primaryTab, setPrimaryTab] = useState("linked-gl");
  const [secondaryTab, setSecondaryTab] = useState("gl-transactions");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<string[]>(["Fiscal year", "Company code", "Fiscal quarter", "Fiscal period"]);

  // Column search states
  const [columnSearches, setColumnSearches] = useState<Record<string, string>>({});

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const handleClearAllFilters = () => {
    setFilters([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(mockData.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (rowId: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    }
  };

  const paginatedData = mockData.slice(
    (currentPage - 1) * parseInt(itemsPerPage),
    currentPage * parseInt(itemsPerPage)
  );

  const totalPages = Math.ceil(mockData.length / parseInt(itemsPerPage));

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <TopNav />
      
      <div className="p-6">
        {/* Fiscal Year Dropdown */}
        <div className="mb-2">
          <Select value={fiscalYear} onValueChange={setFiscalYear}>
            <SelectTrigger className="w-32 h-8 text-sm bg-white border-border">
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
        <h1 className="text-xl font-semibold text-[#032D4D] mb-4">
          Reconciliation for Financial Analyst's Portfolio: Fiscal Year {fiscalYear.replace("FY ", "")}
        </h1>

        {/* Back Link */}
        <button 
          onClick={() => navigate("/reconciliation")}
          className="flex items-center gap-1 text-primary hover:underline text-sm mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Table
        </button>

        {/* Primary Tabs */}
        <Tabs value={primaryTab} onValueChange={setPrimaryTab} className="mb-4">
          <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 gap-6">
            <TabsTrigger 
              value="linked-gl" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-sm font-medium"
            >
              Linked GL Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="yearly-po" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-sm font-medium"
            >
              Yearly PO Financials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="linked-gl" className="mt-4">
            {/* Secondary Tabs */}
            <Tabs value={secondaryTab} onValueChange={setSecondaryTab} className="mb-4">
              <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 gap-6">
                <TabsTrigger 
                  value="gl-transactions" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-sm font-medium"
                >
                  GL transactions
                </TabsTrigger>
                <TabsTrigger 
                  value="asset-depreciation" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-sm font-medium"
                >
                  Asset Depreciation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gl-transactions" className="mt-4">
                {/* Action Bar */}
                <div className="flex items-center justify-between mb-4">
                  <button className="flex items-center gap-1 text-primary hover:underline text-sm">
                    Action: <RefreshCw className="h-3 w-3" /> Refresh data
                  </button>
                  <button className="flex items-center gap-1 text-primary hover:underline text-sm">
                    <Download className="h-3 w-3" /> Download Report
                  </button>
                </div>

                {/* Bulk Update Button */}
                <div className="mb-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Bulk Update
                  </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-sm text-muted-foreground">Filtered:</span>
                  {filters.length === 0 ? (
                    <span className="text-sm text-muted-foreground">No Filters</span>
                  ) : (
                    <>
                      {filters.map((filter) => (
                        <Badge 
                          key={filter} 
                          variant="secondary" 
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                          onClick={() => handleRemoveFilter(filter)}
                        >
                          {filter} ×
                        </Badge>
                      ))}
                      <button 
                        onClick={handleClearAllFilters}
                        className="text-sm text-primary hover:underline ml-2"
                      >
                        Clear all filters
                      </button>
                    </>
                  )}
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        {/* Column Headers Row */}
                        <TableRow className="bg-[#032D4D]">
                          <TableHead className="text-white font-medium text-xs w-12">
                            <Checkbox 
                              checked={selectedRows.length === mockData.length}
                              onCheckedChange={handleSelectAll}
                              className="border-white"
                            />
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Node Level 2 <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Node Level 3 <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Node Level 4 <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Node Level 5 <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Department Code <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Fiscal Quarter <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Fiscal Period <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              GL Transaction Type <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              PO Number <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Account <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Department Name <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Account Description <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                        </TableRow>
                        {/* Search Row */}
                        <TableRow className="bg-gray-50">
                          <TableHead className="p-1"></TableHead>
                          {["nodeLevel2", "nodeLevel3", "nodeLevel4", "nodeLevel5", "departmentCode", "fiscalQuarter", "fiscalPeriod", "glTransactionType", "poNumber", "account", "departmentName", "accountDescription"].map((column) => (
                            <TableHead key={column} className="p-1">
                              <Input 
                                placeholder="Search..."
                                className="h-7 text-xs bg-white"
                                value={columnSearches[column] || ""}
                                onChange={(e) => setColumnSearches({...columnSearches, [column]: e.target.value})}
                              />
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedData.map((row, index) => (
                          <TableRow 
                            key={row.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <TableCell className="p-2">
                              <Checkbox 
                                checked={selectedRows.includes(row.id)}
                                onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell className="text-xs p-2">{row.nodeLevel2}</TableCell>
                            <TableCell className="text-xs p-2">{row.nodeLevel3}</TableCell>
                            <TableCell className="text-xs p-2">{row.nodeLevel4}</TableCell>
                            <TableCell className="text-xs p-2">{row.nodeLevel5}</TableCell>
                            <TableCell className="text-xs p-2">{row.departmentCode}</TableCell>
                            <TableCell className="text-xs p-2">{row.fiscalQuarter}</TableCell>
                            <TableCell className="text-xs p-2">{row.fiscalPeriod}</TableCell>
                            <TableCell className="text-xs p-2">{row.glTransactionType}</TableCell>
                            <TableCell className="text-xs p-2">{row.poNumber}</TableCell>
                            <TableCell className="text-xs p-2">{row.account}</TableCell>
                            <TableCell className="text-xs p-2">{row.departmentName}</TableCell>
                            <TableCell className="text-xs p-2">{row.accountDescription}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Items per page:</span>
                    <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger className="w-16 h-8 text-sm bg-white">
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">Page {currentPage} of {totalPages}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="asset-depreciation" className="mt-4">
                <div className="text-center py-12 text-muted-foreground">
                  Asset Depreciation data will be displayed here.
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="yearly-po" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              Yearly PO Financials data will be displayed here.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReconciliationDetail;
