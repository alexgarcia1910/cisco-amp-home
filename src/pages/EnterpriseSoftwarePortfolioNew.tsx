import { useState, useMemo } from "react";
import { 
  Upload, Download, Columns, RefreshCw, HelpCircle, 
  ChevronDown, X, Plus, ChevronLeft, ChevronRight,
  Edit3, AlertTriangle, BarChart3, Clock, Filter, Search,
  ArrowUp, ArrowDown, ArrowUpDown
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

// Helper to generate 100 mock rows
const publishers = ["Splunk", "Microsoft", "Salesforce", "ServiceNow", "Tableau", "Adobe", "Atlassian", "Okta", "SAP", "Oracle", "IBM", "VMware", "Cisco", "AWS", "Google Cloud"];
const products: Record<string, string[]> = {
  "Splunk": ["Splunk Enterprise", "Splunk Cloud", "Splunk SOAR"],
  "Microsoft": ["Azure DevOps", "Office 365", "Power BI", "Dynamics 365"],
  "Salesforce": ["Sales Cloud", "Service Cloud", "Marketing Cloud"],
  "ServiceNow": ["ITSM Pro", "ITOM", "SecOps"],
  "Tableau": ["Tableau Desktop", "Tableau Server", "Tableau Online"],
  "Adobe": ["Creative Cloud", "Experience Cloud", "Document Cloud"],
  "Atlassian": ["Jira Software", "Confluence", "Bitbucket"],
  "Okta": ["Workforce Identity", "Customer Identity"],
  "SAP": ["S/4HANA", "SuccessFactors", "Ariba"],
  "Oracle": ["ERP Cloud", "HCM Cloud", "Database"],
  "IBM": ["Watson", "Cloud Pak", "Maximo"],
  "VMware": ["vSphere", "NSX", "Horizon"],
  "Cisco": ["Webex", "Meraki", "Umbrella"],
  "AWS": ["EC2", "S3", "Lambda"],
  "Google Cloud": ["BigQuery", "GKE", "Cloud Run"]
};
const licenseTypes = ["Subscription", "Perpetual", "Trial"];
const departments = ["IT Security", "Engineering", "Sales", "IT Operations", "Analytics", "Marketing", "Finance", "HR", "Legal", "Product"];
const businessUnits = ["Corporate IT", "Product Development", "Sales Operations", "Customer Success", "Finance", "Human Resources"];
const renewalStatuses = ["Active", "Pending", "N/A", "Expired"];
const complianceStatuses = ["Compliant", "Review", "Non-Compliant"];
const approvalStatuses = ["Approved", "Pending", "Rejected", "Draft"];
const businessOwners = ["John Smith", "Jane Doe", "Mike Johnson", "Sarah Wilson", "Tom Brown", "Emily Davis", "Chris Lee", "Anna Martinez", "David Chen", "Lisa Wang", ""];

const generateMockRows = () => {
  const rows = [];
  for (let i = 1; i <= 100; i++) {
    const publisher = publishers[Math.floor(Math.random() * publishers.length)];
    const publisherProducts = products[publisher] || ["Default Product"];
    const product = publisherProducts[Math.floor(Math.random() * publisherProducts.length)];
    const licenseType = licenseTypes[Math.floor(Math.random() * licenseTypes.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const businessUnit = businessUnits[Math.floor(Math.random() * businessUnits.length)];
    const renewalStatus = renewalStatuses[Math.floor(Math.random() * renewalStatuses.length)];
    const complianceStatus = complianceStatuses[Math.floor(Math.random() * complianceStatuses.length)];
    const approvalStatus = approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)];
    const businessOwner = businessOwners[Math.floor(Math.random() * businessOwners.length)];
    const quantity = Math.floor(Math.random() * 500) + 10;
    const unitCost = Math.floor(Math.random() * 500) + 10;
    const hasRedFlag = Math.random() < 0.15;
    const hasYellowFlag = Math.random() < 0.2;
    
    rows.push({
      id: i,
      poNumber: `PO-2024-${String(i).padStart(3, '0')}`,
      publisher,
      product,
      licenseType,
      quantity,
      unitCost,
      totalCost: quantity * unitCost,
      startDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
      endDate: licenseType === "Perpetual" ? "N/A" : `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-28`,
      businessOwner,
      costCenter: Math.random() > 0.2 ? `CC-${1000 + i}` : "",
      department,
      businessUnit,
      glAccount: `5200-${String(i).padStart(2, '0')}`,
      taxRegion: ["US-CA", "US-TX", "US-NY", "US-WA", "US-IL"][Math.floor(Math.random() * 5)],
      currency: "USD",
      contractId: `CNT-${String(i).padStart(3, '0')}`,
      vendorId: `V-${String(i).padStart(3, '0')}`,
      assetTag: `AT-${String(i).padStart(3, '0')}`,
      serialNumber: `SN-${String(i).padStart(3, '0')}`,
      supportLevel: Math.random() > 0.5 ? "Premium" : "Standard",
      renewalStatus,
      complianceStatus,
      lastAudit: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      notes: Math.random() > 0.7 ? "Auto-generated note" : "",
      createdBy: "Admin",
      createdDate: "2024-01-01",
      modifiedBy: "Admin",
      modifiedDate: "2024-03-01",
      approvalStatus,
      hasRedFlag,
      hasYellowFlag
    });
  }
  return rows;
};

const mockRows = generateMockRows();

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
  "Publisher", "Product Name", "PO Number", "Business Unit", 
  "Department", "License Type", "Renewal Status", "Compliance Status", "Approval Status"
];

