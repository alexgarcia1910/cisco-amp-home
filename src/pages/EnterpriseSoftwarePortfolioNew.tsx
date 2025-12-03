import { useState } from "react";
import { 
  Upload, Download, Columns, RefreshCw, HelpCircle, 
  ChevronDown, X, Plus, ChevronLeft, ChevronRight,
  Edit3, AlertTriangle, BarChart3, Clock, Filter
} from "lucide-react";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Static mock data for the table
const mockColumns = [
  "Action", "PO Number", "Publisher", "Product Name", "License Type", "Quantity", 
  "Unit Cost", "Total Cost", "Start Date", "End Date", "Business Owner", 
  "Cost Center", "Department", "GL Account", "Tax Region", "Currency", 
  "Contract ID", "Vendor ID", "Asset Tag", "Serial Number", "Support Level",
  "Renewal Status", "Compliance Status", "Last Audit", "Notes", "Created By",
  "Created Date", "Modified By", "Modified Date", "Approval Status"
];

const mockRows = [
  { id: 1, poNumber: "PO-2024-001", publisher: "Splunk", product: "Splunk Enterprise", licenseType: "Subscription", quantity: 100, unitCost: 150, totalCost: 15000, startDate: "2024-01-01", endDate: "2024-12-31", businessOwner: "John Smith", costCenter: "CC-1001", department: "IT Security", glAccount: "5200-01", taxRegion: "US-CA", currency: "USD", contractId: "CNT-001", vendorId: "V-001", assetTag: "AT-001", serialNumber: "SN-001", supportLevel: "Premium", renewalStatus: "Active", complianceStatus: "Compliant", lastAudit: "2024-03-15", notes: "Annual renewal", createdBy: "Admin", createdDate: "2024-01-01", modifiedBy: "Admin", modifiedDate: "2024-03-01", approvalStatus: "Approved", hasRedFlag: false, hasYellowFlag: false },
  { id: 2, poNumber: "PO-2024-002", publisher: "Microsoft", product: "Azure DevOps", licenseType: "Perpetual", quantity: 50, unitCost: 200, totalCost: 10000, startDate: "2024-02-01", endDate: "2025-01-31", businessOwner: "", costCenter: "CC-1002", department: "Engineering", glAccount: "5200-02", taxRegion: "US-TX", currency: "USD", contractId: "CNT-002", vendorId: "V-002", assetTag: "AT-002", serialNumber: "SN-002", supportLevel: "Standard", renewalStatus: "Pending", complianceStatus: "Review", lastAudit: "2024-02-20", notes: "", createdBy: "Admin", createdDate: "2024-02-01", modifiedBy: "User1", modifiedDate: "2024-03-10", approvalStatus: "Pending", hasRedFlag: true, hasYellowFlag: false },
  { id: 3, poNumber: "PO-2024-003", publisher: "Salesforce", product: "Sales Cloud", licenseType: "Subscription", quantity: 200, unitCost: 125, totalCost: 25000, startDate: "2024-03-01", endDate: "2025-02-28", businessOwner: "Jane Doe", costCenter: "", department: "Sales", glAccount: "5200-03", taxRegion: "US-NY", currency: "USD", contractId: "CNT-003", vendorId: "V-003", assetTag: "AT-003", serialNumber: "SN-003", supportLevel: "Premium", renewalStatus: "Active", complianceStatus: "Compliant", lastAudit: "2024-03-01", notes: "Multi-year deal", createdBy: "Admin", createdDate: "2024-03-01", modifiedBy: "Admin", modifiedDate: "2024-03-01", approvalStatus: "Approved", hasRedFlag: false, hasYellowFlag: true },
  { id: 4, poNumber: "PO-2024-004", publisher: "ServiceNow", product: "ITSM Pro", licenseType: "Subscription", quantity: 75, unitCost: 300, totalCost: 22500, startDate: "2024-01-15", endDate: "2025-01-14", businessOwner: "Mike Johnson", costCenter: "CC-1004", department: "IT Operations", glAccount: "5200-04", taxRegion: "US-WA", currency: "USD", contractId: "CNT-004", vendorId: "V-004", assetTag: "AT-004", serialNumber: "SN-004", supportLevel: "Premium", renewalStatus: "Active", complianceStatus: "Compliant", lastAudit: "2024-02-28", notes: "", createdBy: "Admin", createdDate: "2024-01-15", modifiedBy: "Admin", modifiedDate: "2024-02-15", approvalStatus: "Approved", hasRedFlag: false, hasYellowFlag: false },
  { id: 5, poNumber: "PO-2024-005", publisher: "Tableau", product: "Tableau Desktop", licenseType: "Perpetual", quantity: 30, unitCost: 500, totalCost: 15000, startDate: "2024-04-01", endDate: "N/A", businessOwner: "", costCenter: "", department: "Analytics", glAccount: "5200-05", taxRegion: "US-IL", currency: "USD", contractId: "CNT-005", vendorId: "V-005", assetTag: "AT-005", serialNumber: "SN-005", supportLevel: "Standard", renewalStatus: "N/A", complianceStatus: "Review", lastAudit: "2024-04-01", notes: "One-time purchase", createdBy: "Admin", createdDate: "2024-04-01", modifiedBy: "Admin", modifiedDate: "2024-04-01", approvalStatus: "Pending", hasRedFlag: true, hasYellowFlag: true },
  { id: 6, poNumber: "PO-2024-006", publisher: "Adobe", product: "Creative Cloud", licenseType: "Subscription", quantity: 150, unitCost: 55, totalCost: 8250, startDate: "2024-02-15", endDate: "2025-02-14", businessOwner: "Sarah Wilson", costCenter: "CC-1006", department: "Marketing", glAccount: "5200-06", taxRegion: "US-CA", currency: "USD", contractId: "CNT-006", vendorId: "V-006", assetTag: "AT-006", serialNumber: "SN-006", supportLevel: "Standard", renewalStatus: "Active", complianceStatus: "Compliant", lastAudit: "2024-03-10", notes: "", createdBy: "Admin", createdDate: "2024-02-15", modifiedBy: "User2", modifiedDate: "2024-03-05", approvalStatus: "Approved", hasRedFlag: false, hasYellowFlag: false },
  { id: 7, poNumber: "PO-2024-007", publisher: "Atlassian", product: "Jira Software", licenseType: "Subscription", quantity: 500, unitCost: 7, totalCost: 3500, startDate: "2024-01-01", endDate: "2024-12-31", businessOwner: "Tom Brown", costCenter: "CC-1007", department: "Engineering", glAccount: "5200-07", taxRegion: "US-OR", currency: "USD", contractId: "CNT-007", vendorId: "V-007", assetTag: "AT-007", serialNumber: "SN-007", supportLevel: "Premium", renewalStatus: "Active", complianceStatus: "Compliant", lastAudit: "2024-01-15", notes: "Cloud hosted", createdBy: "Admin", createdDate: "2024-01-01", modifiedBy: "Admin", modifiedDate: "2024-01-01", approvalStatus: "Approved", hasRedFlag: false, hasYellowFlag: false },
  { id: 8, poNumber: "PO-2024-008", publisher: "Okta", product: "Workforce Identity", licenseType: "Subscription", quantity: 1000, unitCost: 4, totalCost: 4000, startDate: "2024-03-01", endDate: "2025-02-28", businessOwner: "", costCenter: "CC-1008", department: "IT Security", glAccount: "5200-08", taxRegion: "US-AZ", currency: "USD", contractId: "CNT-008", vendorId: "V-008", assetTag: "AT-008", serialNumber: "SN-008", supportLevel: "Premium", renewalStatus: "Active", complianceStatus: "Review", lastAudit: "2024-03-20", notes: "SSO implementation", createdBy: "Admin", createdDate: "2024-03-01", modifiedBy: "Admin", modifiedDate: "2024-03-15", approvalStatus: "Approved", hasRedFlag: true, hasYellowFlag: false },
];

