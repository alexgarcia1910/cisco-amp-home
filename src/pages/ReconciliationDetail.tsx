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

// Mock data for the GL transactions table
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

// Mock data for Asset Depreciation table
const generateAssetDepreciationData = () => {
  const level2Leaders = ["Thimaya Subaiya (tsubaiya)", "Jeetu Patel (jeetup)"];
  const level3Leaders = ["Fletcher Previn (fprevin)", "Srini Namineni (snamineni)", "Anurag Dhingra (adhingra)"];
  const level4Leaders = ["Abhi Pandit (abhipa)", "Chandra Callicutt (ccallicu)", "Snorre Kjesbu (skjesbu)"];
  const level5Leaders = ["David Murray (dmurray)", "Narasimha Raghavan Ram...", "Ty Thorsen (tthorsen)", "Alex Johnson (ajohnso)"];
  const assetNumbers = ["380236197", "380355154", "380356115", "380412789", "380523456"];
  const departmentNumbers = ["020070233", "020033078", "282024047", "020045123", "020089456"];
  const purchaseReqNumbers = ["201252209", "-998", "201391993", "201221006", "201163044", "-999"];
  const ssTableCds = ["DEP", "ADJ"];
  const glPostedFlags = ["-", "Y"];

  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    assetCategory: "SFT",
    assetNumber: assetNumbers[i % assetNumbers.length],
    departmentNumber: departmentNumbers[i % departmentNumbers.length],
    purchaseReqNumber: purchaseReqNumbers[i % purchaseReqNumbers.length],
    poNumber: i % 3 === 0 ? "" : "",
    level2Leader: level2Leaders[i % level2Leaders.length],
    level3Leader: level3Leaders[i % level3Leaders.length],
    level4Leader: level4Leaders[i % level4Leaders.length],
    level5Leader: level5Leaders[i % level5Leaders.length],
    ssTableCd: ssTableCds[i % ssTableCds.length],
    glPostedFlag: glPostedFlags[i % glPostedFlags.length],
  }));
};

// Mock data for Yearly PO Financials table
const generateYearlyPOFinancialsData = () => {
  const vendors = [
    "360INSIGHTS USA LTD", "SHI INTERNATIONAL CORP", "ALTRATA INC", "GOVLY INC", 
    "MINDTICKLE INC", "Software Allocations", "ARTICULATE GLOBAL LLC", "Misc Allocations",
    "ORACLE CORP", "MICROSOFT INC", "ADOBE SYSTEMS", "SALESFORCE INC"
  ];
  const poNumbers = [
    "USA000EP676650", "USA000EP670622", "USA000EP690598", "USA000EP687432",
    "USA000EP691234", "USA000EP678901", "USA000EP665432", "USA000EP654321"
  ];

  return Array.from({ length: 15 }, (_, i) => {
    // Generate values where some actual amounts match forecast amounts (for green highlighting)
    const actualQ1 = [1700, 33046, 52000, 247998, -49486, 0, -142451, 15000][i % 8];
    const commitQ1 = [0, 33046, 52000, 0, -49486, 0, -142451, 15000][i % 8];
    const forecastQ1 = [1700, 33046, 52000, 247998, 0, 0, -142451, 18000][i % 8]; // Some match actualQ1
    
    const actualQ2 = [0, -247998, 52000, 0, 33046, 0, 15000, -49486][i % 8];
    const commitQ2 = [0, -247998, 0, 0, 33046, 0, 15000, 0][i % 8];
    const forecastQ2 = [0, -247998, 52000, 0, 33046, 0, 15000, -49486][i % 8];
    
    const actualQ3 = [52000, 0, -142451, 1700, 0, 247998, 33046, 0][i % 8];
    const commitQ3 = [52000, 0, 0, 0, 0, 247998, 0, 0][i % 8];
    const forecastQ3 = [52000, 0, -142451, 1700, 0, 0, 33046, 0][i % 8];

    return {
      id: i + 1,
      department: "020535002",
      project: i % 4 === 0 ? "PRJ-" + (1000 + i) : "",
      vendor: vendors[i % vendors.length],
      poNumber: poNumbers[i % poNumbers.length],
      actualQ1,
      commitQ1,
      forecastQ1,
      actualQ2,
      commitQ2,
      forecastQ2,
      actualQ3,
      commitQ3,
      forecastQ3,
    };
  });
};