// Generate filter values dynamically from mock data
const filterValues: Record<string, string[]> = {
  "Publisher": publishers,
  "License Type": licenseTypes,
  "Renewal Status": renewalStatuses,
  "Compliance Status": complianceStatuses,
  "Approval Status": approvalStatuses,
  "Department": departments,
  "Business Unit": businessUnits,
  "PO Number": mockRows.map(r => r.poNumber),
  "Product Name": [...new Set(mockRows.map(r => r.product))],
};

const lockedColumns = ["Action", "PO Number", "Publisher", "Product Name"];

// Summarized columns for simplified view
const summarizedColumns = ["Action", "PO Number", "Publisher", "Product Name", "License Type", "Total Cost", "Business Owner", "Department"];

// Column to row property mapping
const columnToKeyMap: Record<string, keyof typeof mockRows[0] | null> = {
  "Action": null,
  "PO Number": "poNumber",
  "Publisher": "publisher",
  "Product Name": "product",
  "License Type": "licenseType",
  "Quantity": "quantity",
  "Unit Cost": "unitCost",
  "Total Cost": "totalCost",
  "Start Date": "startDate",
  "End Date": "endDate",
  "Business Owner": "businessOwner",
  "Cost Center": "costCenter",
  "Department": "department",
  "GL Account": "glAccount",
  "Tax Region": "taxRegion",
  "Currency": "currency",
  "Contract ID": "contractId",
  "Vendor ID": "vendorId",
  "Asset Tag": "assetTag",
  "Serial Number": "serialNumber",
  "Support Level": "supportLevel",
  "Renewal Status": "renewalStatus",
  "Compliance Status": "complianceStatus",
  "Last Audit": "lastAudit",
  "Notes": "notes",
  "Created By": "createdBy",
  "Created Date": "createdDate",
  "Modified By": "modifiedBy",
  "Modified Date": "modifiedDate",
  "Approval Status": "approvalStatus"
};

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
  const [appliedFilters, setAppliedFilters] = useState<{ field: string; values: string[] }[]>([]);
  const [filterSearchQuery, setFilterSearchQuery] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(mockColumns);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleColumnVisibility = (col: string) => {
    if (lockedColumns.includes(col)) return;
    setVisibleColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const displayedColumns = mockColumns.filter(col => visibleColumns.includes(col));

  // Filter rows based on applied filters
  const filteredRows = useMemo(() => mockRows.filter(row => {
    if (appliedFilters.length === 0) return true;
    
    return appliedFilters.every(filter => {
      const fieldMap: Record<string, keyof typeof row> = {
        "Publisher": "publisher",
        "Product Name": "product",
        "PO Number": "poNumber",
        "Business Unit": "businessUnit",
        "Department": "department",
        "License Type": "licenseType",
        "Renewal Status": "renewalStatus",
        "Compliance Status": "complianceStatus",
        "Approval Status": "approvalStatus"
      };
      
      const rowKey = fieldMap[filter.field];
      if (!rowKey) return true;
      
      const rowValue = row[rowKey] as string;
      return filter.values.includes(rowValue);
    });
  }), [appliedFilters]);

  // Sort filtered rows
  const sortedRows = useMemo(() => {
    if (!sortColumn) return filteredRows;
    
    const key = columnToKeyMap[sortColumn];
    if (!key) return filteredRows;
    
    return [...filteredRows].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return sortDirection === 'asc' 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredRows, sortColumn, sortDirection]);

  const handleSort = (col: string) => {
    if (col === "Action") return;
    if (sortColumn === col) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
  };

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
    setFilterSearchQuery("");
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
            <Select defaultValue="2025">
              <SelectTrigger className="w-[140px] bg-card border-border">
                <SelectValue placeholder="Fiscal Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">FY 2025</SelectItem>
                <SelectItem value="2024">FY 2024</SelectItem>
                <SelectItem value="2023">FY 2023</SelectItem>
                <SelectItem value="2022">FY 2022</SelectItem>
                <SelectItem value="2021">FY 2021</SelectItem>
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
                    {displayedColumns.map((col) => (
                      <th 
                        key={col} 
                        onClick={() => handleSort(col)}
                        className={`px-3 py-3 text-left font-medium text-foreground whitespace-nowrap border-b border-border group ${
                          col === "Action" ? "sticky left-0 bg-secondary z-20" : "cursor-pointer hover:bg-secondary/80"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {col}
                          {col !== "Action" && (
                            sortColumn === col ? (
                              sortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-b border-border hover:bg-secondary/50 transition-colors ${getRowClassName(row)}`}
                    >
                      {displayedColumns.map((col) => {
                        if (col === "Action") {
                          return (
                            <td key={col} className="px-3 py-2 sticky left-0 bg-card z-10 border-r border-border">
                              <button 
                                onClick={() => handleActionClick(row)}
                                className="p-1.5 rounded hover:bg-cisco-blue/10 text-cisco-blue transition-colors"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            </td>
                          );
                        }
                        
                        const key = columnToKeyMap[col];
                        if (!key) return <td key={col} className="px-3 py-2 whitespace-nowrap">-</td>;
                        
                        const value = row[key];
                        
                        // Special rendering for certain columns
                        if (col === "Business Owner") {
                          return (
                            <td key={col} className={`px-3 py-2 whitespace-nowrap ${getCellHighlight(row, "businessOwner")}`}>
                              {value || <span className="text-red-500 italic">Missing</span>}
                            </td>
                          );
                        }
                        if (col === "Cost Center") {
                          return (
                            <td key={col} className={`px-3 py-2 whitespace-nowrap ${getCellHighlight(row, "costCenter")}`}>
                              {value || <span className="text-yellow-600 italic">Missing</span>}
                            </td>
                          );
                        }
                        if (col === "Renewal Status" || col === "Compliance Status" || col === "Approval Status") {
                          const statusValue = String(value);
                          return (
                            <td key={col} className="px-3 py-2 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                statusValue === "Active" || statusValue === "Compliant" || statusValue === "Approved" 
                                  ? "bg-green-100 text-green-700" 
                                  : statusValue === "Pending" || statusValue === "Review"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                                {statusValue}
                              </span>
                            </td>
                          );
                        }
                        if (col === "Unit Cost" || col === "Total Cost") {
                          return (
                            <td key={col} className="px-3 py-2 whitespace-nowrap text-right">
                              ${typeof value === 'number' ? value.toLocaleString() : value}
                            </td>
                          );
                        }
                        if (col === "Quantity") {
                          return <td key={col} className="px-3 py-2 whitespace-nowrap text-right">{value}</td>;
                        }
                        if (col === "Notes") {
                          return <td key={col} className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate">{value}</td>;
                        }
                        
                        return <td key={col} className="px-3 py-2 whitespace-nowrap">{value}</td>;
                      })}
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
                        onClick={() => handleSort(col)}
                        className={`px-4 py-3 text-left font-medium text-foreground whitespace-nowrap border-b border-border group ${
                          idx === 0 ? "sticky left-0 bg-secondary z-20" : "cursor-pointer hover:bg-secondary/80"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {col}
                          {col !== "Action" && (
                            sortColumn === col ? (
                              sortDirection === 'asc' 
                                ? <ArrowUp className="h-3.5 w-3.5 text-cisco-blue" />
                                : <ArrowDown className="h-3.5 w-3.5 text-cisco-blue" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
                            )
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row) => (
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
                    className={`flex items-center gap-3 p-2 rounded ${isLocked ? "bg-secondary" : "hover:bg-secondary/50 cursor-pointer"}`}
                    onClick={() => !isLocked && toggleColumnVisibility(col)}
                  >
                    <Checkbox 
                      id={col} 
                      checked={visibleColumns.includes(col)}
                      disabled={isLocked}
                      onCheckedChange={() => !isLocked && toggleColumnVisibility(col)}
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
              Close
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
                  setFilterSearchQuery("");
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
                    <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg">
                      {/* Search input */}
                      <div className="p-2 border-b border-border">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder={`Search ${selectedFilterField.toLowerCase()}...`}
                            value={filterSearchQuery}
                            onChange={(e) => setFilterSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cisco-blue focus:border-transparent"
                            autoFocus
                          />
                        </div>
                        {filterSearchQuery && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Showing {filterValues[selectedFilterField].filter(v => 
                              v.toLowerCase().includes(filterSearchQuery.toLowerCase())
                            ).length} of {filterValues[selectedFilterField].length}
                          </div>
                        )}
                      </div>
                      
                      {/* Options list */}
                      <div className="max-h-48 overflow-y-auto">
                        {filterValues[selectedFilterField]
                          .filter(value => value.toLowerCase().includes(filterSearchQuery.toLowerCase()))
                          .map((value) => (
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
                        {filterValues[selectedFilterField].filter(v => 
                          v.toLowerCase().includes(filterSearchQuery.toLowerCase())
                        ).length === 0 && (
                          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                            No results found
                          </div>
                        )}
                      </div>
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
