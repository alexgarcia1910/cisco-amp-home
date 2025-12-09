import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, ExternalLink, ChevronDown, Plus, X, ChevronLeft, ChevronRight, Clock, User, FileText, AlertTriangle, AlertCircle, PieChart, BarChart3, Monitor, Download, Filter, ArrowUp, ArrowDown, ArrowUpDown, LayoutGrid, Save, Upload, FileCheck, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchableDropdown } from "@/components/SearchableDropdown";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  readyForUpload: false,
  submittedBy: ""
}, {
  poNumber: "PO-2024-002",
  contractType: "Volume",
  publisher: "Oracle",
  creationDate: "2024-01-20",
  errors: 0,
  warnings: 3,
  docLink: "https://terzo.example.com/doc/002",
  readyForUpload: true,
  submittedBy: "John Smith"
}, {
  poNumber: "PO-2024-003",
  contractType: "Subscription",
  publisher: "Adobe",
  creationDate: "2024-02-01",
  errors: 1,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/003",
  readyForUpload: false,
  submittedBy: ""
}, {
  poNumber: "PO-2024-004",
  contractType: "Perpetual",
  publisher: "SAP",
  creationDate: "2024-02-10",
  errors: 0,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/004",
  readyForUpload: true,
  submittedBy: "Sarah Johnson"
}, {
  poNumber: "PO-2024-005",
  contractType: "Enterprise",
  publisher: "Salesforce",
  creationDate: "2024-02-15",
  errors: 3,
  warnings: 2,
  docLink: "https://terzo.example.com/doc/005",
  readyForUpload: false,
  submittedBy: ""
}, {
  poNumber: "PO-2024-006",
  contractType: "Volume",
  publisher: "ServiceNow",
  creationDate: "2024-02-20",
  errors: 0,
  warnings: 1,
  docLink: "https://terzo.example.com/doc/006",
  readyForUpload: true,
  submittedBy: "Michael Chen"
}, {
  poNumber: "PO-2024-007",
  contractType: "Subscription",
  publisher: "Workday",
  creationDate: "2024-03-01",
  errors: 0,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/007",
  readyForUpload: true,
  submittedBy: "Emily Davis"
}, {
  poNumber: "PO-2024-008",
  contractType: "Enterprise",
  publisher: "VMware",
  creationDate: "2024-03-05",
  errors: 1,
  warnings: 2,
  docLink: "https://terzo.example.com/doc/008",
  readyForUpload: false,
  submittedBy: ""
}, {
  poNumber: "PO-2024-009",
  contractType: "Perpetual",
  publisher: "Splunk",
  creationDate: "2024-03-10",
  errors: 0,
  warnings: 4,
  docLink: "https://terzo.example.com/doc/009",
  readyForUpload: true,
  submittedBy: "Robert Williams"
}, {
  poNumber: "PO-2024-010",
  contractType: "Volume",
  publisher: "Tableau",
  creationDate: "2024-03-15",
  errors: 2,
  warnings: 0,
  docLink: "https://terzo.example.com/doc/010",
  readyForUpload: false,
  submittedBy: ""
}];