const mockData = generateDetailMockData();
const assetDepreciationData = generateAssetDepreciationData();
const yearlyPOFinancialsData = generateYearlyPOFinancialsData();

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
                {/* Action Bar */}
                <div className="flex items-center justify-between mb-4">
                  <button className="flex items-center gap-1 text-primary hover:underline text-sm">
                    Action: <RefreshCw className="h-3 w-3" /> Refresh data
                  </button>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-sm text-muted-foreground">Filtered:</span>
                  <span className="text-sm text-muted-foreground">No Filters</span>
                  <button 
                    className="text-sm text-muted-foreground ml-2"
                    disabled
                  >
                    Clear all filters
                  </button>
                </div>

                {/* Asset Depreciation Data Table */}
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        {/* Column Headers Row */}
                        <TableRow className="bg-[#032D4D]">
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Asset Category <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Asset # <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Department # <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Purchase REQ # <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              PO # <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Level 2 Leader <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Level 3 Leader <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Level 4 Leader <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              Level 5 Leader <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              SS Table CD <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-medium text-xs">
                            <div className="flex items-center gap-1">
                              GL Posted Flag <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                        </TableRow>
                        {/* Search Row */}
                        <TableRow className="bg-gray-50">
                          {["assetCategory", "assetNumber", "departmentNumber", "purchaseReqNumber", "poNumber", "level2Leader", "level3Leader", "level4Leader", "level5Leader", "ssTableCd", "glPostedFlag"].map((column) => (
                            <TableHead key={column} className="p-1">
                              <Input 
                                placeholder="Search..."
                                className="h-7 text-xs bg-white"
                              />
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assetDepreciationData.slice(0, parseInt(itemsPerPage)).map((row, index) => (
                          <TableRow 
                            key={row.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <TableCell className="text-xs p-2">{row.assetCategory}</TableCell>
                            <TableCell className="text-xs p-2">{row.assetNumber}</TableCell>
                            <TableCell className="text-xs p-2">{row.departmentNumber}</TableCell>
                            <TableCell className="text-xs p-2">{row.purchaseReqNumber}</TableCell>
                            <TableCell className="text-xs p-2">{row.poNumber}</TableCell>
                            <TableCell className="text-xs p-2">{row.level2Leader}</TableCell>
                            <TableCell className="text-xs p-2">{row.level3Leader}</TableCell>
                            <TableCell className="text-xs p-2">{row.level4Leader}</TableCell>
                            <TableCell className="text-xs p-2">{row.level5Leader}</TableCell>
                            <TableCell className="text-xs p-2">{row.ssTableCd}</TableCell>
                            <TableCell className="text-xs p-2">{row.glPostedFlag}</TableCell>
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
                      disabled
                    >
                      Previous
                    </Button>
                    <span className="text-sm">Page 1</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="yearly-po" className="mt-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center gap-1 text-primary hover:underline text-sm">
                Action: <RefreshCw className="h-3 w-3" /> Refresh data
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Filtered:</span>
              <span className="text-sm text-muted-foreground">No Filters</span>
              <button 
                className="text-sm text-muted-foreground ml-2"
                disabled
              >
                Clear all filters
              </button>
            </div>

            {/* Yearly PO Financials Data Table */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    {/* Quarter Group Headers Row */}
                    <TableRow className="bg-blue-100">
                      <TableHead className="text-[#032D4D] font-medium text-xs" colSpan={4}></TableHead>
                      <TableHead className="text-[#032D4D] font-semibold text-xs text-center border-l border-blue-200" colSpan={3}>Q1</TableHead>
                      <TableHead className="text-[#032D4D] font-semibold text-xs text-center border-l border-blue-200" colSpan={3}>Q2</TableHead>
                      <TableHead className="text-[#032D4D] font-semibold text-xs text-center border-l border-blue-200" colSpan={3}>Q3</TableHead>
                    </TableRow>
                    {/* Column Headers Row */}
                    <TableRow className="bg-[#032D4D]">
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Department <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Project <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Vendor <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          PO Number <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs border-l border-blue-300">
                        <div className="flex items-center gap-1">
                          Actual Amount - Q1 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Commit Amount - Q1 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Forecast Amount - Q1 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs border-l border-blue-300">
                        <div className="flex items-center gap-1">
                          Actual Amount - Q2 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Commit Amount - Q2 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Forecast Amount - Q2 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs border-l border-blue-300">
                        <div className="flex items-center gap-1">
                          Actual Amount - Q3 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Commit Amount - Q3 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-medium text-xs">
                        <div className="flex items-center gap-1">
                          Forecast Amount - Q3 <ChevronDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                    </TableRow>
                    {/* Search Row */}
                    <TableRow className="bg-gray-50">
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1">
                        <Input placeholder="Search..." className="h-7 text-xs bg-white" />
                      </TableHead>
                      <TableHead className="p-1">
                        <Input placeholder="Search..." className="h-7 text-xs bg-white" />
                      </TableHead>
                      <TableHead className="p-1">
                        <Input placeholder="Search..." className="h-7 text-xs bg-white" />
                      </TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                      <TableHead className="p-1"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlyPOFinancialsData.slice(0, parseInt(itemsPerPage)).map((row, index) => {
                      const formatCurrency = (value: number) => {
                        if (value === 0) return "$0";
                        const absValue = Math.abs(value).toLocaleString();
                        return value < 0 ? `-$${absValue}` : `$${absValue}`;
                      };

                      return (
                        <TableRow 
                          key={row.id}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <TableCell className="text-xs p-2">{row.department}</TableCell>
                          <TableCell className="text-xs p-2">{row.project}</TableCell>
                          <TableCell className="text-xs p-2">{row.vendor}</TableCell>
                          <TableCell className="text-xs p-2">{row.poNumber}</TableCell>
                          <TableCell className={`text-xs p-2 border-l border-gray-200 ${row.actualQ1 === row.forecastQ1 && row.actualQ1 !== 0 ? 'bg-green-400' : ''}`}>
                            {formatCurrency(row.actualQ1)}
                          </TableCell>
                          <TableCell className="text-xs p-2">{formatCurrency(row.commitQ1)}</TableCell>
                          <TableCell className="text-xs p-2">{formatCurrency(row.forecastQ1)}</TableCell>
                          <TableCell className={`text-xs p-2 border-l border-gray-200 ${row.actualQ2 === row.forecastQ2 && row.actualQ2 !== 0 ? 'bg-green-400' : ''}`}>
                            {formatCurrency(row.actualQ2)}
                          </TableCell>
                          <TableCell className="text-xs p-2">{formatCurrency(row.commitQ2)}</TableCell>
                          <TableCell className="text-xs p-2">{formatCurrency(row.forecastQ2)}</TableCell>
                          <TableCell className={`text-xs p-2 border-l border-gray-200 ${row.actualQ3 === row.forecastQ3 && row.actualQ3 !== 0 ? 'bg-green-400' : ''}`}>
                            {formatCurrency(row.actualQ3)}
                          </TableCell>
                          <TableCell className="text-xs p-2">{formatCurrency(row.commitQ3)}</TableCell>
                          <TableCell className="text-xs p-2">{formatCurrency(row.forecastQ3)}</TableCell>
                        </TableRow>
                      );
                    })}
                    {/* Total Amounts Row */}
                    <TableRow className="bg-blue-100 font-semibold">
                      <TableCell className="text-xs p-2">Total Amounts</TableCell>
                      <TableCell className="text-xs p-2"></TableCell>
                      <TableCell className="text-xs p-2"></TableCell>
                      <TableCell className="text-xs p-2"></TableCell>
                      <TableCell className="text-xs p-2 border-l border-blue-200">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.actualQ1, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.commitQ1, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.forecastQ1, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2 border-l border-blue-200">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.actualQ2, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.commitQ2, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.forecastQ2, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2 border-l border-blue-200">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.actualQ3, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.commitQ3, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        ${yearlyPOFinancialsData.reduce((sum, row) => sum + row.forecastQ3, 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
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
                  disabled
                >
                  Previous
                </Button>
                <span className="text-sm">Page 1</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReconciliationDetail;
