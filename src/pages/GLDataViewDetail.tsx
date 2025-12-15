import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, RefreshCw, X } from "lucide-react";
import TopNav from "@/components/TopNav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";

// Generate mock GL transaction data for this PO
const generateGLTransactionData = (poNumber: string) => {
  const nodeLevel2Options = ["Infrastructure", "Applications", "Security", "Analytics"];
  const nodeLevel3Options = ["Cloud Services", "On-Premise", "Hybrid", "Edge Computing"];
  const nodeLevel4Options = ["Production", "Development", "Testing", "Staging"];
  const nodeLevel5Options = ["Team Alpha", "Team Beta", "Team Gamma", "Team Delta"];
  const departmentCodes = ["DEPT001", "DEPT002", "DEPT003", "DEPT004", "DEPT005"];
  const fiscalQuarters = ["Q1", "Q2", "Q3", "Q4"];
  const fiscalPeriods = ["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08", "P09", "P10", "P11", "P12"];
  const glTransactionTypes = ["Expense", "Accrual", "Reversal", "Adjustment"];
  const accounts = ["6001", "6002", "6003", "6004", "6005"];
  const departmentNames = ["Engineering", "Finance", "Operations", "Marketing", "IT Services"];

  const data = [];
  const numRecords = Math.floor(Math.random() * 5) + 3; // 3-7 records per PO

  for (let i = 0; i < numRecords; i++) {
    data.push({
      id: `${poNumber}-GL-${i + 1}`,
      nodeLevel2: nodeLevel2Options[Math.floor(Math.random() * nodeLevel2Options.length)],
      nodeLevel3: nodeLevel3Options[Math.floor(Math.random() * nodeLevel3Options.length)],
      nodeLevel4: nodeLevel4Options[Math.floor(Math.random() * nodeLevel4Options.length)],
      nodeLevel5: nodeLevel5Options[Math.floor(Math.random() * nodeLevel5Options.length)],
      departmentCode: departmentCodes[Math.floor(Math.random() * departmentCodes.length)],
      fiscalQuarter: fiscalQuarters[Math.floor(Math.random() * fiscalQuarters.length)],
      fiscalPeriod: fiscalPeriods[Math.floor(Math.random() * fiscalPeriods.length)],
      glTransactionType: glTransactionTypes[Math.floor(Math.random() * glTransactionTypes.length)],
      poNumber: poNumber,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      departmentName: departmentNames[Math.floor(Math.random() * departmentNames.length)],
    });
  }
  return data;
};

// Generate mock Asset Depreciation data for this PO
const generateAssetDepreciationData = (poNumber: string) => {
  const assetCategories = ["Hardware", "Software", "Equipment", "Furniture", "Vehicles"];
  const departmentNumbers = ["100", "200", "300", "400", "500"];
  const level2Leaders = ["John Smith", "Jane Doe", "Mike Johnson", "Sarah Williams"];
  const level3Leaders = ["Tom Brown", "Lisa Davis", "Chris Wilson", "Amy Taylor"];
  const level4Leaders = ["David Lee", "Emma White", "James Martin", "Laura Garcia"];
  const level5Leaders = ["Robert Clark", "Jennifer Hall", "William Young", "Maria Lopez"];
  const ssTableCodes = ["STD", "ACC", "SL", "DDB"];
  const glPostedFlags = ["Y", "N"];

  const data = [];
  const numRecords = Math.floor(Math.random() * 5) + 3;

  for (let i = 0; i < numRecords; i++) {
    data.push({
      id: `${poNumber}-AD-${i + 1}`,
      assetCategory: assetCategories[Math.floor(Math.random() * assetCategories.length)],
      assetNumber: `AST${String(Math.floor(Math.random() * 100000)).padStart(6, "0")}`,
      departmentNumber: departmentNumbers[Math.floor(Math.random() * departmentNumbers.length)],
      purchaseReqNumber: `REQ${String(Math.floor(Math.random() * 10000)).padStart(5, "0")}`,
      poNumber: poNumber,
      level2Leader: level2Leaders[Math.floor(Math.random() * level2Leaders.length)],
      level3Leader: level3Leaders[Math.floor(Math.random() * level3Leaders.length)],
      level4Leader: level4Leaders[Math.floor(Math.random() * level4Leaders.length)],
      level5Leader: level5Leaders[Math.floor(Math.random() * level5Leaders.length)],
      ssTableCode: ssTableCodes[Math.floor(Math.random() * ssTableCodes.length)],
      glPostedFlag: glPostedFlags[Math.floor(Math.random() * glPostedFlags.length)],
    });
  }
  return data;
};

const GLDataViewDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("gl-transactions");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filters, setFilters] = useState([
    { field: "Fiscal year", value: "FY26" },
    { field: "Po number", value: id || "" },
  ]);

  // Generate mock data based on PO number
  const glTransactionData = useMemo(() => generateGLTransactionData(id || ""), [id]);
  const assetDepreciationData = useMemo(() => generateAssetDepreciationData(id || ""), [id]);

  const currentData = activeTab === "gl-transactions" ? glTransactionData : assetDepreciationData;

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows(prev =>
      prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map(row => row.id));
    }
  };

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <div className="p-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/gldataview")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground mb-2">
          Financial Analysts Portfolio View for the PO: {id} in Financial Year FY26
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground mb-6">
          Forecast for this PO does not exist within Logged-In User's Portfolio
        </p>

        {/* GL Transaction Details Collapsible */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="bg-card border border-border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium text-foreground">GL Transaction Details</span>
              </div>
              <span className="text-sm text-muted-foreground">(Expand To Explore)</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 border-t border-border">
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                  <TabsList className="bg-muted">
                    <TabsTrigger value="gl-transactions" className="text-xs">
                      GL transactions
                    </TabsTrigger>
                    <TabsTrigger value="asset-depreciation" className="text-xs">
                      Asset Depreciation
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Action Bar */}
                <div className="flex items-center justify-between mb-4">
                  <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                    <span>Action:</span>
                    <RefreshCw className="h-3 w-3" />
                    <span>Refresh data</span>
                  </button>
                </div>

                {/* Bulk Update Button */}
                <div className="mb-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                    Bulk Update
                  </Button>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-sm text-muted-foreground">Filtered:</span>
                  {filters.map((filter, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1"
                    >
                      <span className="text-xs">{filter.field}: {filter.value}</span>
                      <button
                        onClick={() => removeFilter(index)}
                        className="hover:bg-muted rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Data Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectedRows.length === currentData.length && currentData.length > 0}
                              onCheckedChange={toggleAllRows}
                            />
                          </TableHead>
                          {activeTab === "gl-transactions" ? (
                            <>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Node Level 2</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Node Level 3</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Node Level 4</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Node Level 5</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Department Code</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Fiscal Quarter</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Fiscal Period</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">GL Transaction Type</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">PO Number</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Account</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Department Name</TableHead>
                            </>
                          ) : (
                            <>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Asset Category</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Asset #</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Department #</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Purchase REQ #</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">PO #</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Level 2 Leader</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Level 3 Leader</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Level 4 Leader</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">Level 5 Leader</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">SS Table CD</TableHead>
                              <TableHead className="text-xs font-medium whitespace-nowrap">GL Posted Flag</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentData.map((row, index) => (
                          <TableRow
                            key={row.id}
                            className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedRows.includes(row.id)}
                                onCheckedChange={() => toggleRowSelection(row.id)}
                              />
                            </TableCell>
                            {activeTab === "gl-transactions" ? (
                              <>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).nodeLevel2}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).nodeLevel3}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).nodeLevel4}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).nodeLevel5}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).departmentCode}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).fiscalQuarter}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).fiscalPeriod}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).glTransactionType}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).poNumber}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).account}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).departmentName}</TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).assetCategory}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).assetNumber}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).departmentNumber}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).purchaseReqNumber}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).poNumber}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).level2Leader}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).level3Leader}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).level4Leader}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).level5Leader}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).ssTableCode}</TableCell>
                                <TableCell className="text-xs whitespace-nowrap">{(row as any).glPostedFlag}</TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
};

export default GLDataViewDetail;