// Processed entitlements data
const processedEntitlementData = [{
  poNumber: "USA000EP139301",
  publisher: "1Password",
  docLink: "https://cisco.terzocloud.com/b/contracts/214147",
  submittedBy: "achikoti",
  dateUploaded: "05/08/2025"
}, {
  poNumber: "USA000EP184197",
  publisher: "1Password",
  docLink: "https://cisco.terzocloud.com/b/contracts/214146",
  submittedBy: "achikoti",
  dateUploaded: "05/08/2025"
}, {
  poNumber: "USA000EP103284",
  publisher: "1Password",
  docLink: "https://cisco.terzocloud.com/b/contracts/214145",
  submittedBy: "achikoti",
  dateUploaded: "05/08/2025"
}, {
  poNumber: "USA000EP192847",
  publisher: "1Password",
  docLink: "https://cisco.terzocloud.com/b/contracts/214144",
  submittedBy: "achikoti",
  dateUploaded: "05/09/2025"
}, {
  poNumber: "USA000EP156293",
  publisher: "1Password",
  docLink: "https://cisco.terzocloud.com/b/contracts/214143",
  submittedBy: "achikoti",
  dateUploaded: "04/24/2025"
}, {
  poNumber: "USA000EP174829",
  publisher: "Microsoft",
  docLink: "https://cisco.terzocloud.com/b/contracts/214142",
  submittedBy: "jsmith",
  dateUploaded: "05/08/2025"
}, {
  poNumber: "USA000EP128374",
  publisher: "Microsoft",
  docLink: "https://cisco.terzocloud.com/b/contracts/214141",
  submittedBy: "jsmith",
  dateUploaded: "05/07/2025"
}, {
  poNumber: "USA000EP193847",
  publisher: "Oracle",
  docLink: "https://cisco.terzocloud.com/b/contracts/214140",
  submittedBy: "mjohnson",
  dateUploaded: "05/06/2025"
}, {
  poNumber: "USA000EP162839",
  publisher: "Adobe",
  docLink: "https://cisco.terzocloud.com/b/contracts/214139",
  submittedBy: "achikoti",
  dateUploaded: "05/05/2025"
}, {
  poNumber: "USA000EP184729",
  publisher: "Salesforce",
  docLink: "https://cisco.terzocloud.com/b/contracts/214138",
  submittedBy: "jsmith",
  dateUploaded: "05/04/2025"
}, {
  poNumber: "USA000EP139284",
  publisher: "ServiceNow",
  docLink: "https://cisco.terzocloud.com/b/contracts/214137",
  submittedBy: "mjohnson",
  dateUploaded: "05/03/2025"
}, {
  poNumber: "USA000EP192837",
  publisher: "SAP",
  docLink: "https://cisco.terzocloud.com/b/contracts/214136",
  submittedBy: "achikoti",
  dateUploaded: "05/02/2025"
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

// Entry Logs data for Tracker Log view
const entryLogsData = [
  { date: "04/10/2025", publisher: "DATAENDURE", analyst: "Divya Yadiapally", entryType: "Baseline", dateDocsPulled: "04/10/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb1", dateCompleted: "04/24/2025", elpRequired: "Yes", startDate: "", linkToELP: "" },
  { date: "02/15/2025", publisher: "DENODO TECHNOLOGIES, INC", analyst: "Linda Rodriguez", entryType: "Baseline", dateDocsPulled: "02/15/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb2", dateCompleted: "03/01/2025", elpRequired: "Yes", startDate: "03/12/2025", linkToELP: "https://cisco.sharepoint.com/sites/elp/2" },
  { date: "03/02/2025", publisher: "DENODO TECHNOLOGIES, INC", analyst: "Linda Rodriguez", entryType: "Contracts", dateDocsPulled: "03/02/2025", linkToDocuments: "", dateCompleted: "03/10/2025", elpRequired: "", startDate: "", linkToELP: "" },
  { date: "06/10/2025", publisher: "DEQUE SYSTEMS, INC.", analyst: "Divya Yadiapally", entryType: "Baseline", dateDocsPulled: "06/10/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb3", dateCompleted: "", elpRequired: "No", startDate: "", linkToELP: "" },
  { date: "11/15/2025", publisher: "DIAMOND IT, LLC", analyst: "Mike Brown", entryType: "Baseline", dateDocsPulled: "11/15/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb4", dateCompleted: "11/28/2025", elpRequired: "Yes", startDate: "", linkToELP: "" },
  { date: "11/29/2025", publisher: "DIAMOND IT, LLC", analyst: "Mike Brown", entryType: "Contracts", dateDocsPulled: "11/29/2025", linkToDocuments: "", dateCompleted: "12/05/2025", elpRequired: "", startDate: "", linkToELP: "" },
  { date: "12/06/2025", publisher: "DIAMOND IT, LLC", analyst: "Mike Brown", entryType: "Refresh", dateDocsPulled: "12/06/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/refresh/4", dateCompleted: "", elpRequired: "", startDate: "", linkToELP: "" },
  { date: "03/20/2025", publisher: "DIGITAL.AI SOFTWARE, INC.", analyst: "Jane Doe", entryType: "Baseline", dateDocsPulled: "03/20/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb5", dateCompleted: "04/02/2025", elpRequired: "Yes", startDate: "04/22/2025", linkToELP: "https://cisco.sharepoint.com/sites/elp/5" },
  { date: "04/03/2025", publisher: "DIGITAL.AI SOFTWARE, INC.", analyst: "Jane Doe", entryType: "Contracts", dateDocsPulled: "04/03/2025", linkToDocuments: "", dateCompleted: "04/10/2025", elpRequired: "", startDate: "", linkToELP: "" },
  { date: "04/12/2025", publisher: "DIGITAL.AI SOFTWARE, INC.", analyst: "Jane Doe", entryType: "Refresh", dateDocsPulled: "04/12/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/refresh/5", dateCompleted: "04/20/2025", elpRequired: "", startDate: "", linkToELP: "" },
  { date: "10/01/2025", publisher: "DOCUSIGN, INC.", analyst: "Linda Rodriguez", entryType: "Baseline", dateDocsPulled: "10/01/2025", linkToDocuments: "https://cisco.sharepoint.com/sites/docs/eb6", dateCompleted: "10/15/2025", elpRequired: "Pending", startDate: "", linkToELP: "" },
  { date: "10/16/2025", publisher: "DOCUSIGN, INC.", analyst: "Linda Rodriguez", entryType: "Contracts", dateDocsPulled: "10/16/2025", linkToDocuments: "", dateCompleted: "", elpRequired: "", startDate: "", linkToELP: "" },
];

// =============================================
// COMPONENT
// =============================================

const SoftwareEntitlement = () => {
  const [activeTab, setActiveTab] = useState<"processing" | "tracker" | "saturation">("processing");

  // Section 1: Entitlement Data Processing state
  const [selectedRow, setSelectedRow] = useState<typeof entitlementData[0] | null>(null);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  
  // Line items for PO details modal
  interface LineItem {
    id: string;
    poNumber: string;
    poLineNumber: number;
    description: string;
    date: string;
    qty: string;
    qtyPerUnit: string;
    unitPrice: string;
    totalPrice: string;
    licenseMetric: string;
    sku: string;
    invoiceNumber: string;
    invoiceDate: string;
    maintenance: string;
    effectiveDate: string;
    expiryDate: string;
    term: string;
    publisher: string;
    vendor: string;
    lo: string;
    location: string;
    costCenter: string;
    corporateUnit: string;
    purchaseType: string;
    documentLink: string;
    gpsContact: string;
    errors: number;
    warnings: number;
  }
  
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      poNumber: "USA000EP647855_218083",
      poLineNumber: 1,
      description: "",
      date: "06/03/2025",
      qty: "1",
      qtyPerUnit: "1",
      unitPrice: "",
      totalPrice: "$36400.00",
      licenseMetric: "subscription",
      sku: "",
      invoiceNumber: "",
      invoiceDate: "",
      maintenance: "Y",
      effectiveDate: "06/03/2025",
      expiryDate: "06/02/2026",
      term: "11 months 30 days",
      publisher: "1WORLDSYNC",
      vendor: "1WORLDSYNC INC",
      lo: "",
      location: "",
      costCenter: "047675",
      corporateUnit: "Digital Marketing-MarTech Licenses",
      purchaseType: "",
      documentLink: "https://cisco.terzocloud.com/b/contracts/218083",
      gpsContact: "",
      errors: 3,
      warnings: 5
    },
    {
      id: "2",
      poNumber: "USA000EP647855_218083",
      poLineNumber: 2,
      description: "",
      date: "06/03/2025",
      qty: "1",
      qtyPerUnit: "1",
      unitPrice: "",
      totalPrice: "$0.00",
      licenseMetric: "Metric",
      sku: "",
      invoiceNumber: "",
      invoiceDate: "",
      maintenance: "Y",
      effectiveDate: "06/03/2025",
      expiryDate: "06/02/2026",
      term: "11 months 30 days",
      publisher: "1WORLDSYNC",
      vendor: "1WORLDSYNC INC",
      lo: "",
      location: "",
      costCenter: "047675",
      corporateUnit: "Digital Marketing-MarTech Licenses",
      purchaseType: "",
      documentLink: "https://cisco.terzocloud.com/b/contracts/218083",
      gpsContact: "",
      errors: 3,
      warnings: 5
    },
    {
      id: "3",
      poNumber: "USA000EP647855_218083",
      poLineNumber: 3,
      description: "",
      date: "06/03/2025",
      qty: "1",
      qtyPerUnit: "1",
      unitPrice: "",
      totalPrice: "$0.00",
      licenseMetric: "subscription",
      sku: "",
      invoiceNumber: "",
      invoiceDate: "",
      maintenance: "Y",
      effectiveDate: "06/03/2025",
      expiryDate: "06/02/2026",
      term: "11 months 30 days",
      publisher: "1WORLDSYNC",
      vendor: "1WORLDSYNC INC",
      lo: "",
      location: "",
      costCenter: "047675",
      corporateUnit: "Digital Marketing-MarTech Licenses",
      purchaseType: "",
      documentLink: "https://cisco.terzocloud.com/b/contracts/218083",
      gpsContact: "",
      errors: 3,
      warnings: 5
    }
  ]);
  
  const [note, setNote] = useState("");
  const [ignore, setIgnore] = useState(false);
  const [initialLineItemsCount, setInitialLineItemsCount] = useState(0);
  const [initialLineItems, setInitialLineItems] = useState<LineItem[]>([]);
  const [hasUnsavedModalChanges, setHasUnsavedModalChanges] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'lineItem' } | null>(null);

  const handleConfirmDelete = () => {
    if (itemToDelete && itemToDelete.type === 'lineItem') {
      confirmDeleteLineItem();
    }
  };

  // Check for unsaved changes (new rows added or existing rows modified)
  useEffect(() => {
    const hasNewLineItems = lineItems.length > initialLineItemsCount;
    const hasModifiedItems = lineItems.some((item, index) => {
      const initialItem = initialLineItems[index];
      if (!initialItem) return false;
      // Compare all fields except errors and warnings (which are calculated)
      return JSON.stringify({ ...item, errors: 0, warnings: 0 }) !== 
             JSON.stringify({ ...initialItem, errors: 0, warnings: 0 });
    });
    setHasUnsavedModalChanges(hasNewLineItems || hasModifiedItems);
  }, [lineItems, initialLineItemsCount, initialLineItems]);

  const handleSaveModalChanges = () => {
    // Save logic here - update initial state to reflect saved state
    setInitialLineItemsCount(lineItems.length);
    setInitialLineItems(JSON.parse(JSON.stringify(lineItems))); // Deep copy
    setHasUnsavedModalChanges(false);
    toast.success("Changes saved successfully", {
      description: `Saved ${lineItems.length} line item(s).`,
      duration: 3000,
    });
  };
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [processingSortColumn, setProcessingSortColumn] = useState<string | null>(null);
  const [processingSortDirection, setProcessingSortDirection] = useState<'asc' | 'desc'>('asc');
  const [processingFilters, setProcessingFilters] = useState<{ poNumber: string[]; publisher: string[]; analyst: string[] }>({
    poNumber: [],
    publisher: [],
    analyst: []
  });
  const [manuallyUncheckedPOs, setManuallyUncheckedPOs] = useState<Set<string>>(new Set());
  const [processingTableView, setProcessingTableView] = useState<"data" | "readyForUpload" | "processed">("data");

  // Section 2: Entitlement Tracker state
  const [trackerDrawerOpen, setTrackerDrawerOpen] = useState(false);
  const [selectedTrackerRow, setSelectedTrackerRow] = useState<typeof trackerData[0] | null>(null);
  const [addEntryModalOpen, setAddEntryModalOpen] = useState(false);
  const [newEntryType, setNewEntryType] = useState<string>("");
  const [trackerRowsPerPage, setTrackerRowsPerPage] = useState(100);
  const [trackerView, setTrackerView] = useState<"dashboard" | "log">("dashboard");
  const [trackerFilters, setTrackerFilters] = useState<{ publisher: string[]; analyst: string[]; engineer: string[]; elpRequired: string[] }>({
    publisher: [],
    analyst: [],
    engineer: [],
    elpRequired: []
  });
  const [trackerSortColumn, setTrackerSortColumn] = useState<string | null>("Date Docs Pulled (EB)");
  const [trackerSortDirection, setTrackerSortDirection] = useState<'asc' | 'desc'>('desc');
  const [logSortColumn, setLogSortColumn] = useState<string | null>("Date");
  const [logSortDirection, setLogSortDirection] = useState<'asc' | 'desc'>('desc');

  // Helper function to parse MM/DD/YYYY date
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr || dateStr.trim() === "") return null;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  // Helper function to parse YYYY-MM-DD date
  const parseDateISO = (dateStr: string): Date | null => {
    if (!dateStr || dateStr.trim() === "") return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  // Column to data key mapping for Log table sorting
  const logColumnToKeyMap: Record<string, keyof typeof entryLogsData[0] | null> = {
    "Date": "date",
    "Publisher": "publisher",
    "S/W Entitlement Analyst": "analyst",
    "Entry Type": "entryType",
    "Date Documents Pulled": "dateDocsPulled",
    "Date Completed": "dateCompleted",
    "ELP Required": "elpRequired",
    "Start Date": "startDate",
  };

  const filteredEntryLogs = useMemo(() => {
    const filtered = entryLogsData.filter(row => {
      if (trackerFilters.publisher.length > 0 && !trackerFilters.publisher.includes(row.publisher)) return false;
      if (trackerFilters.analyst.length > 0 && !trackerFilters.analyst.includes(row.analyst)) return false;
      return true;
    });

    // Sort based on selected column
    if (!logSortColumn) return filtered;

    const key = logColumnToKeyMap[logSortColumn];
    if (!key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Check if this is a date column
      const dateColumns = ["date", "dateDocsPulled", "dateCompleted", "startDate"];
      
      if (dateColumns.includes(key)) {
        const dateA = parseDate(String(aVal || ""));
        const dateB = parseDate(String(bVal || ""));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return logSortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // String comparison for non-date columns
      const aStr = String(aVal || "");
      const bStr = String(bVal || "");

      return logSortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [trackerFilters, logSortColumn, logSortDirection]);

  const handleLogSort = (col: string) => {
    // Skip sorting for link columns
    if (col.includes("Link")) return;
    
    if (logSortColumn === col) {
      setLogSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setLogSortColumn(col);
      setLogSortDirection('desc');
    }
  };

  // Column to data key mapping for sorting
  const trackerColumnToKeyMap: Record<string, keyof typeof trackerData[0] | null> = {
    "S/W Publishers": "publisher",
    "Upcoming Renewal": "upcomingRenewal",
    "Analyst": "analyst",
    "Engineer": "engineer",
    "Date Docs Pulled (EB)": "eb_dateDocsPulled",
    "Date Completed (EB)": "eb_dateCompleted",
    "Date Docs Pulled (Contracts)": "contracts_dateDocsPulled",
    "Date Completed (Contracts)": "contracts_dateCompleted",
    "Date Docs Pulled (Refresh)": "refresh_dateDocsPulled",
    "Date Completed (Refresh)": "refresh_dateCompleted",
    "ELP Required": "elp_required",
    "Start Date": "elp_startDate",
    "Date Completed (ELP)": "elp_dateCompleted",
  };

  const filteredTrackerData = useMemo(() => {
    const filtered = trackerData.filter(row => {
      if (trackerFilters.publisher.length > 0 && !trackerFilters.publisher.includes(row.publisher)) return false;
      if (trackerFilters.analyst.length > 0 && !trackerFilters.analyst.includes(row.analyst)) return false;
      if (trackerFilters.engineer.length > 0 && !trackerFilters.engineer.includes(row.engineer)) return false;
      if (trackerFilters.elpRequired.length > 0 && !trackerFilters.elpRequired.includes(row.elp_required)) return false;
      return true;
    });

    // Sort based on selected column
    if (!trackerSortColumn) return filtered;

    const key = trackerColumnToKeyMap[trackerSortColumn];
    if (!key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Check if this is a date column
      const dateColumns = ["eb_dateDocsPulled", "eb_dateCompleted", "contracts_dateDocsPulled", 
                          "contracts_dateCompleted", "refresh_dateDocsPulled", "refresh_dateCompleted",
                          "elp_startDate", "elp_dateCompleted", "upcomingRenewal"];
      
      if (dateColumns.includes(key)) {
        const dateA = parseDate(String(aVal || ""));
        const dateB = parseDate(String(bVal || ""));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return trackerSortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // String comparison for non-date columns
      const aStr = String(aVal || "");
      const bStr = String(bVal || "");

      return trackerSortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [trackerFilters, trackerSortColumn, trackerSortDirection]);

  const handleTrackerSort = (col: string) => {
    // Skip sorting for link columns
    if (col.includes("Link")) return;
    
    if (trackerSortColumn === col) {
      setTrackerSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setTrackerSortColumn(col);
      setTrackerSortDirection('asc');
    }
  };

  // Column to data key mapping for Entitlement Data Processing table sorting
  const processingColumnToKeyMap: Record<string, keyof typeof entitlementData[0] | null> = {
    "PO Number": "poNumber",
    "Contract Type": "contractType",
    "Publisher": "publisher",
    "PO Creation Date": "creationDate",
    "Errors": "errors",
    "Warnings": "warnings",
    "Ready for Upload": "readyForUpload",
  };

  const filteredAndSortedEntitlementData = useMemo(() => {
    // First filter the data
    const filtered = entitlementData.filter(row => {
      if (processingFilters.poNumber.length > 0 && !processingFilters.poNumber.includes(row.poNumber)) return false;
      if (processingFilters.publisher.length > 0 && !processingFilters.publisher.includes(row.publisher)) return false;
      return true;
    });

    // Then sort the filtered data
    if (!processingSortColumn) return filtered;

    const key = processingColumnToKeyMap[processingSortColumn];
    if (!key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Handle date column
      if (key === "creationDate") {
        const dateA = parseDateISO(String(aVal || ""));
        const dateB = parseDateISO(String(bVal || ""));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return processingSortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Handle numeric columns
      if (key === "errors" || key === "warnings") {
        const numA = Number(aVal) || 0;
        const numB = Number(bVal) || 0;
        return processingSortDirection === 'asc' ? numA - numB : numB - numA;
      }

      // Handle boolean column
      if (key === "readyForUpload") {
        const boolA = Boolean(aVal);
        const boolB = Boolean(bVal);
        if (boolA === boolB) return 0;
        return processingSortDirection === 'asc' 
          ? (boolA ? 1 : -1)
          : (boolA ? -1 : 1);
      }

      // String comparison for other columns
      const aStr = String(aVal || "");
      const bStr = String(bVal || "");

      return processingSortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [processingFilters, processingSortColumn, processingSortDirection]);

  // Filtered data for "Ready for Upload" table
  const filteredReadyForUploadData = useMemo(() => {
    const filtered = entitlementData.filter(row => {
      // Only show rows where readyForUpload is true
      if (!row.readyForUpload) return false;
      
      // Apply filters
      if (processingFilters.poNumber.length > 0 && !processingFilters.poNumber.includes(row.poNumber)) return false;
      if (processingFilters.publisher.length > 0 && !processingFilters.publisher.includes(row.publisher)) return false;
      return true;
    });

    // Sort based on selected column
    if (!processingSortColumn) return filtered;

    const key = processingColumnToKeyMap[processingSortColumn];
    if (!key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Check if this is a date column
      if (key === "creationDate") {
        const dateA = parseDateISO(String(aVal || ""));
        const dateB = parseDateISO(String(bVal || ""));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return processingSortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Handle numeric columns
      if (key === "errors" || key === "warnings") {
        const numA = Number(aVal) || 0;
        const numB = Number(bVal) || 0;
        return processingSortDirection === 'asc' ? numA - numB : numB - numA;
      }

      // Handle boolean column
      if (key === "readyForUpload") {
        const boolA = Boolean(aVal);
        const boolB = Boolean(bVal);
        if (boolA === boolB) return 0;
        return processingSortDirection === 'asc' 
          ? (boolA ? 1 : -1)
          : (boolA ? -1 : 1);
      }

      // String comparison for other columns
      const aStr = String(aVal || "");
      const bStr = String(bVal || "");

      return processingSortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [processingFilters, processingSortColumn, processingSortDirection]);

  // Column to data key mapping for Processed table sorting
  const processedColumnToKeyMap: Record<string, keyof typeof processedEntitlementData[0] | null> = {
    "PO Number": "poNumber",
    "Publisher": "publisher",
    "Submitted By": "submittedBy",
    "Date Uploaded": "dateUploaded",
  };

  // Filtered data for "Processed" table
  const filteredProcessedData = useMemo(() => {
    const filtered = processedEntitlementData.filter(row => {
      // Apply filters
      if (processingFilters.poNumber.length > 0 && !processingFilters.poNumber.includes(row.poNumber)) return false;
      if (processingFilters.publisher.length > 0 && !processingFilters.publisher.includes(row.publisher)) return false;
      return true;
    });

    // Sort based on selected column
    if (!processingSortColumn) return filtered;

    const key = processedColumnToKeyMap[processingSortColumn];
    if (!key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Check if this is a date column
      if (key === "dateUploaded") {
        const dateA = parseDate(String(aVal || ""));
        const dateB = parseDate(String(bVal || ""));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return processingSortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // String comparison for other columns
      const aStr = String(aVal || "");
      const bStr = String(bVal || "");

      return processingSortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [processingFilters, processingSortColumn, processingSortDirection]);

  const handleProcessingSort = (col: string) => {
    // Skip sorting for link columns
    if (col.includes("Link")) return;
    
    if (processingSortColumn === col) {
      setProcessingSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setProcessingSortColumn(col);
      setProcessingSortDirection('asc');
    }
  };

  const handleSaveChanges = () => {
    const count = manuallyUncheckedPOs.size;
    // Here you would typically save to backend/state
    // For now, we'll just clear the unsaved changes indicator
    setManuallyUncheckedPOs(new Set());
    
    toast.success(`Successfully saved ${count} change${count !== 1 ? 's' : ''}`, {
      description: "Your changes have been saved.",
      duration: 3000,
    });
  };

  const hasUnsavedChanges = manuallyUncheckedPOs.size > 0;

  const clearTrackerFilters = () => {
    setTrackerFilters({ publisher: [], analyst: [], engineer: [], elpRequired: [] });
  };

  const hasActiveTrackerFilters = Object.values(trackerFilters).some(v => v.length > 0);

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

  // Helper functions for line items
  const addLineItem = () => {
    const newLineNumber = Math.max(...lineItems.map(item => item.poLineNumber), 0) + 1;
    // Get values from the last row, or fall back to selectedRow if no rows exist
    const lastRow = lineItems[lineItems.length - 1];
    const poNumber = lastRow?.poNumber || selectedRow?.poNumber || "";
    
    const newItem: LineItem = {
      id: Date.now().toString(),
      poNumber: poNumber,
      poLineNumber: newLineNumber,
      description: "",
      date: "",
      qty: "",
      qtyPerUnit: "",
      unitPrice: "",
      totalPrice: "$0.00",
      licenseMetric: "",
      sku: "",
      invoiceNumber: "",
      invoiceDate: "",
      maintenance: lastRow?.maintenance || "",
      effectiveDate: "",
      expiryDate: "",
      term: lastRow?.term || "",
      publisher: "",
      vendor: "",
      lo: "",
      location: "",
      costCenter: lastRow?.costCenter || "",
      corporateUnit: lastRow?.corporateUnit || "",
      purchaseType: "",
      documentLink: lastRow?.documentLink || selectedRow?.docLink || "",
      gpsContact: "",
      errors: 0,
      warnings: 0
    };
    const { errors, warnings } = calculateErrorsAndWarnings(newItem);
    const itemWithErrors = { ...newItem, errors, warnings };
    setLineItems([...lineItems, itemWithErrors]);
    setHasUnsavedModalChanges(true);
  };

  const deleteLineItem = (id: string) => {
    setItemToDelete({ id, type: 'lineItem' });
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteLineItem = () => {
    if (itemToDelete && itemToDelete.type === 'lineItem') {
      setLineItems(lineItems.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  // Calculate errors and warnings for a line item
  const calculateErrorsAndWarnings = (item: LineItem): { errors: number; warnings: number } => {
    const requiredFields: (keyof LineItem)[] = ['poNumber', 'description', 'date', 'qty', 'unitPrice', 'effectiveDate', 'expiryDate', 'publisher', 'vendor', 'purchaseType'];
    const warningFields: (keyof LineItem)[] = ['sku', 'invoiceNumber', 'invoiceDate', 'lo', 'location', 'gpsContact'];
    
    let errors = 0;
    let warnings = 0;
    
    requiredFields.forEach(field => {
      const value = item[field];
      if (!value || String(value).trim() === '') {
        errors++;
      }
    });
    
    warningFields.forEach(field => {
      const value = item[field];
      if (!value || String(value).trim() === '') {
        warnings++;
      }
    });
    
    return { errors, warnings };
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        const { errors, warnings } = calculateErrorsAndWarnings(updatedItem);
        return { ...updatedItem, errors, warnings };
      }
      return item;
    }));
    setHasUnsavedModalChanges(true);
  };

  // Get which fields have errors (only up to the error count)
  const getFieldsWithErrors = (item: LineItem): (keyof LineItem)[] => {
    const requiredFields: (keyof LineItem)[] = ['poNumber', 'description', 'date', 'qty', 'unitPrice', 'effectiveDate', 'expiryDate', 'publisher', 'vendor', 'purchaseType'];
    const fieldsWithErrors: (keyof LineItem)[] = [];
    
    requiredFields.forEach(field => {
      const value = item[field];
      if ((!value || String(value).trim() === '') && fieldsWithErrors.length < item.errors) {
        fieldsWithErrors.push(field);
      }
    });
    
    return fieldsWithErrors;
  };

  // Get which fields have warnings (only up to the warning count)
  const getFieldsWithWarnings = (item: LineItem): (keyof LineItem)[] => {
    const warningFields: (keyof LineItem)[] = ['sku', 'invoiceNumber', 'invoiceDate', 'lo', 'location', 'gpsContact'];
    const fieldsWithWarnings: (keyof LineItem)[] = [];
    
    warningFields.forEach(field => {
      const value = item[field];
      if ((!value || String(value).trim() === '') && fieldsWithWarnings.length < item.warnings) {
        fieldsWithWarnings.push(field);
      }
    });
    
    return fieldsWithWarnings;
  };

  const getFieldError = (item: LineItem, field: keyof LineItem): boolean => {
    const fieldsWithErrors = getFieldsWithErrors(item);
    return fieldsWithErrors.includes(field);
  };

  const getFieldWarning = (item: LineItem, field: keyof LineItem): boolean => {
    const fieldsWithWarnings = getFieldsWithWarnings(item);
    return fieldsWithWarnings.includes(field);
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
        {activeTab === "processing" && <div className="space-y-4 pt-0">
            {/* Title with Table View Toggle */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-card-foreground">
                {processingTableView === "data" && "Entitlement: Data"}
                {processingTableView === "readyForUpload" && "Entitlement: Ready for Upload"}
                {processingTableView === "processed" && "Entitlement: Processed"}
              </h1>
              {/* Table View Toggle Icons */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={processingTableView === "data" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setProcessingTableView("data")}
                  title="Entitlement Data"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={processingTableView === "readyForUpload" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setProcessingTableView("readyForUpload")}
                  title="Entitlement Ready for Upload"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  variant={processingTableView === "processed" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setProcessingTableView("processed")}
                  title="Entitlement Processed"
                >
                  <FileCheck className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <SearchableDropdown
                  label="PO Number"
                  options={processingTableView === "processed" 
                    ? [...new Set(processedEntitlementData.map(d => d.poNumber))]
                    : [...new Set(entitlementData.map(d => d.poNumber))]
                  }
                  value={processingFilters.poNumber}
                  onChange={(val) => setProcessingFilters(prev => ({ ...prev, poNumber: val }))}
                  placeholder="Search PO numbers..."
                />

                <SearchableDropdown
                  label="S/W Publishers"
                  options={processingTableView === "processed"
                    ? [...new Set(processedEntitlementData.map(d => d.publisher))]
                    : [...new Set(entitlementData.map(d => d.publisher))]
                  }
                  value={processingFilters.publisher}
                  onChange={(val) => setProcessingFilters(prev => ({ ...prev, publisher: val }))}
                  placeholder="Search publishers..."
                />

                <SearchableDropdown
                  label="Analyst"
                  options={["Divya Yadiapally", "Linda Rodriguez", "Mike Brown", "Jane Doe"]}
                  value={processingFilters.analyst}
                  onChange={(val) => setProcessingFilters(prev => ({ ...prev, analyst: val }))}
                  placeholder="Search analysts..."
                />

                {(processingFilters.poNumber.length > 0 || processingFilters.publisher.length > 0 || processingFilters.analyst.length > 0) && (
                  <Button variant="ghost" onClick={() => setProcessingFilters({ poNumber: [], publisher: [], analyst: [] })} className="gap-2 text-destructive hover:text-destructive">
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Save Changes Button - appears when there are unsaved changes */}
              {hasUnsavedChanges && processingTableView === "data" && (
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white gap-2 transition-opacity animate-in fade-in"
                  onClick={handleSaveChanges}
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                  {manuallyUncheckedPOs.size > 1 && ` (${manuallyUncheckedPOs.size})`}
                </Button>
              )}
            </div>

            {/* Legend - only show for data table */}
            {processingTableView === "data" && (
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
            )}

            {/* Data Table - Entitlement Data */}
            {processingTableView === "data" && (
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border sticky top-0">
                    <tr>
                      <th 
                        onClick={() => handleProcessingSort("PO Number")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          PO Number
                          {processingSortColumn === "PO Number" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleProcessingSort("Contract Type")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Contract Type
                          {processingSortColumn === "Contract Type" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleProcessingSort("Publisher")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Publisher
                          {processingSortColumn === "Publisher" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleProcessingSort("PO Creation Date")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          PO Creation Date
                          {processingSortColumn === "PO Creation Date" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleProcessingSort("Errors")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Errors
                          {processingSortColumn === "Errors" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleProcessingSort("Warnings")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Warnings
                          {processingSortColumn === "Warnings" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Link to Document</th>
                      <th 
                        onClick={() => handleProcessingSort("Ready for Upload")}
                        className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Ready for Upload
                          {processingSortColumn === "Ready for Upload" ? (
                            processingSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedEntitlementData.map((row, idx) => <tr key={row.poNumber} onClick={() => {
                  setSelectedRow(row);
                  // Initialize line items with the selected PO number
                  // Use the actual errors and warnings from the selected row
                  const initialItem: LineItem = {
                    id: "1",
                    poNumber: row.poNumber,
                    poLineNumber: 1,
                    description: "",
                    date: "",
                    qty: "",
                    qtyPerUnit: "",
                    unitPrice: "",
                    totalPrice: "$0.00",
                    licenseMetric: "",
                    sku: "",
                    invoiceNumber: "",
                    invoiceDate: "",
                    maintenance: "",
                    effectiveDate: "",
                    expiryDate: "",
                    term: "",
                    publisher: row.publisher,
                    vendor: "",
                    lo: "",
                    location: "",
                    costCenter: "",
                    corporateUnit: "",
                    purchaseType: "",
                    documentLink: row.docLink,
                    gpsContact: "",
                    errors: row.errors, // Use actual errors from the row
                    warnings: row.warnings // Use actual warnings from the row
                  };
                  setLineItems([initialItem]);
                  setInitialLineItems([JSON.parse(JSON.stringify(initialItem))]); // Deep copy
                  setNote("");
                  setIgnore(false);
                  // Set initial counts for tracking changes
                  setInitialLineItemsCount(1);
                  setHasUnsavedModalChanges(false);
                  setProcessingModalOpen(true);
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
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                          <Checkbox 
                            checked={row.errors === 0 && row.warnings === 0 && !manuallyUncheckedPOs.has(row.poNumber)} 
                                  disabled={row.errors > 0 || row.warnings > 0}
                            onCheckedChange={(checked) => {
                              setManuallyUncheckedPOs(prev => {
                                const newSet = new Set(prev);
                                if (checked) {
                                  newSet.delete(row.poNumber);
                                } else {
                                  newSet.add(row.poNumber);
                                }
                                return newSet;
                              });
                            }}
                            onClick={e => e.stopPropagation()} 
                                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary data-[state=checked]:border-2"
                                />
                              </TooltipTrigger>
                              {(row.errors > 0 || row.warnings > 0) && (
                                <TooltipContent>
                                  <p>Click the PO Number to validate it and enable this checkbox.</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
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
                  <span className="text-sm text-muted-foreground">1-{filteredAndSortedEntitlementData.length} of {filteredAndSortedEntitlementData.length}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            )}

            {/* Ready for Upload Table */}
            {processingTableView === "readyForUpload" && (
              <div className="border border-border rounded-lg bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border sticky top-0">
                      <tr>
                        <th 
                          onClick={() => handleProcessingSort("PO Number")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            PO Number
                            {processingSortColumn === "PO Number" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                        <th 
                          onClick={() => handleProcessingSort("Publisher")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            Publisher
                            {processingSortColumn === "Publisher" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Link to Document</th>
                        <th 
                          onClick={() => handleProcessingSort("Ready for Upload")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            Ready for Upload
                            {processingSortColumn === "Ready for Upload" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Submitted By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReadyForUploadData.length > 0 ? (
                        filteredReadyForUploadData.map((row, idx) => (
                          <tr 
                            key={row.poNumber} 
                            onClick={() => {
                              setSelectedRow(row);
                              setProcessingModalOpen(true);
                            }} 
                            className={`border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                          >
                            <td className="px-4 py-3 font-medium text-primary">{row.poNumber}</td>
                            <td className="px-4 py-3">{row.publisher}</td>
                            <td className="px-4 py-3">
                              <a 
                                href={row.docLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={e => e.stopPropagation()} 
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                              >
                                View Document
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              <Checkbox 
                                checked={true} 
                                disabled
                                onClick={e => e.stopPropagation()}
                                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary data-[state=checked]:border-2"
                              />
                            </td>
                            <td className="px-4 py-3">{row.submittedBy || "-"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            No items ready for upload
                          </td>
                        </tr>
                      )}
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
                    <span className="text-sm text-muted-foreground">1-{filteredReadyForUploadData.length} of {filteredReadyForUploadData.length}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Processed Table */}
            {processingTableView === "processed" && (
              <div className="border border-border rounded-lg bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border sticky top-0">
                      <tr>
                        <th 
                          onClick={() => handleProcessingSort("PO Number")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            PO Number
                            {processingSortColumn === "PO Number" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                        <th 
                          onClick={() => handleProcessingSort("Publisher")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            Publisher
                            {processingSortColumn === "Publisher" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Link to Document</th>
                        <th 
                          onClick={() => handleProcessingSort("Submitted By")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            Submitted By
                            {processingSortColumn === "Submitted By" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                        <th 
                          onClick={() => handleProcessingSort("Date Uploaded")}
                          className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex items-center gap-1">
                            Date Uploaded
                            {processingSortColumn === "Date Uploaded" ? (
                              processingSortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProcessedData.length > 0 ? (
                        filteredProcessedData.map((row, idx) => (
                          <tr 
                            key={row.poNumber} 
                            className={`border-b border-border hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                          >
                            <td className="px-4 py-3 font-medium text-primary">{row.poNumber}</td>
                            <td className="px-4 py-3">{row.publisher}</td>
                            <td className="px-4 py-3">
                              <a 
                                href={row.docLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                              >
                                View Document
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </td>
                            <td className="px-4 py-3">{row.submittedBy}</td>
                            <td className="px-4 py-3">{row.dateUploaded}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            No processed entitlements found
                          </td>
                        </tr>
                      )}
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
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">1-{filteredProcessedData.length} of {filteredProcessedData.length}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>}

        {/* =============================================
            SECTION 2: ENTITLEMENT TRACKER
         ============================================= */}
        {activeTab === "tracker" && <div className="space-y-4 pt-0">
            {/* Title with View Toggle */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-card-foreground">
                Entitlement Tracker: {trackerView === "dashboard" ? "Dashboard" : "Log"}
              </h1>
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={trackerView === "dashboard" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTrackerView("dashboard")}
                  title="Dashboard View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={trackerView === "log" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTrackerView("log")}
                  title="Log View"
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Filters & Add Button */}
            <div className="flex items-center justify-between gap-3 flex-wrap min-h-[3rem]">
              <div className="flex items-center gap-3 flex-wrap">
                <SearchableDropdown
                  label="S/W Publishers"
                  options={trackerView === "dashboard" 
                    ? [...new Set(trackerData.map(d => d.publisher))]
                    : [...new Set(entryLogsData.map(d => d.publisher))]
                  }
                  value={trackerFilters.publisher}
                  onChange={(val) => setTrackerFilters(prev => ({ ...prev, publisher: val }))}
                  placeholder="Search publishers..."
                />

                <SearchableDropdown
                  label="Analyst"
                  options={trackerView === "dashboard"
                    ? [...new Set(trackerData.map(d => d.analyst))]
                    : [...new Set(entryLogsData.map(d => d.analyst))]
                  }
                  value={trackerFilters.analyst}
                  onChange={(val) => setTrackerFilters(prev => ({ ...prev, analyst: val }))}
                  placeholder="Search analysts..."
                />

                {trackerView === "dashboard" && (
                  <>
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
                  </>
                )}

                {hasActiveTrackerFilters && (
                  <Button variant="ghost" onClick={clearTrackerFilters} className="gap-2 text-destructive hover:text-destructive">
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>

              {trackerView === "dashboard" && (
                <Button className="gap-2" onClick={() => setAddEntryModalOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add Entry
                </Button>
              )}
            </div>

            {/* Dashboard View - Tracker Table with Grouped Headers */}
            {trackerView === "dashboard" && (
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[1400px]">
                  {/* Category Header Row */}
                  <thead>
                    <tr className="border-b border-border">
                      <th colSpan={4} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide bg-card border-r border-border"></th>
                      <th colSpan={3} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white bg-green-600 border-r border-border">
                        Entitlement Baseline
                      </th>
                      <th colSpan={2} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white bg-yellow-600 border-r border-border">
                        Contracts
                      </th>
                      <th colSpan={3} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white bg-teal-600 border-r border-border">
                        Entitlement Refresh
                      </th>
                      <th colSpan={4} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white bg-purple-600">
                        Effective License Position
                      </th>
                    </tr>
                    {/* Column Header Row */}
                    <tr className="bg-muted/50 border-b border-border">
                      <th 
                        onClick={() => handleTrackerSort("S/W Publishers")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          S/W Publishers
                          {trackerSortColumn === "S/W Publishers" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleTrackerSort("Upcoming Renewal")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Upcoming Renewal
                          {trackerSortColumn === "Upcoming Renewal" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleTrackerSort("Analyst")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Analyst
                          {trackerSortColumn === "Analyst" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleTrackerSort("Engineer")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap border-r border-border cursor-pointer hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Engineer
                          {trackerSortColumn === "Engineer" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      {/* Entitlement Baseline */}
                      <th 
                        onClick={() => handleTrackerSort("Date Docs Pulled (EB)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-green-50 dark:bg-green-950/30 cursor-pointer hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Docs Pulled
                          {trackerSortColumn === "Date Docs Pulled (EB)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-green-50 dark:bg-green-950/30">Link To Documents</th>
                      <th 
                        onClick={() => handleTrackerSort("Date Completed (EB)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-green-50 dark:bg-green-950/30 border-r border-border cursor-pointer hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Completed
                          {trackerSortColumn === "Date Completed (EB)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      {/* Contracts */}
                      <th 
                        onClick={() => handleTrackerSort("Date Docs Pulled (Contracts)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-yellow-50 dark:bg-yellow-950/30 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Docs Pulled
                          {trackerSortColumn === "Date Docs Pulled (Contracts)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleTrackerSort("Date Completed (Contracts)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-yellow-50 dark:bg-yellow-950/30 border-r border-border cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Completed
                          {trackerSortColumn === "Date Completed (Contracts)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      {/* Entitlement Refresh */}
                      <th 
                        onClick={() => handleTrackerSort("Date Docs Pulled (Refresh)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-teal-50 dark:bg-teal-950/30 cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Docs Pulled
                          {trackerSortColumn === "Date Docs Pulled (Refresh)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-teal-50 dark:bg-teal-950/30">Link To Documents</th>
                      <th 
                        onClick={() => handleTrackerSort("Date Completed (Refresh)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-teal-50 dark:bg-teal-950/30 border-r border-border cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Completed
                          {trackerSortColumn === "Date Completed (Refresh)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      {/* ELP */}
                      <th 
                        onClick={() => handleTrackerSort("ELP Required")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          ELP Required
                          {trackerSortColumn === "ELP Required" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleTrackerSort("Start Date")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Start Date
                          {trackerSortColumn === "Start Date" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30">Link To ELP</th>
                      <th 
                        onClick={() => handleTrackerSort("Date Completed (ELP)")}
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap bg-purple-50 dark:bg-purple-950/30 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Completed
                          {trackerSortColumn === "Date Completed (ELP)" ? (
                            trackerSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                              : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </th>
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
                        <td className="px-3 py-2 whitespace-nowrap bg-teal-50/50 dark:bg-teal-950/20">{row.refresh_dateDocsPulled || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap bg-teal-50/50 dark:bg-teal-950/20">
                          {row.refresh_linkToDocuments ? (
                            <a href={row.refresh_linkToDocuments} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap bg-teal-50/50 dark:bg-teal-950/20 border-r border-border">{row.refresh_dateCompleted || "-"}</td>
                        {/* ELP */}
                        <td className="px-3 py-2 whitespace-nowrap bg-purple-50/50 dark:bg-purple-950/20">
                          <Badge 
                            variant={row.elp_required === "No" ? "secondary" : "outline"} 
                            className={`text-xs ${row.elp_required === "Yes" ? "bg-green-600 text-white hover:bg-green-600" : ""}`}
                          >
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
            )}

            {/* Log View - Entry Logs Table */}
            {trackerView === "log" && (
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[1200px]">
                  <thead>
                    <tr className="bg-foreground">
                      <th 
                        onClick={() => handleLogSort("Date")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {logSortColumn === "Date" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleLogSort("Publisher")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Publisher
                          {logSortColumn === "Publisher" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleLogSort("S/W Entitlement Analyst")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          S/W Entitlement Analyst
                          {logSortColumn === "S/W Entitlement Analyst" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleLogSort("Entry Type")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Entry Type
                          {logSortColumn === "Entry Type" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleLogSort("Date Documents Pulled")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Documents Pulled
                          {logSortColumn === "Date Documents Pulled" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Link to Documents</th>
                      <th 
                        onClick={() => handleLogSort("Date Completed")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Date Completed
                          {logSortColumn === "Date Completed" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleLogSort("ELP Required")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          ELP Required
                          {logSortColumn === "ELP Required" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleLogSort("Start Date")}
                        className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide cursor-pointer hover:bg-foreground/90 transition-colors group"
                      >
                        <div className="flex items-center gap-1">
                          Start Date
                          {logSortColumn === "Start Date" ? (
                            logSortDirection === 'asc' 
                              ? <ArrowUp className="h-3.5 w-3.5 text-white" />
                              : <ArrowDown className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity text-white" />
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">Link to ELP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntryLogs.map((row, idx) => (
                      <tr 
                        key={`${row.publisher}-${row.date}-${idx}`} 
                        className={`border-b border-border hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                      >
                        <td className="px-3 py-2 whitespace-nowrap">{row.date}</td>
                        <td className="px-3 py-2 font-medium text-primary whitespace-nowrap">{row.publisher}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{row.analyst}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              row.entryType === "Baseline" ? "bg-green-600 text-white border-green-600" : 
                              row.entryType === "Contracts" ? "bg-yellow-600 text-white border-yellow-600" : 
                              row.entryType === "Refresh" ? "bg-teal-600 text-white border-teal-600" : ""
                            }`}
                          >
                            {row.entryType}
                          </Badge>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">{row.dateDocsPulled || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.linkToDocuments ? (
                            <a href={row.linkToDocuments} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">{row.dateCompleted || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.elpRequired ? (
                            <Badge 
                              variant={row.elpRequired === "No" ? "secondary" : "outline"} 
                              className={`text-xs ${row.elpRequired === "Yes" ? "bg-green-600 text-white hover:bg-green-600" : ""}`}
                            >
                              {row.elpRequired}
                            </Badge>
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">{row.startDate || "-"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.linkToELP ? (
                            <a href={row.linkToELP} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "-"}
                        </td>
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
                  <span className="text-sm text-muted-foreground">1-{filteredEntryLogs.length} of {filteredEntryLogs.length}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            )}
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
                      <RechartsTooltip 
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
                      <RechartsTooltip 
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

      {/* Processing Modal - PO Line Item Details */}
      <Dialog open={processingModalOpen} onOpenChange={setProcessingModalOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">
                PO Number Line Item Details for {selectedRow?.poNumber}
              </DialogTitle>
              <div className="flex items-center gap-2 pr-8">
                <Button onClick={addLineItem} size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Row
                </Button>
                  </div>
                  </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto px-6 py-4">
            {selectedRow && (
              <div className="space-y-4">
                {/* Main Data Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[2400px]">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Delete</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Status</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">PO Number*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">PO Line Number</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Description*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Date*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Qty*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Qty Per Unit</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Unit Price*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Total Price</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">License Metric</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">SKU</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Invoice Number</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Invoice Date</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Maintenance</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Effective Date*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Expiry Date*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Term</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Publisher*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Vendor*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Lo</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Location</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Cost Center</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Corporate Unit</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Purchase Type*</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">Document Link</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground text-xs">GPS Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lineItems.map((item, idx) => (
                          <tr key={item.id} className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-muted/10"}`}>
                            <td className="px-3 py-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => deleteLineItem(item.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </td>
                            <td className={`px-3 py-2 ${item.errors > 0 ? "bg-destructive/10" : ""}`}>
                              <div className={`text-xs font-medium ${item.errors > 0 ? "text-destructive" : item.warnings > 0 ? "text-yellow-600" : ""}`}>
                                {item.errors > 0 && `Errors: ${item.errors}`}
                                {item.errors > 0 && item.warnings > 0 && " | "}
                                {item.warnings > 0 && `Warnings: ${item.warnings}`}
                                {item.errors === 0 && item.warnings === 0 && "-"}
                  </div>
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.poNumber}
                                onChange={(e) => updateLineItem(item.id, 'poNumber', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'poNumber') ? 'border-destructive bg-destructive/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.poLineNumber}
                                onChange={(e) => updateLineItem(item.id, 'poLineNumber', parseInt(e.target.value) || 0)}
                                className="h-8 text-xs"
                                type="number"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.description}
                                onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'description') ? 'border-destructive bg-destructive/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.date}
                                onChange={(e) => updateLineItem(item.id, 'date', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'date') ? 'border-destructive bg-destructive/10' : ''}`}
                                placeholder="MM/DD/YYYY"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.qty}
                                onChange={(e) => updateLineItem(item.id, 'qty', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'qty') ? 'border-destructive bg-destructive/10' : ''}`}
                                type="number"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.qtyPerUnit}
                                onChange={(e) => updateLineItem(item.id, 'qtyPerUnit', e.target.value)}
                                className="h-8 text-xs"
                                type="number"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.unitPrice}
                                onChange={(e) => updateLineItem(item.id, 'unitPrice', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'unitPrice') ? 'border-destructive bg-destructive/10' : ''}`}
                                type="number"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.totalPrice}
                                onChange={(e) => updateLineItem(item.id, 'totalPrice', e.target.value)}
                                className="h-8 text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Select value={item.licenseMetric} onValueChange={(val) => updateLineItem(item.id, 'licenseMetric', val)}>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="subscription">subscription</SelectItem>
                                  <SelectItem value="Metric">Metric</SelectItem>
                                  <SelectItem value="perpetual">perpetual</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.sku}
                                onChange={(e) => updateLineItem(item.id, 'sku', e.target.value)}
                                className={`h-8 text-xs ${getFieldWarning(item, 'sku') ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.invoiceNumber}
                                onChange={(e) => updateLineItem(item.id, 'invoiceNumber', e.target.value)}
                                className={`h-8 text-xs ${getFieldWarning(item, 'invoiceNumber') ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.invoiceDate}
                                onChange={(e) => updateLineItem(item.id, 'invoiceDate', e.target.value)}
                                className={`h-8 text-xs ${getFieldWarning(item, 'invoiceDate') ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
                                placeholder="MM/DD/YYYY"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.maintenance}
                                onChange={(e) => updateLineItem(item.id, 'maintenance', e.target.value)}
                                className="h-8 text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.effectiveDate}
                                onChange={(e) => updateLineItem(item.id, 'effectiveDate', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'effectiveDate') ? 'border-destructive bg-destructive/10' : ''}`}
                                placeholder="MM/DD/YYYY"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.expiryDate}
                                onChange={(e) => updateLineItem(item.id, 'expiryDate', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'expiryDate') ? 'border-destructive bg-destructive/10' : ''}`}
                                placeholder="MM/DD/YYYY"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.term}
                                onChange={(e) => updateLineItem(item.id, 'term', e.target.value)}
                                className="h-8 text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.publisher}
                                onChange={(e) => updateLineItem(item.id, 'publisher', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'publisher') ? 'border-destructive bg-destructive/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.vendor}
                                onChange={(e) => updateLineItem(item.id, 'vendor', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'vendor') ? 'border-destructive bg-destructive/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.lo}
                                onChange={(e) => updateLineItem(item.id, 'lo', e.target.value)}
                                className={`h-8 text-xs ${getFieldWarning(item, 'lo') ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.location}
                                onChange={(e) => updateLineItem(item.id, 'location', e.target.value)}
                                className={`h-8 text-xs ${getFieldWarning(item, 'location') ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.costCenter}
                                onChange={(e) => updateLineItem(item.id, 'costCenter', e.target.value)}
                                className="h-8 text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.corporateUnit}
                                onChange={(e) => updateLineItem(item.id, 'corporateUnit', e.target.value)}
                                className="h-8 text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.purchaseType}
                                onChange={(e) => updateLineItem(item.id, 'purchaseType', e.target.value)}
                                className={`h-8 text-xs ${getFieldError(item, 'purchaseType') ? 'border-destructive bg-destructive/10' : ''}`}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.documentLink}
                                onChange={(e) => updateLineItem(item.id, 'documentLink', e.target.value)}
                                className="h-8 text-xs"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={item.gpsContact}
                                onChange={(e) => updateLineItem(item.id, 'gpsContact', e.target.value)}
                                className={`h-8 text-xs ${getFieldWarning(item, 'gpsContact') ? 'border-yellow-500 bg-yellow-500/10' : ''}`}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>

                {/* Note Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Note</label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[100px] bg-white"
                    placeholder="Enter notes here..."
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={ignore}
                      onCheckedChange={(checked) => setIgnore(checked === true)}
                    />
                    <label className="text-sm text-muted-foreground cursor-pointer">Ignore</label>
                  </div>
                  </div>
                </div>
            )}
              </div>

          <DialogFooter className="px-6 py-4 border-t border-border">
            <Button variant="outline" onClick={() => setProcessingModalOpen(false)}>
              Cancel
                </Button>
            {hasUnsavedModalChanges && (
              <Button 
                onClick={() => {
                  handleSaveModalChanges();
                  toast.success("PO Line Items saved successfully");
                  setProcessingModalOpen(false);
                }}
                className="bg-primary hover:bg-primary/90 text-white gap-2 transition-opacity animate-in fade-in"
              >
                <Save className="h-4 w-4" />
                Save Changes
                </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this line item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setItemToDelete(null);
              setDeleteConfirmOpen(false);
            }}>
              No
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
      <Dialog open={addEntryModalOpen} onOpenChange={(open) => {
        setAddEntryModalOpen(open);
        if (!open) setNewEntryType("");
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Entitlement Tracker: Log Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Entry Type - Always shown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Entry Type:</label>
              <Select value={newEntryType} onValueChange={setNewEntryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entry type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Entitlement Baseline">Entitlement Baseline</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Entitlement Refresh">Entitlement Refresh</SelectItem>
                  <SelectItem value="Effective License Position">Effective License Position</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Common fields - shown for all entry types */}
            {newEntryType && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Software Publisher:</label>
                  <div className="relative">
                    <Input placeholder="Enter or select publisher" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Analyst:</label>
                  <div className="relative">
                    <Input placeholder="Enter or select analyst" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* Contract-specific fields */}
            {newEntryType === "Contract" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Documents Pulled:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Completed:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* Entitlement Refresh-specific fields */}
            {newEntryType === "Entitlement Refresh" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Documents Pulled:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link to Documents:</label>
                  <Input placeholder="Enter document link" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Refresh Completed:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* Effective License Position-specific fields */}
            {newEntryType === "Effective License Position" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ELP Required:</label>
                  <div className="relative">
                    <Input placeholder="Select option" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link to ELP:</label>
                  <Input placeholder="Enter ELP link" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date ELP Completed:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* Entitlement Baseline-specific fields */}
            {newEntryType === "Entitlement Baseline" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Documents Pulled:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link to Documents:</label>
                  <Input placeholder="Enter document link" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date EB Completed:</label>
                  <div className="relative">
                    <Input type="date" />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setAddEntryModalOpen(false);
              setNewEntryType("");
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setAddEntryModalOpen(false);
              setNewEntryType("");
            }}>
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