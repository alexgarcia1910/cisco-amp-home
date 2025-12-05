import { useState, useMemo } from "react";
import { ArrowLeft, ExternalLink, ChevronDown, Plus, X, ChevronLeft, ChevronRight, Clock, User, FileText, AlertTriangle, AlertCircle, PieChart, BarChart3, Monitor, Download, Filter, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
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
import { SearchableDropdown } from "@/components/SearchableDropdown";

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
const trackerData = [
  {
    publisher: "DATAENDURE",
    upcomingRenewal: "10/05/2026",
    analyst: "Divya Yadiapally",
    engineer: "Ryan Siegel",
    eb_dateDocsPulled: "04/10/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb1",
    eb_dateCompleted: "04/24/2025",
    contracts_dateDocsPulled: "",
    contracts_dateCompleted: "",
    refresh_dateDocsPulled: "",
    refresh_linkToDocuments: "",
    refresh_dateCompleted: "",
    elp_required: "Yes",
    elp_startDate: "",
    elp_linkToELP: "",
    elp_dateCompleted: ""
  },
  {
    publisher: "DENODO TECHNOLOGIES, INC",
    upcomingRenewal: "03/15/2025",
    analyst: "Linda Rodriguez",
    engineer: "Ryan Siegel",
    eb_dateDocsPulled: "02/15/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb2",
    eb_dateCompleted: "03/01/2025",
    contracts_dateDocsPulled: "03/02/2025",
    contracts_dateCompleted: "03/10/2025",
    refresh_dateDocsPulled: "",
    refresh_linkToDocuments: "",
    refresh_dateCompleted: "",
    elp_required: "Yes",
    elp_startDate: "03/12/2025",
    elp_linkToELP: "https://cisco.sharepoint.com/sites/elp/2",
    elp_dateCompleted: ""
  },
  {
    publisher: "DEQUE SYSTEMS, INC.",
    upcomingRenewal: "08/22/2025",
    analyst: "Divya Yadiapally",
    engineer: "Sarah Lee",
    eb_dateDocsPulled: "06/10/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb3",
    eb_dateCompleted: "",
    contracts_dateDocsPulled: "",
    contracts_dateCompleted: "",
    refresh_dateDocsPulled: "",
    refresh_linkToDocuments: "",
    refresh_dateCompleted: "",
    elp_required: "No",
    elp_startDate: "",
    elp_linkToELP: "",
    elp_dateCompleted: ""
  },
  {
    publisher: "DIAMOND IT, LLC",
    upcomingRenewal: "01/31/2026",
    analyst: "Mike Brown",
    engineer: "Emily Wang",
    eb_dateDocsPulled: "11/15/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb4",
    eb_dateCompleted: "11/28/2025",
    contracts_dateDocsPulled: "11/29/2025",
    contracts_dateCompleted: "12/05/2025",
    refresh_dateDocsPulled: "12/06/2025",
    refresh_linkToDocuments: "https://cisco.sharepoint.com/sites/refresh/4",
    refresh_dateCompleted: "",
    elp_required: "Yes",
    elp_startDate: "",
    elp_linkToELP: "",
    elp_dateCompleted: ""
  },
  {
    publisher: "DIGITAL.AI SOFTWARE, INC.",
    upcomingRenewal: "05/18/2025",
    analyst: "Jane Doe",
    engineer: "Mike Chen",
    eb_dateDocsPulled: "03/20/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb5",
    eb_dateCompleted: "04/02/2025",
    contracts_dateDocsPulled: "04/03/2025",
    contracts_dateCompleted: "04/10/2025",
    refresh_dateDocsPulled: "04/12/2025",
    refresh_linkToDocuments: "https://cisco.sharepoint.com/sites/refresh/5",
    refresh_dateCompleted: "04/20/2025",
    elp_required: "Yes",
    elp_startDate: "04/22/2025",
    elp_linkToELP: "https://cisco.sharepoint.com/sites/elp/5",
    elp_dateCompleted: "05/01/2025"
  },
  {
    publisher: "DOCUSIGN, INC.",
    upcomingRenewal: "12/10/2025",
    analyst: "Linda Rodriguez",
    engineer: "Sarah Lee",
    eb_dateDocsPulled: "10/01/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb6",
    eb_dateCompleted: "10/15/2025",
    contracts_dateDocsPulled: "10/16/2025",
    contracts_dateCompleted: "",
    refresh_dateDocsPulled: "",
    refresh_linkToDocuments: "",
    refresh_dateCompleted: "",
    elp_required: "Pending",
    elp_startDate: "",
    elp_linkToELP: "",
    elp_dateCompleted: ""
  },
  {
    publisher: "DYNATRACE LLC",
    upcomingRenewal: "07/25/2025",
    analyst: "Divya Yadiapally",
    engineer: "Ryan Siegel",
    eb_dateDocsPulled: "05/15/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb7",
    eb_dateCompleted: "05/28/2025",
    contracts_dateDocsPulled: "05/30/2025",
    contracts_dateCompleted: "06/08/2025",
    refresh_dateDocsPulled: "06/10/2025",
    refresh_linkToDocuments: "https://cisco.sharepoint.com/sites/refresh/7",
    refresh_dateCompleted: "06/20/2025",
    elp_required: "Yes",
    elp_startDate: "06/22/2025",
    elp_linkToELP: "",
    elp_dateCompleted: ""
  },
  {
    publisher: "ELASTIC N.V.",
    upcomingRenewal: "09/30/2025",
    analyst: "Mike Brown",
    engineer: "Emily Wang",
    eb_dateDocsPulled: "07/20/2025",
    eb_linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb8",
    eb_dateCompleted: "08/02/2025",
    contracts_dateDocsPulled: "08/04/2025",
    contracts_dateCompleted: "08/12/2025",
    refresh_dateDocsPulled: "",
    refresh_linkToDocuments: "",
    refresh_dateCompleted: "",
    elp_required: "No",
    elp_startDate: "",
    elp_linkToELP: "",
    elp_dateCompleted: ""
  }
];
// Agent Saturation - OS KPI Data
const osKpiData = [
  {
    os: "Linux",
    saturationPercent: 87,
    espRecords: 4250,
    flexeraRecords: 4180,
    gap: 70,
    agentsWithoutEsp: 145,
    espWithoutAgent: 75,
    scanAge: { 
      "0-30": { count: 3200, percent: 75.29 }, 
      "31-60": { count: 680, percent: 16.00 }, 
      "61-90": { count: 250, percent: 5.88 }, 
      "90+": { count: 120, percent: 2.82 } 
    }
  },
  {
    os: "Windows",
    saturationPercent: 92,
    espRecords: 8540,
    flexeraRecords: 8320,
    gap: 220,
    agentsWithoutEsp: 312,
    espWithoutAgent: 92,
    scanAge: { 
      "0-30": { count: 6800, percent: 79.63 }, 
      "31-60": { count: 1100, percent: 12.88 }, 
      "61-90": { count: 420, percent: 4.92 }, 
      "90+": { count: 220, percent: 2.58 } 
    }
  },
  {
    os: "Mac",
    saturationPercent: 78,
    espRecords: 2180,
    flexeraRecords: 2050,
    gap: 130,
    agentsWithoutEsp: 98,
    espWithoutAgent: 32,
    scanAge: { 
      "0-30": { count: 1650, percent: 75.69 }, 
      "31-60": { count: 320, percent: 14.68 }, 
      "61-90": { count: 140, percent: 6.42 }, 
      "90+": { count: 70, percent: 3.21 } 
    }
  }
];

const scanAgeDistribution = [
  { range: "0-30 Days", count: 11650, percent: 78, color: "bg-green-500" },
  { range: "31-60 Days", count: 2100, percent: 14, color: "bg-yellow-500" },
  { range: "61-90 Days", count: 810, percent: 5, color: "bg-orange-500" },
  { range: "90+ Days", count: 410, percent: 3, color: "bg-destructive" }
];

// Hosts/Servers trend data
const hostsTrendData = [
  { month: "2024-12-04", Linux: 45, Windows: 85, goal: 90 },
  { month: "2025-01-30", Linux: 58, Windows: 84, goal: 90 },
  { month: "2025-02-01", Linux: 60, Windows: 85, goal: 90 },
  { month: "2025-03-01", Linux: 55, Windows: 84, goal: 90 },
  { month: "2025-04-01", Linux: 52, Windows: 83, goal: 90 },
  { month: "2025-05-01", Linux: 68, Windows: 85, goal: 90 },
  { month: "2025-06-10", Linux: 82, Windows: 84, goal: 90 },
  { month: "2025-07-01", Linux: 84, Windows: 82, goal: 90 },
  { month: "2025-08-31", Linux: 80, Windows: 78, goal: 90 },
  { month: "2025-09-09", Linux: 78, Windows: 80, goal: 90 },
  { month: "2025-10-31", Linux: 75, Windows: 79, goal: 90 },
  { month: "2025-11-30", Linux: 72, Windows: 82, goal: 90 },
  { month: "2025-12-02", Linux: 72, Windows: 80, goal: 90 }
];

// Laptop/Desktop KPI data (Mac, Windows, Linux)
const laptopKpiData = [
  {
    os: "Mac",
    saturationPercent: 100,
    espRecords: 9260,
    flexeraRecords: 75810,
    gap: -66550,
    agentsWithoutEsp: 69176,
    espWithoutAgent: 2969,
    scanAge: { 
      "0-30": { count: 68967, percent: 90.97 }, 
      "31-60": { count: 3810, percent: 5.03 }, 
      "61-90": { count: 2811, percent: 3.71 }, 
      "90+": { count: 222, percent: 0.29 } 
    }
  },
  {
    os: "Windows",
    saturationPercent: 100,
    espRecords: 6082,
    flexeraRecords: 67448,
    gap: -61366,
    agentsWithoutEsp: 63164,
    espWithoutAgent: 1897,
    scanAge: { 
      "0-30": { count: 59509, percent: 88.23 }, 
      "31-60": { count: 4307, percent: 6.39 }, 
      "61-90": { count: 3471, percent: 5.15 }, 
      "90+": { count: 161, percent: 0.24 } 
    }
  },
  {
    os: "Linux",
    saturationPercent: null,
    espRecords: 0,
    flexeraRecords: 396,
    gap: -396,
    agentsWithoutEsp: 377,
    espWithoutAgent: 0,
    scanAge: { 
      "0-30": { count: 19, percent: 4.80 }, 
      "31-60": { count: 331, percent: 83.59 }, 
      "61-90": { count: 44, percent: 11.11 }, 
      "90+": { count: 2, percent: 0.51 } 
    }
  }
];

// Laptop/Desktop trend data
const laptopTrendData = [
  { month: "2024-12-04", Mac: 95, Windows: 92, goal: 90 },
  { month: "2025-01-30", Mac: 96, Windows: 91, goal: 90 },
  { month: "2025-02-01", Mac: 97, Windows: 90, goal: 90 },
  { month: "2025-03-01", Mac: 96, Windows: 89, goal: 90 },
  { month: "2025-04-01", Mac: 95, Windows: 88, goal: 90 },
  { month: "2025-05-01", Mac: 97, Windows: 90, goal: 90 },
  { month: "2025-06-10", Mac: 98, Windows: 91, goal: 90 },
  { month: "2025-07-01", Mac: 99, Windows: 89, goal: 90 },
  { month: "2025-08-31", Mac: 98, Windows: 85, goal: 90 },
  { month: "2025-09-09", Mac: 97, Windows: 84, goal: 90 },
  { month: "2025-10-31", Mac: 99, Windows: 88, goal: 90 },
  { month: "2025-11-30", Mac: 100, Windows: 90, goal: 90 },
  { month: "2025-12-02", Mac: 100, Windows: 89, goal: 90 }
];

const agentDrilldownData = [
  { name: "srv-linux-001", deviceType: "Server", status: "Active", ipAddress: "10.0.1.15", serialNumber: "SN-L001", os: "Linux", macAddress: "00:1A:2B:3C:4D:5E", computerId: "CMP-001", assetId: "AST-L001" },
  { name: "ws-win-045", deviceType: "Workstation", status: "Active", ipAddress: "10.0.2.45", serialNumber: "SN-W045", os: "Windows", macAddress: "00:1A:2B:3C:4D:5F", computerId: "CMP-045", assetId: "AST-W045" },
  { name: "mbp-mac-012", deviceType: "Laptop", status: "Active", ipAddress: "10.0.3.12", serialNumber: "SN-M012", os: "Mac", macAddress: "00:1A:2B:3C:4D:60", computerId: "CMP-012", assetId: "AST-M012" },
  { name: "srv-linux-002", deviceType: "Server", status: "Inactive", ipAddress: "10.0.1.16", serialNumber: "SN-L002", os: "Linux", macAddress: "00:1A:2B:3C:4D:61", computerId: "CMP-002", assetId: "AST-L002" },
  { name: "ws-win-046", deviceType: "Workstation", status: "Active", ipAddress: "10.0.2.46", serialNumber: "SN-W046", os: "Windows", macAddress: "00:1A:2B:3C:4D:62", computerId: "CMP-046", assetId: "AST-W046" },
  { name: "srv-linux-003", deviceType: "Server", status: "Active", ipAddress: "10.0.1.17", serialNumber: "SN-L003", os: "Linux", macAddress: "00:1A:2B:3C:4D:63", computerId: "CMP-003", assetId: "AST-L003" },
  { name: "mbp-mac-013", deviceType: "Laptop", status: "Active", ipAddress: "10.0.3.13", serialNumber: "SN-M013", os: "Mac", macAddress: "00:1A:2B:3C:4D:64", computerId: "CMP-013", assetId: "AST-M013" },
  { name: "ws-win-047", deviceType: "Workstation", status: "Warning", ipAddress: "10.0.2.47", serialNumber: "SN-W047", os: "Windows", macAddress: "00:1A:2B:3C:4D:65", computerId: "CMP-047", assetId: "AST-W047" },
  { name: "srv-linux-004", deviceType: "Server", status: "Active", ipAddress: "10.0.1.18", serialNumber: "SN-L004", os: "Linux", macAddress: "00:1A:2B:3C:4D:66", computerId: "CMP-004", assetId: "AST-L004" },
  { name: "ws-win-048", deviceType: "Workstation", status: "Active", ipAddress: "10.0.2.48", serialNumber: "SN-W048", os: "Windows", macAddress: "00:1A:2B:3C:4D:67", computerId: "CMP-048", assetId: "AST-W048" }
];
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
  const [trackerRowsPerPage, setTrackerRowsPerPage] = useState(100);
  const [trackerFilters, setTrackerFilters] = useState<{ publisher: string; analyst: string; engineer: string; elpRequired: string }>({
    publisher: "",
    analyst: "",
    engineer: "",
    elpRequired: ""
  });

  const filteredTrackerData = useMemo(() => {
    return trackerData.filter(row => {
      if (trackerFilters.publisher && row.publisher !== trackerFilters.publisher) return false;
      if (trackerFilters.analyst && row.analyst !== trackerFilters.analyst) return false;
      if (trackerFilters.engineer && row.engineer !== trackerFilters.engineer) return false;
      if (trackerFilters.elpRequired && row.elp_required !== trackerFilters.elpRequired) return false;
      return true;
    });
  }, [trackerFilters]);

  const clearTrackerFilters = () => {
    setTrackerFilters({ publisher: "", analyst: "", engineer: "", elpRequired: "" });
  };

  const hasActiveTrackerFilters = Object.values(trackerFilters).some(v => v !== "");

  // Section 3: Agent Saturation state
  const [saturationView, setSaturationView] = useState<"dashboard" | "drilldown">("dashboard");
  const [drilldownContext, setDrilldownContext] = useState<{ title: string; os?: string; metric?: string }>({ title: "" });
  const [saturationFilters, setSaturationFilters] = useState<{ field: string; values: string[] }[]>([]);
  const [saturationFilterModalOpen, setSaturationFilterModalOpen] = useState(false);
  const [saturationRowsPerPage, setSaturationRowsPerPage] = useState(100);
  const [drilldownSortColumn, setDrilldownSortColumn] = useState<string | null>(null);
  const [drilldownSortDirection, setDrilldownSortDirection] = useState<'asc' | 'desc'>('asc');

  // Column to key mapping for drilldown table
  const drilldownColumnToKeyMap: Record<string, keyof typeof agentDrilldownData[0]> = {
    "Name": "name",
    "Device Type": "deviceType",
    "Status": "status",
    "IP Address": "ipAddress",
    "Serial Number": "serialNumber",
    "Operating System": "os",
    "MAC Address": "macAddress",
    "Computer ID": "computerId",
    "Asset ID": "assetId"
  };

  // Sort drilldown data
  const sortedDrilldownData = useMemo(() => {
    if (!drilldownSortColumn) return agentDrilldownData;
    
    const key = drilldownColumnToKeyMap[drilldownSortColumn];
    if (!key) return agentDrilldownData;
    
    return [...agentDrilldownData].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      return drilldownSortDirection === 'asc' 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [drilldownSortColumn, drilldownSortDirection]);

  const handleDrilldownSort = (col: string) => {
    if (drilldownSortColumn === col) {
      setDrilldownSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setDrilldownSortColumn(col);
      setDrilldownSortDirection('asc');
    }
  };

  const getDrilldownSortIcon = (col: string) => {
    if (drilldownSortColumn !== col) {
      return <ArrowUpDown className="h-4 w-4 opacity-0 group-hover:opacity-50" />;
    }
    return drilldownSortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  const handleDrilldown = (title: string, os?: string, metric?: string) => {
    setDrilldownContext({ title, os, metric });
    setSaturationView("drilldown");
  };

  const handleBackToDashboard = () => {
    setSaturationView("dashboard");
    setSaturationFilters([]);
  };

  const removeSaturationFilter = (field: string) => {
    setSaturationFilters(saturationFilters.filter(f => f.field !== field));
  };
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
                Entitlement Tracker: Dashboard
              </h1>
              <Button className="gap-2" onClick={() => setAddEntryModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Entry
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <SearchableDropdown
                label="S/W Publishers"
                options={[...new Set(trackerData.map(d => d.publisher))]}
                value={trackerFilters.publisher}
                onChange={(val) => setTrackerFilters(prev => ({ ...prev, publisher: val }))}
                placeholder="Search publishers..."
              />

              <SearchableDropdown
                label="Analyst"
                options={[...new Set(trackerData.map(d => d.analyst))]}
                value={trackerFilters.analyst}
                onChange={(val) => setTrackerFilters(prev => ({ ...prev, analyst: val }))}
                placeholder="Search analysts..."
              />

              <SearchableDropdown
                label="Engineer"
                options={[...new Set(trackerData.map(d => d.engineer))]}
                value={trackerFilters.engineer}
                onChange={(val) => setTrackerFilters(prev => ({ ...prev, engineer: val }))}
                placeholder="Search engineers..."
              />

              <SearchableDropdown
                label="ELP Required"
                options={["Yes", "No", "Pending"]}
                value={trackerFilters.elpRequired}
                onChange={(val) => setTrackerFilters(prev => ({ ...prev, elpRequired: val }))}
                placeholder="Search..."
              />

              {hasActiveTrackerFilters && (
                <Button variant="ghost" onClick={clearTrackerFilters} className="gap-2 text-destructive hover:text-destructive">
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Tracker Table with Grouped Headers */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[1400px]">
                  {/* Category Header Row */}
                  <thead>
                    <tr className="border-b border-border">
                      <th colSpan={4} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide bg-card border-r border-border"></th>
                      <th colSpan={3} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white bg-green-600 border-r border-border">
                        Entitlement Baseline
                      </th>
                      <th colSpan={2} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white bg-yellow-600 border-r border-border">
                        Contracts
                      </th>
                      <th colSpan={3} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white bg-primary border-r border-border">
                        Entitlement Refresh
                      </th>
                      <th colSpan={4} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white bg-purple-600">
                        Effective License Position
                      </th>
                    </tr>
                    {/* Column Header Row */}
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">S/W Publishers</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Upcoming Renewal</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Analyst</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap border-r border-border">Engineer</th>
                      {/* Entitlement Baseline */}
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-green-50 dark:bg-green-950/30">Date Docs Pulled</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-green-50 dark:bg-green-950/30">Link To Documents</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-green-50 dark:bg-green-950/30 border-r border-border">Date Completed</th>
                      {/* Contracts */}
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-yellow-50 dark:bg-yellow-950/30">Date Docs Pulled</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-yellow-50 dark:bg-yellow-950/30 border-r border-border">Date Completed</th>
                      {/* Entitlement Refresh */}
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-blue-50 dark:bg-blue-950/30">Date Docs Pulled</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-blue-50 dark:bg-blue-950/30">Link To Documents</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-blue-50 dark:bg-blue-950/30 border-r border-border">Date Completed</th>
                      {/* ELP */}
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30">ELP Required</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30">Start Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30">Link To ELP</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30">Date Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrackerData.map((row, idx) => (
                      <tr 
                        key={row.publisher} 
                        onClick={() => {
                          setSelectedTrackerRow(row);
                          setTrackerDrawerOpen(true);
                        }} 
                        className={`border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                      >
                        <td className="px-3 py-2 font-medium text-primary whitespace-nowrap">{row.publisher}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{row.upcomingRenewal || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{row.analyst}</td>
                        <td className="px-3 py-2 whitespace-nowrap border-r border-border">{row.engineer}</td>
                        {/* Entitlement Baseline */}
                        <td className="px-3 py-2 whitespace-nowrap bg-green-50/50 dark:bg-green-950/20">{row.eb_dateDocsPulled || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap bg-green-50/50 dark:bg-green-950/20">
                          {row.eb_linkToDocuments ? (
                            <a href={row.eb_linkToDocuments} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap bg-green-50/50 dark:bg-green-950/20 border-r border-border">{row.eb_dateCompleted || "-"}</td>
                        {/* Contracts */}
                        <td className="px-3 py-2 whitespace-nowrap bg-yellow-50/50 dark:bg-yellow-950/20">{row.contracts_dateDocsPulled || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap bg-yellow-50/50 dark:bg-yellow-950/20 border-r border-border">{row.contracts_dateCompleted || "-"}</td>
                        {/* Entitlement Refresh */}
                        <td className="px-3 py-2 whitespace-nowrap bg-blue-50/50 dark:bg-blue-950/20">{row.refresh_dateDocsPulled || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap bg-blue-50/50 dark:bg-blue-950/20">
                          {row.refresh_linkToDocuments ? (
                            <a href={row.refresh_linkToDocuments} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap bg-blue-50/50 dark:bg-blue-950/20 border-r border-border">{row.refresh_dateCompleted || "-"}</td>
                        {/* ELP */}
                        <td className="px-3 py-2 whitespace-nowrap bg-purple-50/50 dark:bg-purple-950/20">
                          <Badge variant={row.elp_required === "Yes" ? "default" : row.elp_required === "No" ? "secondary" : "outline"} className="text-xs">
                            {row.elp_required}
                          </Badge>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap bg-purple-50/50 dark:bg-purple-950/20">{row.elp_startDate || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap bg-purple-50/50 dark:bg-purple-950/20">
                          {row.elp_linkToELP ? (
                            <a href={row.elp_linkToELP} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap bg-purple-50/50 dark:bg-purple-950/20">{row.elp_dateCompleted || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Items per page:</span>
                  <Select value={String(trackerRowsPerPage)} onValueChange={v => setTrackerRowsPerPage(Number(v))}>
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
                  <span className="text-sm text-muted-foreground">1-{filteredTrackerData.length} of {filteredTrackerData.length}</span>
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
            SECTION 3: AGENT SATURATION
         ============================================= */}
        {activeTab === "saturation" && <div className="space-y-6">
            {/* Dashboard View */}
            {saturationView === "dashboard" && <>
              {/* Title */}
              <h1 className="text-xl font-semibold text-card-foreground">
                Agent Saturation Dashboard
              </h1>

              {/* HOSTS/SERVERS SECTION */}
              <div className="border-b border-border pb-2">
                <h2 className="text-lg font-semibold text-card-foreground">
                  Hosts/Servers: <span className="text-primary">75.19%</span> Saturation
                </h2>
              </div>

              {/* Host/Server OS KPI Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {osKpiData.filter(os => os.os !== "Mac").map((osData) => (
                  <div key={osData.os} className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${osData.os === "Linux" ? "bg-orange-500/10" : osData.os === "Windows" ? "bg-primary/10" : "bg-gray-500/10"}`}>
                        <Monitor className={`h-5 w-5 ${osData.os === "Linux" ? "text-orange-500" : osData.os === "Windows" ? "text-primary" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{osData.os}</h3>
                        <span className={`text-lg font-bold ${osData.saturationPercent >= 90 ? "text-green-600" : osData.saturationPercent >= 75 ? "text-primary" : "text-yellow-600"}`}>
                          {osData.saturationPercent}% Saturation
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">ESP Records</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — ESP Records`, osData.os, "esp")}
                          className="text-primary hover:underline font-medium"
                        >
                          {osData.espRecords.toLocaleString()}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Flexera Records</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — Flexera Records`, osData.os, "flexera")}
                          className="text-primary hover:underline font-medium"
                        >
                          {osData.flexeraRecords.toLocaleString()}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">GAP</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — GAP Analysis`, osData.os, "gap")}
                          className="text-destructive hover:underline font-medium"
                        >
                          {osData.gap}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Agents without ESP</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — Agents without ESP Record`, osData.os, "noEsp")}
                          className="text-yellow-600 hover:underline font-medium"
                        >
                          {osData.agentsWithoutEsp}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">ESP without Agent</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — ESP Records without Agent`, osData.os, "noAgent")}
                          className="text-yellow-600 hover:underline font-medium"
                        >
                          {osData.espWithoutAgent}
                        </button>
                      </div>

                      {/* Scan Age Buckets - Mini Cards */}
                      <div className="pt-3 mt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Scanned Age</span>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 0-30 days`, osData.os, "scan0-30")}
                            className="bg-green-500/10 hover:bg-green-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">0-30</div>
                            <div className="text-sm font-semibold text-green-600">{osData.scanAge["0-30"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["0-30"].percent}%</div>
                          </button>
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 31-60 days`, osData.os, "scan31-60")}
                            className="bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">31-60</div>
                            <div className="text-sm font-semibold text-yellow-600">{osData.scanAge["31-60"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["31-60"].percent}%</div>
                          </button>
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 61-90 days`, osData.os, "scan61-90")}
                            className="bg-orange-500/10 hover:bg-orange-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">61-90</div>
                            <div className="text-sm font-semibold text-orange-600">{osData.scanAge["61-90"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["61-90"].percent}%</div>
                          </button>
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 90+ days`, osData.os, "scan90+")}
                            className="bg-red-500/10 hover:bg-red-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">90+</div>
                            <div className="text-sm font-semibold text-red-600">{osData.scanAge["90+"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["90+"].percent}%</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hosts/Servers Saturation Trend Chart */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-base font-medium text-card-foreground mb-4">
                  Hosts/Servers Saturation Trend
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hostsTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        formatter={(value: number, name: string) => [name === "goal" ? `${value}%` : value, name === "goal" ? "90% Saturation Goal" : name]}
                      />
                      <Legend 
                        formatter={(value) => value === "goal" ? "90% Saturation Goal" : value}
                      />
                      <Line type="monotone" dataKey="goal" name="90% Saturation Goal" stroke="#84cc16" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#84cc16", r: 3 }} />
                      <Line type="monotone" dataKey="Linux" stroke="#22d3ee" strokeWidth={2} dot={{ fill: "#22d3ee", r: 4 }} />
                      <Line type="monotone" dataKey="Windows" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* LAPTOP/DESKTOP SECTION */}
              <div className="border-b border-border pb-2 mt-8">
                <h2 className="text-lg font-semibold text-card-foreground">
                  Laptop/Desktop: <span className="text-primary">936.34%</span> Saturation
                </h2>
              </div>

              {/* Laptop/Desktop OS KPI Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {laptopKpiData.map((osData) => (
                  <div key={osData.os} className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${osData.os === "Mac" ? "bg-cyan-500/10" : osData.os === "Windows" ? "bg-cyan-500/10" : "bg-gray-500/10"}`}>
                        <Monitor className={`h-5 w-5 ${osData.os === "Mac" ? "text-cyan-500" : osData.os === "Windows" ? "text-cyan-500" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{osData.os}</h3>
                        <span className={`text-lg font-bold ${osData.saturationPercent === null ? "text-gray-500" : osData.saturationPercent >= 90 ? "text-green-600" : osData.saturationPercent >= 75 ? "text-primary" : "text-yellow-600"}`}>
                          {osData.saturationPercent === null ? "N/A" : `${osData.saturationPercent}%`} Saturation
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">ESP Records</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — ESP Records`, osData.os, "esp")}
                          className="text-primary hover:underline font-medium"
                        >
                          {osData.espRecords.toLocaleString()}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Flexera Records</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — Flexera Records`, osData.os, "flexera")}
                          className="text-primary hover:underline font-medium"
                        >
                          {osData.flexeraRecords.toLocaleString()}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">GAP</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — GAP Analysis`, osData.os, "gap")}
                          className={`hover:underline font-medium ${osData.gap < 0 ? "text-destructive" : "text-destructive"}`}
                        >
                          {osData.gap.toLocaleString()}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Agents w/o ESP Record</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — Agents without ESP Record`, osData.os, "noEsp")}
                          className="text-yellow-600 hover:underline font-medium"
                        >
                          {osData.agentsWithoutEsp.toLocaleString()}
                        </button>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground">ESP Record w/o Agent</span>
                        <button 
                          onClick={() => handleDrilldown(`${osData.os} — ESP Records without Agent`, osData.os, "noAgent")}
                          className="text-yellow-600 hover:underline font-medium"
                        >
                          {osData.espWithoutAgent.toLocaleString()}
                        </button>
                      </div>

                      {/* Scan Age Buckets - Mini Cards */}
                      <div className="pt-3 mt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Scanned Age</span>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 0-30 days`, osData.os, "scan0-30")}
                            className="bg-green-500/10 hover:bg-green-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">0-30</div>
                            <div className="text-sm font-semibold text-green-600">{osData.scanAge["0-30"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["0-30"].percent}%</div>
                          </button>
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 31-60 days`, osData.os, "scan31-60")}
                            className="bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">31-60</div>
                            <div className="text-sm font-semibold text-yellow-600">{osData.scanAge["31-60"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["31-60"].percent}%</div>
                          </button>
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 61-90 days`, osData.os, "scan61-90")}
                            className="bg-orange-500/10 hover:bg-orange-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">61-90</div>
                            <div className="text-sm font-semibold text-orange-600">{osData.scanAge["61-90"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["61-90"].percent}%</div>
                          </button>
                          <button 
                            onClick={() => handleDrilldown(`${osData.os} — Scanned 90+ days`, osData.os, "scan90+")}
                            className="bg-red-500/10 hover:bg-red-500/20 rounded-lg p-2 text-center transition-colors"
                          >
                            <div className="text-xs text-muted-foreground">90+</div>
                            <div className="text-sm font-semibold text-red-600">{osData.scanAge["90+"].count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{osData.scanAge["90+"].percent}%</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Laptop/Desktop Saturation Trend Chart */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-base font-medium text-card-foreground mb-4">
                  Laptop/Desktop Saturation Trend
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={laptopTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        formatter={(value: number, name: string) => [name === "goal" ? `${value}%` : value, name === "goal" ? "90% Saturation Goal" : name]}
                      />
                      <Legend 
                        formatter={(value) => value === "goal" ? "90% Saturation Goal" : value}
                      />
                      <Line type="monotone" dataKey="goal" name="90% Saturation Goal" stroke="#84cc16" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#84cc16", r: 3 }} />
                      <Line type="monotone" dataKey="Mac" stroke="#22d3ee" strokeWidth={2} dot={{ fill: "#22d3ee", r: 4 }} />
                      <Line type="monotone" dataKey="Windows" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>}

            {/* Drilldown Detail View */}
            {saturationView === "drilldown" && <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleBackToDashboard}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Button>
                  <h1 className="text-xl font-semibold text-card-foreground">
                    {drilldownContext.title}
                  </h1>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              {/* Global Filter Bar */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center flex-wrap gap-3">
                  <span className="text-sm text-muted-foreground font-medium">Filtered:</span>
                  
                  {saturationFilters.length === 0 && (
                    <span className="text-sm text-muted-foreground italic">No Filters</span>
                  )}
                  
                  {saturationFilters.map((filter) => (
                    <Badge 
                      key={filter.field} 
                      variant="secondary" 
                      className="gap-1 pr-1"
                    >
                      {filter.field}: {filter.values.join(", ")}
                      <button 
                        onClick={() => removeSaturationFilter(filter.field)}
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setSaturationFilterModalOpen(true)}
                  >
                    <Filter className="h-4 w-4" />
                    Add Filter
                  </Button>

                  {saturationFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSaturationFilters([])}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Detail Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border sticky top-0">
                      <tr>
                        {["Name", "Device Type", "Status", "IP Address", "Serial Number", "Operating System", "MAC Address", "Computer ID", "Asset ID"].map((col) => (
                          <th 
                            key={col}
                            className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors group"
                            onClick={() => handleDrilldownSort(col)}
                          >
                            <div className="flex items-center gap-2">
                              {col}
                              {getDrilldownSortIcon(col)}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedDrilldownData.map((row, idx) => (
                        <tr 
                          key={row.computerId} 
                          className={`border-b border-border hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                        >
                          <td className="px-4 py-3 font-medium text-primary">{row.name}</td>
                          <td className="px-4 py-3">{row.deviceType}</td>
                          <td className="px-4 py-3">
                            <Badge 
                              variant={row.status === "Active" ? "default" : row.status === "Warning" ? "secondary" : "outline"}
                              className={row.status === "Active" ? "bg-green-500" : row.status === "Warning" ? "bg-yellow-500" : ""}
                            >
                              {row.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">{row.ipAddress}</td>
                          <td className="px-4 py-3">{row.serialNumber}</td>
                          <td className="px-4 py-3">{row.os}</td>
                          <td className="px-4 py-3 font-mono text-xs">{row.macAddress}</td>
                          <td className="px-4 py-3">{row.computerId}</td>
                          <td className="px-4 py-3">{row.assetId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Items per page:</span>
                    <Select value={String(saturationRowsPerPage)} onValueChange={(v) => setSaturationRowsPerPage(Number(v))}>
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
            </>}
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
              Entitlement Details: {selectedTrackerRow?.publisher}
            </SheetTitle>
          </SheetHeader>
          
          {selectedTrackerRow && <div className="mt-6 space-y-6">
              {/* General Info */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">General Information</h4>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Publisher</span>
                    <span className="text-sm font-medium">{selectedTrackerRow.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming Renewal</span>
                    <span className="text-sm font-medium">{selectedTrackerRow.upcomingRenewal || "-"}</span>
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

              {/* Entitlement Baseline */}
              <div>
                <h4 className="text-sm font-medium text-green-600 mb-3">Entitlement Baseline</h4>
                <div className="space-y-3 bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Docs Pulled</span>
                    <span className="text-sm">{selectedTrackerRow.eb_dateDocsPulled || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Link To Documents</span>
                    {selectedTrackerRow.eb_linkToDocuments ? (
                      <a href={selectedTrackerRow.eb_linkToDocuments} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <span className="text-sm">-</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Completed</span>
                    <span className="text-sm">{selectedTrackerRow.eb_dateCompleted || "-"}</span>
                  </div>
                </div>
              </div>

              {/* Contracts */}
              <div>
                <h4 className="text-sm font-medium text-yellow-600 mb-3">Contracts</h4>
                <div className="space-y-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Docs Pulled</span>
                    <span className="text-sm">{selectedTrackerRow.contracts_dateDocsPulled || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Completed</span>
                    <span className="text-sm">{selectedTrackerRow.contracts_dateCompleted || "-"}</span>
                  </div>
                </div>
              </div>

              {/* Entitlement Refresh */}
              <div>
                <h4 className="text-sm font-medium text-primary mb-3">Entitlement Refresh</h4>
                <div className="space-y-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Docs Pulled</span>
                    <span className="text-sm">{selectedTrackerRow.refresh_dateDocsPulled || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Link To Documents</span>
                    {selectedTrackerRow.refresh_linkToDocuments ? (
                      <a href={selectedTrackerRow.refresh_linkToDocuments} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <span className="text-sm">-</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Completed</span>
                    <span className="text-sm">{selectedTrackerRow.refresh_dateCompleted || "-"}</span>
                  </div>
                </div>
              </div>

              {/* Effective License Position */}
              <div>
                <h4 className="text-sm font-medium text-purple-600 mb-3">Effective License Position</h4>
                <div className="space-y-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ELP Required</span>
                    <Badge variant={selectedTrackerRow.elp_required === "Yes" ? "default" : selectedTrackerRow.elp_required === "No" ? "secondary" : "outline"} className="text-xs">
                      {selectedTrackerRow.elp_required}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <span className="text-sm">{selectedTrackerRow.elp_startDate || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Link To ELP</span>
                    {selectedTrackerRow.elp_linkToELP ? (
                      <a href={selectedTrackerRow.elp_linkToELP} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <span className="text-sm">-</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date Completed</span>
                    <span className="text-sm">{selectedTrackerRow.elp_dateCompleted || "-"}</span>
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
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">S/W Publisher</label>
                <Input placeholder="Enter publisher name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Upcoming Renewal</label>
                <Input type="date" />
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
                    {["Divya Yadiapally", "Linda Rodriguez", "Mike Brown", "Jane Doe"].map(analyst => <SelectItem key={analyst} value={analyst}>{analyst}</SelectItem>)}
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
                    {["Ryan Siegel", "Sarah Lee", "Mike Chen", "Emily Wang"].map(eng => <SelectItem key={eng} value={eng}>{eng}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Entitlement Baseline Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-green-600 mb-3">Entitlement Baseline</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Docs Pulled</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Completed</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <label className="text-sm font-medium">Link To Documents</label>
                <Input placeholder="https://..." />
              </div>
            </div>

            {/* Contracts Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-yellow-600 mb-3">Contracts</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Docs Pulled</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Completed</label>
                  <Input type="date" />
                </div>
              </div>
            </div>

            {/* ELP Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-purple-600 mb-3">Effective License Position</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ELP Required</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <label className="text-sm font-medium">Link To ELP</label>
                <Input placeholder="https://..." />
              </div>
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

      {/* Saturation Filter Modal */}
      <Dialog open={saturationFilterModalOpen} onOpenChange={setSaturationFilterModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Filter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Field</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a field" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="deviceType">Device Type</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="os">Operating System</SelectItem>
                  <SelectItem value="ipAddress">IP Address</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Value(s)</label>
              <div className="border border-border rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                {["Server", "Workstation", "Laptop"].map((value) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded">
                    <Checkbox />
                    <span className="text-sm">{value}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaturationFilterModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setSaturationFilters([...saturationFilters, { field: "Device Type", values: ["Server", "Workstation"] }]);
              setSaturationFilterModalOpen(false);
            }}>
              Apply Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default SoftwareEntitlement;