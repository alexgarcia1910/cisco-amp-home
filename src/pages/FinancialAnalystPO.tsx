import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronDown, 
  Columns, 
  RefreshCw, 
  FileSpreadsheet, 
  Camera, 
  Upload, 
  LayoutGrid, 
  Pencil, 
  Calendar, 
  Trash2, 
  Plus, 
  Search, 
  X, 
  RotateCcw,
  Check,
  XCircle
} from "lucide-react";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Mock Data
const portfolioData = [
  {
    id: "1",
    expenseCategory: "Hardware",
    costPool: "IT Infrastructure",
    swUsageCategory: "Enterprise",
    swCategory: "ELA",
    deptNumber: "D1000",
    poNumber: "PO-2026-0001",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "John Smith",
    level3Leader: "Jane Doe",
    q1Commit: 125000,
    q2Commit: 135000,
    q3Commit: 145000,
    q4Commit: 155000,
    totalForecast: 560000
  },
  {
    id: "2",
    expenseCategory: "Software",
    costPool: "Cloud Services",
    swUsageCategory: "Departmental",
    swCategory: "SaaS",
    deptNumber: "D1001",
    poNumber: "PO-2026-0002",
    poNumberSecondary: "PO-2026-0002-B",
    cogsOpex: "COGS",
    level2Leader: "Mike Johnson",
    level3Leader: "Sarah Williams",
    q1Commit: 85000,
    q2Commit: 90000,
    q3Commit: 95000,
    q4Commit: 100000,
    totalForecast: 370000
  },
  {
    id: "3",
    expenseCategory: "Services",
    costPool: "Security",
    swUsageCategory: "Individual",
    swCategory: "Perpetual",
    deptNumber: "D1002",
    poNumber: "PO-2026-0003",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "David Brown",
    level3Leader: "Emily Davis",
    q1Commit: 45000,
    q2Commit: 50000,
    q3Commit: 55000,
    q4Commit: 60000,
    totalForecast: 210000
  },
  {
    id: "4",
    expenseCategory: "Maintenance",
    costPool: "Development",
    swUsageCategory: "Shared",
    swCategory: "Subscription",
    deptNumber: "D1003",
    poNumber: "PO-2026-0004",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Robert Wilson",
    level3Leader: "Lisa Anderson",
    q1Commit: 75000,
    q2Commit: 80000,
    q3Commit: 85000,
    q4Commit: 90000,
    totalForecast: 330000
  },
  {
    id: "5",
    expenseCategory: "Hardware",
    costPool: "IT Infrastructure",
    swUsageCategory: "Enterprise",
    swCategory: "ELA",
    deptNumber: "D1004",
    poNumber: "PO-2026-0005",
    poNumberSecondary: "PO-2026-0005-A",
    cogsOpex: "COGS",
    level2Leader: "James Taylor",
    level3Leader: "Maria Garcia",
    q1Commit: 200000,
    q2Commit: 210000,
    q3Commit: 220000,
    q4Commit: 230000,
    totalForecast: 860000
  },
  {
    id: "6",
    expenseCategory: "Software",
    costPool: "Cloud Services",
    swUsageCategory: "Departmental",
    swCategory: "SaaS",
    deptNumber: "D1005",
    poNumber: "PO-2026-0006",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Christopher Lee",
    level3Leader: "Jennifer Martinez",
    q1Commit: 110000,
    q2Commit: 115000,
    q3Commit: 120000,
    q4Commit: 125000,
    totalForecast: 470000
  },
  {
    id: "7",
    expenseCategory: "Services",
    costPool: "Security",
    swUsageCategory: "Individual",
    swCategory: "Perpetual",
    deptNumber: "D1006",
    poNumber: "PO-2026-0007",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Daniel White",
    level3Leader: "Patricia Harris",
    q1Commit: 60000,
    q2Commit: 65000,
    q3Commit: 70000,
    q4Commit: 75000,
    totalForecast: 270000
  },
  {
    id: "8",
    expenseCategory: "Maintenance",
    costPool: "Development",
    swUsageCategory: "Shared",
    swCategory: "Subscription",
    deptNumber: "D1007",
    poNumber: "PO-2026-0008",
    poNumberSecondary: "PO-2026-0008-B",
    cogsOpex: "COGS",
    level2Leader: "Matthew Clark",
    level3Leader: "Linda Lewis",
    q1Commit: 95000,
    q2Commit: 100000,
    q3Commit: 105000,
    q4Commit: 110000,
    totalForecast: 410000
  },
  {
    id: "9",
    expenseCategory: "Hardware",
    costPool: "IT Infrastructure",
    swUsageCategory: "Enterprise",
    swCategory: "ELA",
    deptNumber: "D1008",
    poNumber: "PO-2026-0009",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Andrew Walker",
    level3Leader: "Barbara Hall",
    q1Commit: 150000,
    q2Commit: 160000,
    q3Commit: 170000,
    q4Commit: 180000,
    totalForecast: 660000
  },
  {
    id: "10",
    expenseCategory: "Software",
    costPool: "Cloud Services",
    swUsageCategory: "Departmental",
    swCategory: "SaaS",
    deptNumber: "D1009",
    poNumber: "PO-2026-0010",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Kevin Young",
    level3Leader: "Nancy King",
    q1Commit: 70000,
    q2Commit: 75000,
    q3Commit: 80000,
    q4Commit: 85000,
    totalForecast: 310000
  },
  {
    id: "11",
    expenseCategory: "Services",
    costPool: "Security",
    swUsageCategory: "Individual",
    swCategory: "Perpetual",
    deptNumber: "D1010",
    poNumber: "PO-2026-0011",
    poNumberSecondary: "PO-2026-0011-C",
    cogsOpex: "COGS",
    level2Leader: "Steven Wright",
    level3Leader: "Betty Lopez",
    q1Commit: 50000,
    q2Commit: 55000,
    q3Commit: 60000,
    q4Commit: 65000,
    totalForecast: 230000
  },
  {
    id: "12",
    expenseCategory: "Maintenance",
    costPool: "Development",
    swUsageCategory: "Shared",
    swCategory: "Subscription",
    deptNumber: "D1011",
    poNumber: "PO-2026-0012",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Edward Hill",
    level3Leader: "Sandra Scott",
    q1Commit: 80000,
    q2Commit: 85000,
    q3Commit: 90000,
    q4Commit: 95000,
    totalForecast: 350000
  },
  {
    id: "13",
    expenseCategory: "Hardware",
    costPool: "IT Infrastructure",
    swUsageCategory: "Enterprise",
    swCategory: "ELA",
    deptNumber: "D1012",
    poNumber: "PO-2026-0013",
    poNumberSecondary: "",
    cogsOpex: "COGS",
    level2Leader: "Joseph Green",
    level3Leader: "Donna Adams",
    q1Commit: 175000,
    q2Commit: 185000,
    q3Commit: 195000,
    q4Commit: 205000,
    totalForecast: 760000
  },
  {
    id: "14",
    expenseCategory: "Software",
    costPool: "Cloud Services",
    swUsageCategory: "Departmental",
    swCategory: "SaaS",
    deptNumber: "D1013",
    poNumber: "PO-2026-0014",
    poNumberSecondary: "PO-2026-0014-D",
    cogsOpex: "OPEX",
    level2Leader: "Thomas Baker",
    level3Leader: "Carol Nelson",
    q1Commit: 105000,
    q2Commit: 110000,
    q3Commit: 115000,
    q4Commit: 120000,
    totalForecast: 450000
  },
  {
    id: "15",
    expenseCategory: "Services",
    costPool: "Security",
    swUsageCategory: "Individual",
    swCategory: "Perpetual",
    deptNumber: "D1014",
    poNumber: "PO-2026-0015",
    poNumberSecondary: "",
    cogsOpex: "OPEX",
    level2Leader: "Richard Carter",
    level3Leader: "Michelle Mitchell",
    q1Commit: 55000,
    q2Commit: 60000,
    q3Commit: 65000,
    q4Commit: 70000,
    totalForecast: 250000
  },
  {
    id: "16",
    expenseCategory: "Maintenance",
    costPool: "Development",
    swUsageCategory: "Shared",
    swCategory: "Subscription",
    deptNumber: "D1015",
    poNumber: "PO-2026-0016",
    poNumberSecondary: "",
    cogsOpex: "COGS",
    level2Leader: "Charles Perez",
    level3Leader: "Laura Roberts",
    q1Commit: 90000,
    q2Commit: 95000,
    q3Commit: 100000,
    q4Commit: 105000,
    totalForecast: 390000
  }
];


const FinancialAnalystPO = () => {
  // State Management
  const [fiscalYear, setFiscalYear] = useState("FY2026");
  
  const [showMonthlyForecastModal, setShowMonthlyForecastModal] = useState(false);
  const [showPODetailModal, setShowPODetailModal] = useState(false);
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [legendFilters, setLegendFilters] = useState({
    mainSigned: false,
    renewalPeriod: false,
    commonFinancial: false
  });
  const [columnSearches, setColumnSearches] = useState<Record<string, string>>({});
  const [attestationChecked, setAttestationChecked] = useState(false);
  
  const [activeView, setActiveView] = useState<"all" | "summarized">("all");
  const [activeFilters, setActiveFilters] = useState<Array<{column: string, value: string}>>([]);

  // Filter portfolio data based on column searches
  const filteredPortfolioData = portfolioData.filter(row => {
    return Object.entries(columnSearches).every(([key, value]) => {
      if (!value) return true;
      const rowValue = String(row[key as keyof typeof row] || "").toLowerCase();
      return rowValue.includes(value.toLowerCase());
    });
  });

  // Calculate page totals
  const pageTotals = filteredPortfolioData.reduce((acc, row) => ({
    q1Commit: acc.q1Commit + row.q1Commit,
    q2Commit: acc.q2Commit + row.q2Commit,
    q3Commit: acc.q3Commit + row.q3Commit,
    q4Commit: acc.q4Commit + row.q4Commit,
    totalForecast: acc.totalForecast + row.totalForecast
  }), { q1Commit: 0, q2Commit: 0, q3Commit: 0, q4Commit: 0, totalForecast: 0 });


  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  // Handle double-click on portfolio row
  const handleRowDoubleClick = (poNumber: string) => {
    setSelectedPO(poNumber);
    setShowPODetailModal(true);
  };

  // Generate month labels for Monthly Forecast Modal
  const generateMonthLabels = () => {
    const labels = [];
    const fiscalYears = ["FY26", "FY27", "FY28", "FY29", "FY30", "FY31"];
    for (const fy of fiscalYears) {
      for (let month = 1; month <= 12; month++) {
        labels.push(`${fy} M${month}`);
      }
    }
    return labels;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      

      {/* Main Content */}
      <main className="p-6 pt-4">
        {/* Page Header Card */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Select value={fiscalYear} onValueChange={setFiscalYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FY2024">FY2024</SelectItem>
                <SelectItem value="FY2025">FY2025</SelectItem>
                <SelectItem value="FY2026">FY2026</SelectItem>
                <SelectItem value="FY2027">FY2027</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-card-foreground">
              Financial Analyst PO Portfolio: Fiscal Year {fiscalYear.replace("FY", "")}
            </h1>
          </div>

          {/* Toggle Pills */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="mainSigned"
                checked={legendFilters.mainSigned}
                onCheckedChange={(checked) => setLegendFilters(prev => ({ ...prev, mainSigned: checked as boolean }))}
              />
              <Label htmlFor="mainSigned" className="text-sm font-normal cursor-pointer">Main/Signed PO</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="renewalPeriod"
                checked={legendFilters.renewalPeriod}
                onCheckedChange={(checked) => setLegendFilters(prev => ({ ...prev, renewalPeriod: checked as boolean }))}
              />
              <Label htmlFor="renewalPeriod" className="text-sm font-normal cursor-pointer">Renewal Period</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="commonFinancial"
                checked={legendFilters.commonFinancial}
                onCheckedChange={(checked) => setLegendFilters(prev => ({ ...prev, commonFinancial: checked as boolean }))}
              />
              <Label htmlFor="commonFinancial" className="text-sm font-normal cursor-pointer">Common Financial</Label>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Subheader */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Financial Analyst UI</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Columns className="h-4 w-4" />
                Select Columns
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel View
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Export to Excel</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                  <DropdownMenuItem>Export All Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-3">
              <Button className="gap-2" onClick={() => setShowSnapshotModal(true)}>
                <Camera className="h-4 w-4" />
                Snapshot Actions
              </Button>
              <Button className="gap-2" onClick={() => setShowBulkModal(true)}>
                <Upload className="h-4 w-4" />
                Bulk Upload / Download
              </Button>
              <Button variant="outline" size="icon">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* View Toggle and Filter Bar */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex border border-border rounded-md overflow-hidden">
              <button 
                onClick={() => setActiveView("all")}
                className={`px-4 py-1.5 text-sm transition-colors ${
                  activeView === "all" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card text-card-foreground hover:bg-muted"
                }`}
              >
                All Fields
              </button>
              <button 
                onClick={() => setActiveView("summarized")}
                className={`px-4 py-1.5 text-sm transition-colors ${
                  activeView === "summarized" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card text-card-foreground hover:bg-muted"
                }`}
              >
                Summarized Fields
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mt-4 px-4 py-3 bg-muted/30 border border-border rounded-md">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Filtered:</span>
              {activeFilters.length === 0 ? (
                <span className="text-muted-foreground">No Filters</span>
              ) : (
                <div className="flex items-center gap-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {filter.column}: {filter.value}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setActiveFilters(prev => prev.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => setActiveFilters([])}
                disabled={activeFilters.length === 0}
              >
                Clear All Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary/10">
                <Plus className="h-4 w-4" />
                Add Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Table */}
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[2000px]">
                <thead className="bg-muted/50 border-b border-border sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground sticky left-0 bg-muted/50 z-10">Action</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Expense Category</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cost Pool</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">SW Usage Category</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">SW Category</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Dept Number</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">PO#</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">PO# (Secondary)</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">COGS / OPEX</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Level 2 Leader</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Level 3 Leader</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q1 Commit</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q2 Commit</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q3 Commit</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q4 Commit</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Total Forecast</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPortfolioData.map((row, idx) => (
                    <tr
                      key={row.id}
                      onDoubleClick={() => handleRowDoubleClick(row.poNumber)}
                      className={`border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${
                        idx % 2 === 0 ? "bg-card" : "bg-muted/10"
                      }`}
                    >
                      <td className="px-4 py-3 sticky left-0 bg-inherit z-10">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPO(row.poNumber);
                              setShowMonthlyForecastModal(true);
                            }}
                          >
                            <Calendar className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 hover:text-destructive"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-3">{row.expenseCategory}</td>
                      <td className="px-4 py-3">{row.costPool}</td>
                      <td className="px-4 py-3">{row.swUsageCategory}</td>
                      <td className="px-4 py-3">{row.swCategory}</td>
                      <td className="px-4 py-3">{row.deptNumber}</td>
                      <td className="px-4 py-3 font-medium">{row.poNumber}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.poNumberSecondary || "-"}</td>
                      <td className="px-4 py-3">{row.cogsOpex}</td>
                      <td className="px-4 py-3">{row.level2Leader}</td>
                      <td className="px-4 py-3">{row.level3Leader}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(row.q1Commit)}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(row.q2Commit)}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(row.q3Commit)}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(row.q4Commit)}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatCurrency(row.totalForecast)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/50 border-t-2 border-border">
                  <tr>
                    <td colSpan={11} className="px-4 py-3 font-semibold text-right">Page Total:</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(pageTotals.q1Commit)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(pageTotals.q2Commit)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(pageTotals.q3Commit)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(pageTotals.q4Commit)}</td>
                    <td className="px-4 py-3 text-right font-bold">{formatCurrency(pageTotals.totalForecast)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

        {/* Monthly Forecast Modal */}
        <Dialog open={showMonthlyForecastModal} onOpenChange={setShowMonthlyForecastModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Monthly Forecast – {selectedPO}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label>Department Number</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="D1000">D1000</SelectItem>
                      <SelectItem value="D1001">D1001</SelectItem>
                      <SelectItem value="D1002">D1002</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>Expense Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>Cost Pool</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Cost Pool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT Infrastructure">IT Infrastructure</SelectItem>
                      <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                {generateMonthLabels().map((label, idx) => (
                  <div key={idx} className="space-y-1">
                    <Label className="text-xs text-muted-foreground">{label}</Label>
                    <Input type="number" className="h-8 text-xs" placeholder="0" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="link" className="p-0 h-auto">Create Cross-Charge Row</Button>
                <span>|</span>
                <Button variant="link" className="p-0 h-auto">Amortization Override</Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMonthlyForecastModal(false)}>Cancel</Button>
              <Button onClick={() => setShowMonthlyForecastModal(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* PO Detail Modal */}
        <Dialog open={showPODetailModal} onOpenChange={setShowPODetailModal}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>PO Detail – {selectedPO}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Main/Signed PO Fields */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Main/Signed PO Fields</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>PO Number</Label>
                    <Input value={selectedPO || ""} readOnly />
                  </div>
                  <div>
                    <Label>Vendor</Label>
                    <Input placeholder="Enter vendor" />
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Renewal Period Fields */}
              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Renewal Period Fields</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Renewal PO#</Label>
                    <Input placeholder="Enter renewal PO#" />
                  </div>
                  <div>
                    <Label>Renewal Amount</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Uplift %</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
              </div>

              {/* 8-Quarter View Table */}
              <div>
                <h3 className="font-semibold mb-4">8-Quarter View</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q1 FY26</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q2 FY26</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q3 FY26</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q4 FY26</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q1 FY27</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q2 FY27</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q3 FY27</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Q4 FY27</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="px-4 py-3 font-medium">Commit</td>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                            <td key={q} className="px-4 py-3">
                              <Input type="number" className="h-8 text-right" placeholder="0" />
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border">
                          <td className="px-4 py-3 font-medium">Forecast</td>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                            <td key={q} className="px-4 py-3">
                              <Input type="number" className="h-8 text-right" disabled placeholder="0" />
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border">
                          <td className="px-4 py-3 font-medium">Actual</td>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                            <td key={q} className="px-4 py-3">
                              <Input type="number" className="h-8 text-right" disabled placeholder="0" />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Uplift %</td>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                            <td key={q} className="px-4 py-3">
                              <Input 
                                type="number" 
                                className="h-8 text-right" 
                                disabled={q > 4}
                                placeholder="0.00" 
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="link" className="p-0 h-auto">History Log</Button>
                <span>|</span>
                <Button variant="link" className="p-0 h-auto">Comments</Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPODetailModal(false)}>Close</Button>
              <Button onClick={() => setShowPODetailModal(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Snapshot Actions Modal */}
        <Dialog open={showSnapshotModal} onOpenChange={setShowSnapshotModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Snapshot Actions</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Quarter</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1 FY2026">Q1 FY2026</SelectItem>
                    <SelectItem value="Q2 FY2026">Q2 FY2026</SelectItem>
                    <SelectItem value="Q3 FY2026">Q3 FY2026</SelectItem>
                    <SelectItem value="Q4 FY2026">Q4 FY2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Snapshots allow you to capture the current state of your portfolio at a specific point in time. 
                  You can create, download, approve, or reject snapshots as needed.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button>Create Snapshot</Button>
                <Button variant="outline">Download Snapshot</Button>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1">Approve</Button>
                <Button variant="destructive" className="flex-1">Reject</Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSnapshotModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Upload / Download Modal */}
        <Dialog open={showBulkModal} onOpenChange={setShowBulkModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Bulk Upload / Download</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Leader Hierarchy Filters</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Level 2 Leader</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Leader" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith</SelectItem>
                        <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                        <SelectItem value="David Brown">David Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Level 3 Leader</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Leader" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                        <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                        <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Level 4 Leader</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Leader" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Leader 1">Leader 1</SelectItem>
                        <SelectItem value="Leader 2">Leader 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Level 5 Leader</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Leader" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Leader 1">Leader 1</SelectItem>
                        <SelectItem value="Leader 2">Leader 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="attestation"
                    checked={attestationChecked}
                    onCheckedChange={(checked) => setAttestationChecked(checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="attestation" className="font-semibold cursor-pointer">Works Council Attestation</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      By checking this box, you attest that you have reviewed and approved the data for bulk operations 
                      in accordance with Works Council requirements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button disabled={!attestationChecked} className="flex-1">Download</Button>
                <Button disabled={!attestationChecked} variant="outline" className="flex-1">Upload</Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBulkModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default FinancialAnalystPO;