// Mock change history data
const changeHistoryData = [
  { id: 1, timestamp: "2024-03-15 14:32:00", user: "John Smith", record: "PO-2024-001", field: "Business Owner", oldValue: "—", newValue: "John Smith", action: "Updated" },
  { id: 2, timestamp: "2024-03-14 09:15:00", user: "Admin", record: "PO-2024-002", field: "Approval Status", oldValue: "Draft", newValue: "Pending", action: "Updated" },
  { id: 3, timestamp: "2024-03-13 16:45:00", user: "Jane Doe", record: "PO-2024-003", field: "Total Cost", oldValue: "$20,000", newValue: "$25,000", action: "Updated" },
  { id: 4, timestamp: "2024-03-12 11:20:00", user: "Admin", record: "PO-2024-004", field: "—", oldValue: "—", newValue: "—", action: "Created" },
  { id: 5, timestamp: "2024-03-11 08:00:00", user: "Mike Johnson", record: "PO-2024-005", field: "License Type", oldValue: "Subscription", newValue: "Perpetual", action: "Updated" },
  { id: 6, timestamp: "2024-03-10 15:30:00", user: "Sarah Wilson", record: "PO-2024-006", field: "Department", oldValue: "Sales", newValue: "Marketing", action: "Updated" },
];

// Filter field options
const filterFields = [
  "Publisher", "Status", "PO Number", "Product Name", "Business Unit", 
  "Department", "License Type", "Renewal Status", "Compliance Status", "Approval Status"
];

