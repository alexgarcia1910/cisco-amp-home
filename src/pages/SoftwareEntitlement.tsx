import { useState } from "react";
import { ArrowLeft, ExternalLink, ChevronDown, Plus, X, ChevronLeft, ChevronRight, Clock, User, FileText, AlertTriangle, AlertCircle, PieChart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// =============================================
// STATIC DATA
// =============================================

const entitlementData = [{
  poNumber: "PO-2024-001",
  contractType: "Enterprise",
  publisher: "Microsoft",
  creationDate: "2024-01-15",
  errors: 2,
  warnings: 1,
  docLink: "https://terzo.example.com/doc/001",
  readyForUpload: false
}, {
  poNumber: "PO-2024-002",
  contractType: "Volume",
  publisher: "Oracle",
  creationDate: "2024-01-20",
  errors: 0,
  warnings: 3,
  docLink: "https://terzo.example.com/doc/002",
  readyForUpload: true
}, {
  poNumber: "PO-2024-003",
  contractType: "Subscription",
  publisher: "Adobe",
  creationDate: "2024-02-01",
  errors: 1,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/003",
  readyForUpload: false
}, {
  poNumber: "PO-2024-004",
  contractType: "Perpetual",
  publisher: "SAP",
  creationDate: "2024-02-10",
  errors: 0,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/004",
  readyForUpload: true
}, {
  poNumber: "PO-2024-005",
  contractType: "Enterprise",
  publisher: "Salesforce",
  creationDate: "2024-02-15",
  errors: 3,
  warnings: 2,
  docLink: "https://terzo.example.com/doc/005",
  readyForUpload: false
}, {
  poNumber: "PO-2024-006",
  contractType: "Volume",
  publisher: "ServiceNow",
  creationDate: "2024-02-20",
  errors: 0,
  warnings: 1,
  docLink: "https://terzo.example.com/doc/006",
  readyForUpload: true
}, {
  poNumber: "PO-2024-007",
  contractType: "Subscription",
  publisher: "Workday",
  creationDate: "2024-03-01",
  errors: 0,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/007",
  readyForUpload: true
}, {
  poNumber: "PO-2024-008",
  contractType: "Enterprise",
  publisher: "VMware",
  creationDate: "2024-03-05",
  errors: 1,
  warnings: 2,
  docLink: "https://terzo.example.com/doc/008",
  readyForUpload: false
}, {
  poNumber: "PO-2024-009",
  contractType: "Perpetual",
  publisher: "Splunk",
  creationDate: "2024-03-10",
  errors: 0,
  warnings: 4,
  docLink: "https://terzo.example.com/doc/009",
  readyForUpload: true
}, {
  poNumber: "PO-2024-010",
  contractType: "Volume",
  publisher: "Tableau",
  creationDate: "2024-03-15",
  errors: 2,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/010",
  readyForUpload: false
}];
const trackerData = [{
  publisher: "Microsoft",
  baseline: "500",
  elp: "520",
  analyst: "John Smith",
  engineer: "Sarah Lee",
  completionDate: "2024-03-15",
  notes: "Annual true-up complete",
  lastUpdated: "2024-03-14"
}, {
  publisher: "Oracle",
  baseline: "120",
  elp: "118",
  analyst: "Jane Doe",
  engineer: "Mike Chen",
  completionDate: "2024-03-20",
  notes: "Pending contract review",
  lastUpdated: "2024-03-12"
}, {
  publisher: "Adobe",
  baseline: "300",
  elp: "315",
  analyst: "John Smith",
  engineer: "Emily Wang",
  completionDate: "2024-03-25",
  notes: "Creative Cloud expansion",
  lastUpdated: "2024-03-10"
}, {
  publisher: "SAP",
  baseline: "50",
  elp: "50",
  analyst: "Mike Brown",
  engineer: "Sarah Lee",
  completionDate: "2024-04-01",
  notes: "No changes",
  lastUpdated: "2024-03-08"
}, {
  publisher: "Salesforce",
  baseline: "200",
  elp: "210",
  analyst: "Jane Doe",
  engineer: "Mike Chen",
  completionDate: "2024-04-05",
  notes: "New department licenses",
  lastUpdated: "2024-03-05"
}, {
  publisher: "ServiceNow",
  baseline: "80",
  elp: "85",
  analyst: "John Smith",
  engineer: "Emily Wang",
  completionDate: "2024-04-10",
  notes: "ITSM module added",
  lastUpdated: "2024-03-01"
}];
const saturationData = {
  kpis: {
    totalActiveAgents: 12450,
    saturationPercent: 78,
    overConsumed: 24,
    underutilized: 156
  },
  publisherSaturation: [{
    publisher: "Microsoft",
    saturation: 92
  }, {
    publisher: "Oracle",
    saturation: 85
  }, {
    publisher: "Adobe",
    saturation: 78
  }, {
    publisher: "SAP",
    saturation: 65
  }, {
    publisher: "Salesforce",
    saturation: 88
  }, {
    publisher: "ServiceNow",
    saturation: 72
  }],
  productConsumption: [{
    product: "Office 365",
    consumption: 45
  }, {
    product: "Oracle DB",
    consumption: 22
  }, {
    product: "Creative Cloud",
    consumption: 18
  }, {
    product: "SAP ERP",
    consumption: 10
  }, {
    product: "Other",
    consumption: 5
  }],
  drilldownData: [{
    publisher: "Microsoft",
    product: "Office 365",
    country: "USA",
    consumption: 95,
    analysts: "John Smith, Jane Doe"
  }, {
    publisher: "Microsoft",
    product: "Azure",
    country: "USA",
    consumption: 88,
    analysts: "Mike Brown"
  }, {
    publisher: "Oracle",
    product: "Oracle DB",
    country: "Germany",
    consumption: 82,
    analysts: "Jane Doe"
  }, {
    publisher: "Adobe",
    product: "Creative Cloud",
    country: "UK",
    consumption: 76,
    analysts: "John Smith"
  }, {
    publisher: "SAP",
    product: "SAP ERP",
    country: "India",
    consumption: 68,
    analysts: "Mike Brown, Sarah Lee"
  }]
};
const logHistory = [{
  timestamp: "2024-03-14 14:30:00",
  updatedBy: "John Smith",
  changes: "Updated ELP from 500 to 520"
}, {
  timestamp: "2024-03-10 09:15:00",
  updatedBy: "Jane Doe",
  changes: "Added notes for annual true-up"
}, {
  timestamp: "2024-03-01 16:45:00",
  updatedBy: "Mike Brown",
  changes: "Assigned engineer Sarah Lee"
}, {
  timestamp: "2024-02-20 11:00:00",
  updatedBy: "John Smith",
  changes: "Created tracker entry"
}];

// =============================================
// COMPONENT
// =============================================

const SoftwareEntitlement = () => {
  const [activeTab, setActiveTab] = useState<"processing" | "tracker" | "saturation">("processing");

  // Section 1: Entitlement Data Processing state
  const [selectedRow, setSelectedRow] = useState<typeof entitlementData[0] | null>(null);
  const [processingDrawerOpen, setProcessingDrawerOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  // Section 2: Entitlement Tracker state
  const [trackerDrawerOpen, setTrackerDrawerOpen] = useState(false);
  const [selectedTrackerRow, setSelectedTrackerRow] = useState<typeof trackerData[0] | null>(null);
  const [addEntryModalOpen, setAddEntryModalOpen] = useState(false);

  // Section 3: Agent Saturation state
  const [showDrilldown, setShowDrilldown] = useState(false);
  const tabs = [{
    id: "processing",
    label: "Entitlement Data Processing"
  }, {
    id: "tracker",
    label: "Entitlement Tracker"
  }, {
    id: "saturation",
    label: "Agent Saturation"
  }] as const;
  return <div className="min-h-screen bg-background">
      <TopNav />
      
      {/* Back Navigation */}
      <div className="border-b border-border bg-card">
        
      </div>

      {/* Tab Bar */}
      <div className="border-b border-border bg-card">
        <div className="px-6">
          <div className="flex gap-1">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {tab.label}
              </button>)}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main className="p-6">
        {/* =============================================
            SECTION 1: ENTITLEMENT DATA PROCESSING
         ============================================= */}
        {activeTab === "processing" && <div className="space-y-4">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-card-foreground">
                Entitlement: Data
              </h1>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    PO Number
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover">
                  {entitlementData.slice(0, 5).map(row => <DropdownMenuItem key={row.poNumber}>{row.poNumber}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    S/W Publishers
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover">
                  {["Microsoft", "Oracle", "Adobe", "SAP", "Salesforce"].map(pub => <DropdownMenuItem key={pub}>{pub}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Required field error</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-muted-foreground">Warning</span>
              </div>
            </div>

            {/* Data Table */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">PO Number</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contract Type</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Publisher</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">PO Creation Date</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Errors</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Warnings</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Link to Document</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ready for Upload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entitlementData.map((row, idx) => <tr key={row.poNumber} onClick={() => {
                  setSelectedRow(row);
                  setProcessingDrawerOpen(true);
                }} className={`border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}>
                        <td className="px-4 py-3 font-medium text-primary">{row.poNumber}</td>
                        <td className="px-4 py-3">{row.contractType}</td>
                        <td className="px-4 py-3">{row.publisher}</td>
                        <td className="px-4 py-3">{row.creationDate}</td>
                        <td className="px-4 py-3">
                          <span className={row.errors > 0 ? "text-destructive font-medium" : ""}>
                            {row.errors}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={row.warnings > 0 ? "text-yellow-600 font-medium" : ""}>
                            {row.warnings}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <a href={row.docLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1 text-primary hover:underline">
                            View Document
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <Checkbox checked={row.readyForUpload} onClick={e => e.stopPropagation()} disabled />
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Items per page:</span>
                  <Select value={String(rowsPerPage)} onValueChange={v => setRowsPerPage(Number(v))}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">1-10 of 10</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>}

        {/* =============================================
            SECTION 2: ENTITLEMENT TRACKER
         ============================================= */}
        {activeTab === "tracker" && <div className="space-y-4">
            {/* Title & Add Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-card-foreground">
                Entitlement Tracker
              </h1>
              <Button className="gap-2" onClick={() => setAddEntryModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Entry
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Publisher
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover">
                  {["Microsoft", "Oracle", "Adobe", "SAP", "Salesforce", "ServiceNow"].map(pub => <DropdownMenuItem key={pub}>{pub}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Analyst
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover">
                  {["John Smith", "Jane Doe", "Mike Brown"].map(analyst => <DropdownMenuItem key={analyst}>{analyst}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Engineer
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover">
                  {["Sarah Lee", "Mike Chen", "Emily Wang"].map(eng => <DropdownMenuItem key={eng}>{eng}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tracker Table */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Publisher</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Baseline</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">ELP</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Analyst</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Engineer</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Completion Date</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Notes</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackerData.map((row, idx) => <tr key={row.publisher} onClick={() => {
                  setSelectedTrackerRow(row);
                  setTrackerDrawerOpen(true);
                }} className={`border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}>
                        <td className="px-4 py-3 font-medium text-primary">{row.publisher}</td>
                        <td className="px-4 py-3">{row.baseline}</td>
                        <td className="px-4 py-3">{row.elp}</td>
                        <td className="px-4 py-3">{row.analyst}</td>
                        <td className="px-4 py-3">{row.engineer}</td>
                        <td className="px-4 py-3">{row.completionDate}</td>
                        <td className="px-4 py-3 max-w-[200px] truncate">{row.notes}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.lastUpdated}</td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}

        {/* =============================================
            SECTION 3: AGENT SATURATION
         ============================================= */}
        {activeTab === "saturation" && <div className="space-y-6">
            {/* Title */}
            <h1 className="text-xl font-semibold text-card-foreground">
              Agent Saturation
            </h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Total Active Agents</span>
                </div>
                <div className="text-2xl font-semibold text-card-foreground">
                  {saturationData.kpis.totalActiveAgents.toLocaleString()}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Saturation %</span>
                </div>
                <div className="text-2xl font-semibold text-card-foreground">
                  {saturationData.kpis.saturationPercent}%
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-sm text-muted-foreground">Over-Consumed Licenses</span>
                </div>
                <div className="text-2xl font-semibold text-destructive">
                  {saturationData.kpis.overConsumed}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-sm text-muted-foreground">Underutilized Licenses</span>
                </div>
                <div className="text-2xl font-semibold text-yellow-600">
                  {saturationData.kpis.underutilized}
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Publisher by Saturation - Bar Chart */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-base font-medium text-card-foreground mb-4">
                  Publisher by Saturation %
                </h3>
                <div className="space-y-3">
                  {saturationData.publisherSaturation.map(item => <div key={item.publisher} className="cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors" onClick={() => setShowDrilldown(true)}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-card-foreground">{item.publisher}</span>
                        <span className="text-muted-foreground">{item.saturation}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${item.saturation >= 90 ? "bg-destructive" : item.saturation >= 75 ? "bg-primary" : "bg-yellow-500"}`} style={{
                    width: `${item.saturation}%`
                  }} />
                      </div>
                    </div>)}
                </div>
              </div>

              {/* Product by License Consumption - Donut style representation */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-base font-medium text-card-foreground mb-4">
                  Product by License Consumption
                </h3>
                <div className="flex items-center gap-6">
                  {/* Simple donut representation */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {saturationData.productConsumption.reduce((acc, item, idx) => {
                    const colors = ["hsl(var(--primary))", "hsl(var(--destructive))", "hsl(210, 100%, 65%)", "hsl(150, 60%, 50%)", "hsl(var(--muted))"];
                    const total = saturationData.productConsumption.reduce((s, i) => s + i.consumption, 0);
                    const prevOffset = acc.offset;
                    const percentage = item.consumption / total * 100;
                    const circumference = 2 * Math.PI * 40;
                    const strokeDasharray = `${percentage / 100 * circumference} ${circumference}`;
                    const strokeDashoffset = -(prevOffset / 100) * circumference;
                    acc.elements.push(<circle key={idx} cx="50" cy="50" r="40" fill="none" stroke={colors[idx]} strokeWidth="20" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />);
                    acc.offset += percentage;
                    return acc;
                  }, {
                    elements: [] as JSX.Element[],
                    offset: 0
                  }).elements}
                    </svg>
                  </div>
                  
                  {/* Legend */}
                  <div className="space-y-2 text-sm">
                    {saturationData.productConsumption.map((item, idx) => {
                  const colors = ["bg-primary", "bg-destructive", "bg-blue-400", "bg-green-500", "bg-muted"];
                  return <div key={item.product} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-sm ${colors[idx]}`} />
                          <span className="text-card-foreground">{item.product}</span>
                          <span className="text-muted-foreground">({item.consumption}%)</span>
                        </div>;
                })}
                  </div>
                </div>
              </div>
            </div>

            {/* Drilldown Table */}
            {showDrilldown && <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                  <h3 className="font-medium text-card-foreground flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Drilldown: License Details
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowDrilldown(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Publisher</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Country</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Consumption %</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Assigned Analysts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saturationData.drilldownData.map((row, idx) => <tr key={`${row.publisher}-${row.product}`} className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}>
                          <td className="px-4 py-3 font-medium text-primary">{row.publisher}</td>
                          <td className="px-4 py-3">{row.product}</td>
                          <td className="px-4 py-3">{row.country}</td>
                          <td className="px-4 py-3">
                            <span className={row.consumption >= 90 ? "text-destructive font-medium" : row.consumption >= 75 ? "text-primary" : "text-yellow-600"}>
                              {row.consumption}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{row.analysts}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>}
          </div>}
      </main>

      {/* =============================================
          DRAWERS & MODALS
       ============================================= */}

      {/* Processing Drawer */}
      <Sheet open={processingDrawerOpen} onOpenChange={setProcessingDrawerOpen}>
        <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              PO Details: {selectedRow?.poNumber}
            </SheetTitle>
          </SheetHeader>
          
          {selectedRow && <div className="mt-6 space-y-6">
              {/* PO Details Section */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PO Details
                </h4>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PO Number</span>
                    <span className="text-sm font-medium">{selectedRow.poNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Creation Date</span>
                    <span className="text-sm">{selectedRow.creationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contract Type</span>
                    <span className="text-sm">{selectedRow.contractType}</span>
                  </div>
                </div>
              </div>

              {/* Publisher & Contract Info */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Publisher & Contract Info
                </h4>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Publisher</span>
                    <span className="text-sm font-medium">{selectedRow.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contract Type</span>
                    <span className="text-sm">{selectedRow.contractType}</span>
                  </div>
                </div>
              </div>

              {/* Errors */}
              {selectedRow.errors > 0 && <div>
                  <h4 className="text-sm font-medium text-destructive mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Errors ({selectedRow.errors})
                  </h4>
                  <div className="space-y-2 bg-destructive/10 rounded-lg p-4">
                    <div className="text-sm text-destructive">• Missing required field: Cost Center</div>
                    {selectedRow.errors > 1 && <div className="text-sm text-destructive">• Invalid GL Account format</div>}
                    {selectedRow.errors > 2 && <div className="text-sm text-destructive">• Business Owner not assigned</div>}
                  </div>
                </div>}

              {/* Warnings */}
              {selectedRow.warnings > 0 && <div>
                  <h4 className="text-sm font-medium text-yellow-600 mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Warnings ({selectedRow.warnings})
                  </h4>
                  <div className="space-y-2 bg-yellow-500/10 rounded-lg p-4">
                    <div className="text-sm text-yellow-700">• Recommended: Add department code</div>
                    {selectedRow.warnings > 1 && <div className="text-sm text-yellow-700">• Contract end date approaching</div>}
                    {selectedRow.warnings > 2 && <div className="text-sm text-yellow-700">• Missing notes field</div>}
                  </div>
                </div>}

              {/* Business Rules Summary */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Business Rules Summary
                </h4>
                <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
                  {selectedRow.errors === 0 && selectedRow.warnings === 0 ? "All business rules passed. Ready for upload." : `${selectedRow.errors} error(s) and ${selectedRow.warnings} warning(s) require attention.`}
                </div>
              </div>

              {/* Link to Terzo */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Document Link
                </h4>
                <a href={selectedRow.docLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
                  View in Terzo
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1">
                  Ignore PO
                </Button>
                <Button className="flex-1" disabled={selectedRow.errors > 0}>
                  Mark Ready for Upload
                </Button>
              </div>
            </div>}
        </SheetContent>
      </Sheet>

      {/* Tracker Log Drawer */}
      <Sheet open={trackerDrawerOpen} onOpenChange={setTrackerDrawerOpen}>
        <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              Entitlement History: {selectedTrackerRow?.publisher}
            </SheetTitle>
          </SheetHeader>
          
          {selectedTrackerRow && <div className="mt-6 space-y-6">
              {/* Current Values */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Current Values
                </h4>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Baseline</span>
                    <span className="text-sm font-medium">{selectedTrackerRow.baseline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ELP</span>
                    <span className="text-sm font-medium">{selectedTrackerRow.elp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Analyst</span>
                    <span className="text-sm">{selectedTrackerRow.analyst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Engineer</span>
                    <span className="text-sm">{selectedTrackerRow.engineer}</span>
                  </div>
                </div>
              </div>

              {/* History Log */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Change History
                </h4>
                <div className="space-y-3">
                  {logHistory.map((log, idx) => <div key={idx} className="bg-muted/30 rounded-lg p-4 border-l-2 border-primary">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {log.updatedBy}
                        </Badge>
                      </div>
                      <p className="text-sm text-card-foreground">{log.changes}</p>
                    </div>)}
                </div>
              </div>
            </div>}
        </SheetContent>
      </Sheet>

      {/* Add Entry Modal */}
      <Dialog open={addEntryModalOpen} onOpenChange={setAddEntryModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Publisher</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select publisher" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {["Microsoft", "Oracle", "Adobe", "SAP", "Salesforce", "ServiceNow"].map(pub => <SelectItem key={pub} value={pub}>{pub}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Baseline</label>
                <Input placeholder="Enter baseline" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ELP</label>
                <Input placeholder="Enter ELP" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Analyst</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select analyst" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {["John Smith", "Jane Doe", "Mike Brown"].map(analyst => <SelectItem key={analyst} value={analyst}>{analyst}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Engineer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select engineer" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {["Sarah Lee", "Mike Chen", "Emily Wang"].map(eng => <SelectItem key={eng} value={eng}>{eng}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Add notes..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddEntryModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAddEntryModalOpen(false)}>
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default SoftwareEntitlement;