// Filter value options (mock)
const filterValues: Record<string, string[]> = {
  "Publisher": ["Splunk", "Microsoft", "Salesforce", "ServiceNow", "Tableau", "Adobe", "Atlassian", "Okta"],
  "Status": ["Active", "Pending", "Expired", "Draft"],
  "License Type": ["Subscription", "Perpetual", "Trial"],
  "Renewal Status": ["Active", "Pending", "N/A", "Expired"],
  "Compliance Status": ["Compliant", "Review", "Non-Compliant"],
  "Approval Status": ["Approved", "Pending", "Rejected", "Draft"],
  "Department": ["IT Security", "Engineering", "Sales", "IT Operations", "Analytics", "Marketing"],
};

const lockedColumns = ["Action", "PO Number", "Publisher", "Product Name"];

// Summarized columns for simplified view
const summarizedColumns = ["Action", "PO Number", "Publisher", "Product Name", "License Type", "Total Cost", "Business Owner", "Department"];

const EnterpriseSoftwarePortfolioNew = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPiiModalOpen, setIsPiiModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<typeof mockRows[0] | null>(null);
  const [activeTab, setActiveTab] = useState("table");
  const [viewMode, setViewMode] = useState<"all" | "summarized">("all");
  const [selectedFilterField, setSelectedFilterField] = useState("");
  const [selectedFilterValues, setSelectedFilterValues] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{ field: string; values: string[] }[]>([
    { field: "Publisher", values: ["Splunk"] },
    { field: "Status", values: ["Active"] }
  ]);

  const handleActionClick = (row: typeof mockRows[0]) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const getRowClassName = (row: typeof mockRows[0]) => {
    if (row.hasRedFlag && row.hasYellowFlag) return "bg-red-50";
    if (row.hasRedFlag) return "bg-red-50";
    if (row.hasYellowFlag) return "bg-yellow-50";
    return "";
  };

  const getCellHighlight = (row: typeof mockRows[0], field: string) => {
    if (row.hasRedFlag && (field === "businessOwner" || field === "costCenter") && !row[field as keyof typeof row]) {
      return "bg-red-100 border-red-300";
    }
    if (row.hasYellowFlag && field === "costCenter" && !row[field as keyof typeof row]) {
      return "bg-yellow-100 border-yellow-300";
    }
    return "";
  };

  const handleAddFilterClose = () => {
    setIsFilterModalOpen(false);
    setSelectedFilterField("");
    setSelectedFilterValues([]);
    setIsFilterDropdownOpen(false);
  };

  const handleApplyFilter = () => {
    if (selectedFilterField && selectedFilterValues.length > 0) {
      setAppliedFilters(prev => {
        const existingIdx = prev.findIndex(f => f.field === selectedFilterField);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = { field: selectedFilterField, values: selectedFilterValues };
          return updated;
        }
        return [...prev, { field: selectedFilterField, values: selectedFilterValues }];
      });
    }
    handleAddFilterClose();
  };

  const handleRemoveFilterValue = (field: string, value: string) => {
    setAppliedFilters(prev => 
      prev.map(f => {
        if (f.field === field) {
          const newValues = f.values.filter(v => v !== value);
          return { ...f, values: newValues };
        }
        return f;
      }).filter(f => f.values.length > 0)
    );
  };

  const handleClearAllFilters = () => {
    setAppliedFilters([]);
  };

  const toggleFilterValue = (value: string) => {
    setSelectedFilterValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const removeSelectedValue = (value: string) => {
    setSelectedFilterValues(prev => prev.filter(v => v !== value));
  };

  // Determine what to show based on tab and view mode
  const showFullTable = activeTab === "table" && viewMode === "all";
  const showSummarizedTable = activeTab === "table" && viewMode === "summarized" || activeTab === "summarized";
  const showAnalytics = activeTab === "analytics";
  const showHistory = activeTab === "history";

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="mx-auto max-w-[1600px] px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Select defaultValue="2024">
              <SelectTrigger className="w-[140px] bg-card border-border">
                <SelectValue placeholder="Fiscal Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">FY 2024</SelectItem>
                <SelectItem value="2023">FY 2023</SelectItem>
                <SelectItem value="2022">FY 2022</SelectItem>
              </SelectContent>
            </Select>
            <h1 className="text-xl font-semibold text-foreground">
              Enterprise Software Portfolio – Fiscal Year 2024
            </h1>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-cisco-blue text-white hover:bg-cisco-blue/90 border-cisco-blue"
            >
              <Upload className="h-4 w-4 mr-1" />
              Bulk Upload
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-cisco-blue text-white hover:bg-cisco-blue/90 border-cisco-blue"
              onClick={() => setIsPiiModalOpen(true)}
            >
              <Download className="h-4 w-4 mr-1" />
              Download Report
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-cisco-blue text-white hover:bg-cisco-blue/90 border-cisco-blue"
              onClick={() => setIsColumnModalOpen(true)}
            >
              <Columns className="h-4 w-4 mr-1" />
              Select Columns
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-cisco-blue text-white hover:bg-cisco-blue/90 border-cisco-blue"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh Data
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* View Mode Toggle - only visible on Table View tab */}
        {activeTab === "table" && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("all")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "all" 
                    ? "bg-cisco-blue text-white" 
                    : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                All Fields
              </button>
              <button
                onClick={() => setViewMode("summarized")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "summarized" 
                    ? "bg-cisco-blue text-white" 
                    : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                Summarized Fields
              </button>
            </div>
          </div>
        )}

        {/* Global Filter Bar */}
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border mb-4">
          <span className="text-sm text-muted-foreground">Filtered:</span>
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {appliedFilters.length === 0 ? (
              <span className="text-sm text-muted-foreground">No Filters</span>
            ) : (
              appliedFilters.map((filter) => (
                <div key={filter.field} className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">{filter.field}:</span>
                  {filter.values.map((value) => (
                    <span 
                      key={value}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cisco-blue/10 border border-cisco-blue/30 text-sm text-cisco-blue"
                    >
                      {value}
                      <button 
                        className="hover:text-destructive ml-1"
                        onClick={() => handleRemoveFilterValue(filter.field, value)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ))
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-cisco-blue border-cisco-blue hover:bg-cisco-blue/10"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Filter
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-destructive"
            onClick={handleClearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="table" className="data-[state=active]:bg-cisco-blue data-[state=active]:text-white">
              Table View
            </TabsTrigger>
            <TabsTrigger value="summarized" className="data-[state=active]:bg-cisco-blue data-[state=active]:text-white">
              Summarized Fields
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cisco-blue data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-cisco-blue data-[state=active]:text-white">
              Change History
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Legend - only show on table views */}
        {(showFullTable || showSummarizedTable) && (
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
              <span className="text-muted-foreground">Required field missing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300" />
              <span className="text-muted-foreground">Recommended field missing</span>
            </div>
          </div>
        )}

        {/* Full Data Grid Table */}
        {showFullTable && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary sticky top-0 z-10">
                  <tr>
                    {mockColumns.map((col, idx) => (
                      <th 
                        key={col} 
                        className={`px-3 py-3 text-left font-medium text-foreground whitespace-nowrap border-b border-border ${
                          idx === 0 ? "sticky left-0 bg-secondary z-20" : ""
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockRows.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-b border-border hover:bg-secondary/50 transition-colors ${getRowClassName(row)}`}
                    >
                      <td className="px-3 py-2 sticky left-0 bg-card z-10 border-r border-border">
                        <button 
                          onClick={() => handleActionClick(row)}
                          className="p-1.5 rounded hover:bg-cisco-blue/10 text-cisco-blue transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.poNumber}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.publisher}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.product}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.licenseType}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-right">{row.quantity}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-right">${row.unitCost}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-right">${row.totalCost.toLocaleString()}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.startDate}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.endDate}</td>
                      <td className={`px-3 py-2 whitespace-nowrap ${getCellHighlight(row, "businessOwner")}`}>
                        {row.businessOwner || <span className="text-red-500 italic">Missing</span>}
                      </td>
                      <td className={`px-3 py-2 whitespace-nowrap ${getCellHighlight(row, "costCenter")}`}>
                        {row.costCenter || <span className="text-yellow-600 italic">Missing</span>}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.department}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.glAccount}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.taxRegion}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.currency}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.contractId}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.vendorId}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.assetTag}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.serialNumber}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.supportLevel}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          row.renewalStatus === "Active" ? "bg-green-100 text-green-700" :
                          row.renewalStatus === "Pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {row.renewalStatus}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          row.complianceStatus === "Compliant" ? "bg-green-100 text-green-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {row.complianceStatus}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.lastAudit}</td>
                      <td className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate">{row.notes}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.createdBy}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.createdDate}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.modifiedBy}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.modifiedDate}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          row.approvalStatus === "Approved" ? "bg-green-100 text-green-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {row.approvalStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summarized Table */}
        {showSummarizedTable && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary sticky top-0 z-10">
                  <tr>
                    {summarizedColumns.map((col, idx) => (
                      <th 
                        key={col} 
                        className={`px-4 py-3 text-left font-medium text-foreground whitespace-nowrap border-b border-border ${
                          idx === 0 ? "sticky left-0 bg-secondary z-20" : ""
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockRows.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-b border-border hover:bg-secondary/50 transition-colors ${getRowClassName(row)}`}
                    >
                      <td className="px-4 py-3 sticky left-0 bg-card z-10 border-r border-border">
                        <button 
                          onClick={() => handleActionClick(row)}
                          className="p-1.5 rounded hover:bg-cisco-blue/10 text-cisco-blue transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">{row.poNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.publisher}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.product}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          row.licenseType === "Subscription" ? "bg-blue-100 text-blue-700" :
                          "bg-purple-100 text-purple-700"
                        }`}>
                          {row.licenseType}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-medium">${row.totalCost.toLocaleString()}</td>
                      <td className={`px-4 py-3 whitespace-nowrap ${getCellHighlight(row, "businessOwner")}`}>
                        {row.businessOwner || <span className="text-red-500 italic">Missing</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Placeholder */}
        {showAnalytics && (
          <div className="bg-card rounded-lg border border-border p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-cisco-blue/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-cisco-blue" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                This section will display interactive charts and visualizations for your software portfolio data,
                including spend analysis, license utilization, and compliance metrics.
              </p>
            </div>
          </div>
        )}

        {/* Change History Table */}
        {showHistory && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Clock className="h-5 w-5 text-cisco-blue" />
              <h3 className="font-semibold text-foreground">Recent Changes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Timestamp</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">User</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Record</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Action</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Field</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Old Value</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">New Value</th>
                  </tr>
                </thead>
                <tbody>
                  {changeHistoryData.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{item.timestamp}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.user}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-cisco-blue">{item.record}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          item.action === "Created" ? "bg-green-100 text-green-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {item.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.field}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{item.oldValue}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">{item.newValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination - only show on table views */}
        {(showFullTable || showSummarizedTable) && (
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Items per page:</span>
              <Select defaultValue="100">
                <SelectTrigger className="w-[80px] h-8 bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Page 1 of 12</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Detail Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-cisco-navy">
              Edit Record: {selectedRow?.poNumber}
            </SheetTitle>
          </SheetHeader>
          
          {selectedRow && (
            <div className="mt-6 space-y-6">
              {/* PO Details Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  PO Details
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">PO Number</label>
                    <Input defaultValue={selectedRow.poNumber} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Publisher</label>
                    <Input defaultValue={selectedRow.publisher} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Product Name</label>
                    <Input defaultValue={selectedRow.product} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">License Type</label>
                    <Select defaultValue={selectedRow.licenseType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Subscription">Subscription</SelectItem>
                        <SelectItem value="Perpetual">Perpetual</SelectItem>
                        <SelectItem value="Trial">Trial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Business Owners Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Business Owners
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      Business Owner
                      {selectedRow.hasRedFlag && !selectedRow.businessOwner && (
                        <span className="text-red-500 text-xs">(Required)</span>
                      )}
                    </label>
                    <Input 
                      defaultValue={selectedRow.businessOwner} 
                      className={`mt-1 ${selectedRow.hasRedFlag && !selectedRow.businessOwner ? "border-red-300 bg-red-50" : ""}`}
                      placeholder="Enter business owner"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      Cost Center
                      {selectedRow.hasYellowFlag && !selectedRow.costCenter && (
                        <span className="text-yellow-600 text-xs">(Recommended)</span>
                      )}
                    </label>
                    <Input 
                      defaultValue={selectedRow.costCenter} 
                      className={`mt-1 ${selectedRow.hasYellowFlag && !selectedRow.costCenter ? "border-yellow-300 bg-yellow-50" : ""}`}
                      placeholder="Enter cost center"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Department</label>
                    <Input defaultValue={selectedRow.department} className="mt-1" />
                  </div>
                </div>
              </div>

              {/* Financial Info Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Financial Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Quantity</label>
                    <Input type="number" defaultValue={selectedRow.quantity} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Unit Cost</label>
                    <Input type="number" defaultValue={selectedRow.unitCost} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">GL Account</label>
                    <Input defaultValue={selectedRow.glAccount} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Currency</label>
                    <Select defaultValue={selectedRow.currency}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Tax Info Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Tax Information
                </h3>
                <div>
                  <label className="text-sm text-muted-foreground">Tax Region</label>
                  <Select defaultValue={selectedRow.taxRegion}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US-CA">US - California</SelectItem>
                      <SelectItem value="US-TX">US - Texas</SelectItem>
                      <SelectItem value="US-NY">US - New York</SelectItem>
                      <SelectItem value="US-WA">US - Washington</SelectItem>
                      <SelectItem value="US-IL">US - Illinois</SelectItem>
                      <SelectItem value="US-AZ">US - Arizona</SelectItem>
                      <SelectItem value="US-OR">US - Oregon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Notes
                </h3>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm"
                  defaultValue={selectedRow.notes}
                  placeholder="Add notes..."
                />
              </div>
            </div>
          )}

          <SheetFooter className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-cisco-blue hover:bg-cisco-blue/90">
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* PII Attestation Modal */}
      <Dialog open={isPiiModalOpen} onOpenChange={setIsPiiModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-cisco-navy">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Sensitive Data Download Warning
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-muted-foreground space-y-4">
            <p>
              You are about to download a report that may contain Personally Identifiable Information (PII) 
              and other sensitive business data.
            </p>
            <p>
              By proceeding, you acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>You have a legitimate business need to access this data</li>
              <li>You will handle this data in accordance with company data protection policies</li>
              <li>You will not share this data with unauthorized parties</li>
              <li>You will securely delete the file when no longer needed</li>
            </ul>
            <p className="text-xs text-muted-foreground italic">
              This download will be logged for compliance purposes.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPiiModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-cisco-blue hover:bg-cisco-blue/90"
              onClick={() => setIsPiiModalOpen(false)}
            >
              Acknowledge & Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Column Selector Modal */}
      <Dialog open={isColumnModalOpen} onOpenChange={setIsColumnModalOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-cisco-navy">Select Visible Columns</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1">
              {mockColumns.map((col) => {
                const isLocked = lockedColumns.includes(col);
                return (
                  <div 
                    key={col}
                    className={`flex items-center gap-3 p-2 rounded ${isLocked ? "bg-secondary" : "hover:bg-secondary/50"}`}
                  >
                    <Checkbox 
                      id={col} 
                      defaultChecked 
                      disabled={isLocked}
                      className={isLocked ? "opacity-50" : ""}
                    />
                    <label 
                      htmlFor={col} 
                      className={`text-sm flex-1 ${isLocked ? "text-muted-foreground" : "text-foreground cursor-pointer"}`}
                    >
                      {col}
                      {isLocked && <span className="ml-2 text-xs text-muted-foreground">(locked)</span>}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter className="border-t border-border pt-4">
            <Button variant="outline" onClick={() => setIsColumnModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-cisco-blue hover:bg-cisco-blue/90"
              onClick={() => setIsColumnModalOpen(false)}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={handleAddFilterClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-cisco-navy">
              <Filter className="h-5 w-5 text-cisco-blue" />
              Add Filter
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Field</label>
              <Select 
                value={selectedFilterField} 
                onValueChange={(value) => {
                  setSelectedFilterField(value);
                  setSelectedFilterValues([]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a field to filter..." />
                </SelectTrigger>
                <SelectContent>
                  {filterFields.map((field) => (
                    <SelectItem key={field} value={field}>{field}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Values</label>
              
              {/* Selected values as chips */}
              {selectedFilterValues.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 p-2 bg-secondary/50 rounded-md border border-border">
                  {selectedFilterValues.map((value) => (
                    <span 
                      key={value}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-cisco-blue text-white text-sm"
                    >
                      {value}
                      <button 
                        onClick={() => removeSelectedValue(value)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Multi-select dropdown */}
              {selectedFilterField && filterValues[selectedFilterField] ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    className="flex items-center justify-between w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-cisco-blue focus:ring-offset-1"
                  >
                    <span className="text-muted-foreground">
                      {selectedFilterValues.length === 0 
                        ? "Select values..." 
                        : `${selectedFilterValues.length} value(s) selected`}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isFilterDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filterValues[selectedFilterField].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleFilterValue(value)}
                          className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-secondary transition-colors ${
                            selectedFilterValues.includes(value) ? 'bg-cisco-blue/10 text-cisco-blue' : 'text-foreground'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            selectedFilterValues.includes(value) 
                              ? 'bg-cisco-blue border-cisco-blue' 
                              : 'border-border'
                          }`}>
                            {selectedFilterValues.includes(value) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Input 
                  placeholder="Select a field first..." 
                  disabled
                  className="bg-secondary/50"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleAddFilterClose}>
              Cancel
            </Button>
            <Button 
              className="bg-cisco-blue hover:bg-cisco-blue/90"
              onClick={handleApplyFilter}
              disabled={selectedFilterValues.length === 0}
            >
              Apply Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnterpriseSoftwarePortfolioNew;
