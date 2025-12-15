import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronDown, Filter, X, Search, Check } from "lucide-react";
import TopNav from "@/components/TopNav";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock data for filter options
const filterOptions = {
  level2Leader: ["John Smith", "Jane Doe", "Robert Johnson", "Emily Davis", "Michael Brown"],
  level3Leader: ["Alex Wilson", "Sarah Miller", "Chris Taylor", "Lisa Anderson", "David Martinez"],
  level4Leader: ["Tom Harris", "Nancy Clark", "James Lewis", "Patricia Walker", "Daniel Hall"],
  level5Leader: ["Kevin Young", "Amanda King", "Brian Wright", "Michelle Scott", "Steven Green"],
  nodeLevel2: ["020535", "020540", "020545", "020550", "020555"],
  nodeLevel3: ["020535001", "020535002", "020540001", "020545001", "020550001"],
  nodeLevel4: ["02053500101", "02053500102", "02054000101", "02054500101", "02055000101"],
  nodeLevel5: ["0205350010101", "0205350010102", "0205400010101", "0205450010101", "0205500010101"],
  fundingSource: ["Capital", "Operating", "Mixed", "Grant", "Internal"],
  cogsOpex: ["COGS", "OPEX", "Both"],
};

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

const FilterDropdown = ({ label, options, value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const displayText = value.length === 0 ? "All" : value.length === 1 ? value[0] : `${value.length} selected`;

  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-full flex items-center justify-between px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
            role="combobox"
            aria-expanded={open}
          >
            <span className="truncate">{displayText}</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0 bg-white z-50" align="start">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
          {value.length > 0 && (
            <div className="p-2 border-b border-border flex flex-wrap gap-1">
              {value.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 bg-[#049FD9]/10 text-[#049FD9] text-xs px-2 py-0.5 rounded"
                >
                  {v.length > 10 ? `${v.substring(0, 10)}...` : v}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(value.filter((val) => val !== v));
                    }}
                    className="hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="max-h-[200px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center gap-2",
                    value.includes(option) && "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 border rounded flex items-center justify-center shrink-0",
                      value.includes(option)
                        ? "bg-[#049FD9] border-[#049FD9]"
                        : "border-gray-300"
                    )}
                  >
                    {value.includes(option) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  {option}
                </button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface DashboardRow {
  id: string;
  label: string;
  isExpandable: boolean;
  level: number;
  isHighlighted?: boolean;
  highlightColor?: "blue" | "gold";
  children?: DashboardRow[];
  data: {
    q1Actual: number;
    q1Forecast: number;
    q2Actual: number;
    q2Forecast: number;
    q3Actual: number;
    q3Forecast: number;
    q4Actual: number;
    q4Forecast: number;
    fy26POCount: number;
    fy26Actual: number;
    fy26Forecast: number;
    ffff: number;
    fy25POCount: number;
    fy25Actual: number;
    fy25Forecast: number;
    poCount: number;
    yoyDollar: number;
  };
}

const generateDashboardData = (): DashboardRow[] => {
  return [
    {
      id: "committed-amortized",
      label: "A) Committed Amortized Total",
      isExpandable: true,
      level: 0,
      data: {
        q1Actual: 110760556,
        q1Forecast: 232840855,
        q2Actual: 0,
        q2Forecast: 232840855,
        q3Actual: 0,
        q3Forecast: 232840855,
        q4Actual: 0,
        q4Forecast: 232840855,
        fy26POCount: 2169,
        fy26Actual: 110760556,
        fy26Forecast: 931363419,
        ffff: -820602864,
        fy25POCount: 2084,
        fy25Actual: 746348656,
        fy25Forecast: 746348656,
        poCount: 85,
        yoyDollar: 185014763,
      },
      children: [
        {
          id: "committed-1",
          label: "1. Something",
          isExpandable: false,
          level: 1,
          data: {
            q1Actual: 50000000,
            q1Forecast: 100000000,
            q2Actual: 0,
            q2Forecast: 100000000,
            q3Actual: 0,
            q3Forecast: 100000000,
            q4Actual: 0,
            q4Forecast: 100000000,
            fy26POCount: 1000,
            fy26Actual: 50000000,
            fy26Forecast: 400000000,
            ffff: -350000000,
            fy25POCount: 950,
            fy25Actual: 350000000,
            fy25Forecast: 350000000,
            poCount: 50,
            yoyDollar: 50000000,
          },
        },
        {
          id: "committed-2",
          label: "2. Another Item",
          isExpandable: false,
          level: 1,
          data: {
            q1Actual: 60760556,
            q1Forecast: 132840855,
            q2Actual: 0,
            q2Forecast: 132840855,
            q3Actual: 0,
            q3Forecast: 132840855,
            q4Actual: 0,
            q4Forecast: 132840855,
            fy26POCount: 1169,
            fy26Actual: 60760556,
            fy26Forecast: 531363419,
            ffff: -470602864,
            fy25POCount: 1134,
            fy25Actual: 396348656,
            fy25Forecast: 396348656,
            poCount: 35,
            yoyDollar: 135014763,
          },
        },
      ],
    },
    {
      id: "committed-uplifts",
      label: "B) Committed Uplifts Total",
      isExpandable: true,
      level: 0,
      data: {
        q1Actual: 0,
        q1Forecast: 5193889,
        q2Actual: 0,
        q2Forecast: 5193889,
        q3Actual: 0,
        q3Forecast: 5193889,
        q4Actual: 0,
        q4Forecast: 5193889,
        fy26POCount: 0,
        fy26Actual: 0,
        fy26Forecast: 20775556,
        ffff: -20775556,
        fy25POCount: 0,
        fy25Actual: 0,
        fy25Forecast: 0,
        poCount: 0,
        yoyDollar: 20775556,
      },
      children: [
        {
          id: "uplifts-1",
          label: "1. Non-Labor Committed Uplifts Total",
          isExpandable: true,
          level: 1,
          data: {
            q1Actual: 0,
            q1Forecast: 3193889,
            q2Actual: 0,
            q2Forecast: 3193889,
            q3Actual: 0,
            q3Forecast: 3193889,
            q4Actual: 0,
            q4Forecast: 3193889,
            fy26POCount: 0,
            fy26Actual: 0,
            fy26Forecast: 12775556,
            ffff: -12775556,
            fy25POCount: 0,
            fy25Actual: 0,
            fy25Forecast: 0,
            poCount: 0,
            yoyDollar: 12775556,
          },
          children: [
            {
              id: "uplifts-1a",
              label: "a. Project Alpha",
              isExpandable: false,
              level: 2,
              data: {
                q1Actual: 0,
                q1Forecast: 1500000,
                q2Actual: 0,
                q2Forecast: 1500000,
                q3Actual: 0,
                q3Forecast: 1500000,
                q4Actual: 0,
                q4Forecast: 1500000,
                fy26POCount: 0,
                fy26Actual: 0,
                fy26Forecast: 6000000,
                ffff: -6000000,
                fy25POCount: 0,
                fy25Actual: 0,
                fy25Forecast: 0,
                poCount: 0,
                yoyDollar: 6000000,
              },
            },
            {
              id: "uplifts-1b",
              label: "b. Project Beta",
              isExpandable: false,
              level: 2,
              data: {
                q1Actual: 0,
                q1Forecast: 1693889,
                q2Actual: 0,
                q2Forecast: 1693889,
                q3Actual: 0,
                q3Forecast: 1693889,
                q4Actual: 0,
                q4Forecast: 1693889,
                fy26POCount: 0,
                fy26Actual: 0,
                fy26Forecast: 6775556,
                ffff: -6775556,
                fy25POCount: 0,
                fy25Actual: 0,
                fy25Forecast: 0,
                poCount: 0,
                yoyDollar: 6775556,
              },
            },
          ],
        },
        {
          id: "uplifts-2",
          label: "2. Labor Committed Uplifts Total",
          isExpandable: false,
          level: 1,
          data: {
            q1Actual: 0,
            q1Forecast: 2000000,
            q2Actual: 0,
            q2Forecast: 2000000,
            q3Actual: 0,
            q3Forecast: 2000000,
            q4Actual: 0,
            q4Forecast: 2000000,
            fy26POCount: 0,
            fy26Actual: 0,
            fy26Forecast: 8000000,
            ffff: -8000000,
            fy25POCount: 0,
            fy25Actual: 0,
            fy25Forecast: 0,
            poCount: 0,
            yoyDollar: 8000000,
          },
        },
      ],
    },
    {
      id: "t1-subtotal",
      label: "T1) Sub Total Committed (A+B)",
      isExpandable: false,
      level: 0,
      isHighlighted: true,
      highlightColor: "blue",
      data: {
        q1Actual: 110760556,
        q1Forecast: 238034744,
        q2Actual: 0,
        q2Forecast: 238034744,
        q3Actual: 0,
        q3Forecast: 238034744,
        q4Actual: 0,
        q4Forecast: 238034744,
        fy26POCount: 2169,
        fy26Actual: 110760556,
        fy26Forecast: 952138975,
        ffff: -841378420,
        fy25POCount: 2084,
        fy25Actual: 746348656,
        fy25Forecast: 746348656,
        poCount: 85,
        yoyDollar: 205790319,
      },
    },
    {
      id: "uncommitted-total",
      label: "C) Uncommitted Non-Labor Total",
      isExpandable: true,
      level: 0,
      data: {
        q1Actual: 0,
        q1Forecast: 5000000,
        q2Actual: 0,
        q2Forecast: 5000000,
        q3Actual: 0,
        q3Forecast: 5000000,
        q4Actual: 0,
        q4Forecast: 5000000,
        fy26POCount: 0,
        fy26Actual: 0,
        fy26Forecast: 20000000,
        ffff: -20000000,
        fy25POCount: 0,
        fy25Actual: 0,
        fy25Forecast: 0,
        poCount: 0,
        yoyDollar: 20000000,
      },
      children: [
        {
          id: "uncommitted-1",
          label: "1. Infrastructure",
          isExpandable: false,
          level: 1,
          data: {
            q1Actual: 0,
            q1Forecast: 3000000,
            q2Actual: 0,
            q2Forecast: 3000000,
            q3Actual: 0,
            q3Forecast: 3000000,
            q4Actual: 0,
            q4Forecast: 3000000,
            fy26POCount: 0,
            fy26Actual: 0,
            fy26Forecast: 12000000,
            ffff: -12000000,
            fy25POCount: 0,
            fy25Actual: 0,
            fy25Forecast: 0,
            poCount: 0,
            yoyDollar: 12000000,
          },
        },
        {
          id: "uncommitted-2",
          label: "2. Services",
          isExpandable: false,
          level: 1,
          data: {
            q1Actual: 0,
            q1Forecast: 2000000,
            q2Actual: 0,
            q2Forecast: 2000000,
            q3Actual: 0,
            q3Forecast: 2000000,
            q4Actual: 0,
            q4Forecast: 2000000,
            fy26POCount: 0,
            fy26Actual: 0,
            fy26Forecast: 8000000,
            ffff: -8000000,
            fy25POCount: 0,
            fy25Actual: 0,
            fy25Forecast: 0,
            poCount: 0,
            yoyDollar: 8000000,
          },
        },
      ],
    },
    {
      id: "t2-subtotal",
      label: "T2) Sub Total Non-Labor (T1+C)",
      isExpandable: false,
      level: 0,
      isHighlighted: true,
      highlightColor: "blue",
      data: {
        q1Actual: 110760556,
        q1Forecast: 243034744,
        q2Actual: 0,
        q2Forecast: 243034744,
        q3Actual: 0,
        q3Forecast: 243034744,
        q4Actual: 0,
        q4Forecast: 243034744,
        fy26POCount: 2169,
        fy26Actual: 110760556,
        fy26Forecast: 972138975,
        ffff: -861378420,
        fy25POCount: 2084,
        fy25Actual: 746348656,
        fy25Forecast: 746348656,
        poCount: 85,
        yoyDollar: 225790319,
      },
    },
    {
      id: "labor-total",
      label: "D) Labor Total",
      isExpandable: false,
      level: 0,
      data: {
        q1Actual: 25000000,
        q1Forecast: 30000000,
        q2Actual: 0,
        q2Forecast: 30000000,
        q3Actual: 0,
        q3Forecast: 30000000,
        q4Actual: 0,
        q4Forecast: 30000000,
        fy26POCount: 150,
        fy26Actual: 25000000,
        fy26Forecast: 120000000,
        ffff: -95000000,
        fy25POCount: 145,
        fy25Actual: 100000000,
        fy25Forecast: 100000000,
        poCount: 5,
        yoyDollar: 20000000,
      },
    },
    {
      id: "grand-total",
      label: "Grand Total (T2+D)",
      isExpandable: false,
      level: 0,
      isHighlighted: true,
      highlightColor: "gold",
      data: {
        q1Actual: 135760556,
        q1Forecast: 273034744,
        q2Actual: 0,
        q2Forecast: 273034744,
        q3Actual: 0,
        q3Forecast: 273034744,
        q4Actual: 0,
        q4Forecast: 273034744,
        fy26POCount: 2319,
        fy26Actual: 135760556,
        fy26Forecast: 1092138975,
        ffff: -956378420,
        fy25POCount: 2229,
        fy25Actual: 846348656,
        fy25Forecast: 846348656,
        poCount: 90,
        yoyDollar: 245790319,
      },
    },
  ];
};

const formatCurrency = (value: number): string => {
  if (value === 0) return "$0";
  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString("en-US");
  return value < 0 ? `-$${formatted}` : `$${formatted}`;
};

const formatNumber = (value: number): string => {
  return value.toLocaleString("en-US");
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [fiscalYear, setFiscalYear] = useState("FY 2026");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    level2Leader: [] as string[],
    level3Leader: [] as string[],
    level4Leader: [] as string[],
    level5Leader: [] as string[],
    nodeLevel2: [] as string[],
    nodeLevel3: [] as string[],
    nodeLevel4: [] as string[],
    nodeLevel5: [] as string[],
    fundingSource: [] as string[],
    cogsOpex: [] as string[],
  });
  
  const [tempFilters, setTempFilters] = useState(filters);
  
  const dashboardData = generateDashboardData();
  
  const activeFilterCount = Object.values(filters).filter(arr => arr.length > 0).length;
  
  const handleOpenFilterModal = () => {
    setTempFilters(filters);
    setIsFilterModalOpen(true);
  };
  
  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setIsFilterModalOpen(false);
  };
  
  const handleResetFilters = () => {
    const emptyFilters = {
      level2Leader: [],
      level3Leader: [],
      level4Leader: [],
      level5Leader: [],
      nodeLevel2: [],
      nodeLevel3: [],
      nodeLevel4: [],
      nodeLevel5: [],
      fundingSource: [],
      cogsOpex: [],
    };
    setTempFilters(emptyFilters);
  };
  
  const handleCancelFilters = () => {
    setIsFilterModalOpen(false);
  };

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const renderRows = (rows: DashboardRow[], parentExpanded = true): React.ReactNode[] => {
    const result: React.ReactNode[] = [];

    rows.forEach((row) => {
      if (!parentExpanded) return;

      const isExpanded = expandedRows.has(row.id);
      const indentPx = row.level * 20;

      let bgClass = "bg-white";
      if (row.isHighlighted) {
        bgClass = row.highlightColor === "gold" ? "bg-amber-100" : "bg-blue-50";
      }

      result.push(
        <TableRow key={row.id} className={`${bgClass} hover:bg-muted/30`}>
          <TableCell className="font-medium border-r border-border/50">
            <div className="flex items-center" style={{ paddingLeft: `${indentPx}px` }}>
              {row.isExpandable ? (
                <button
                  onClick={() => toggleRow(row.id)}
                  className="mr-2 p-0.5 hover:bg-muted rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              ) : (
                <span className="w-5 mr-2" />
              )}
              <span className={row.isHighlighted ? "font-semibold" : ""}>{row.label}</span>
            </div>
          </TableCell>
          {/* Q1 */}
          <TableCell className={`text-right border-r border-border/30 ${row.data.q1Actual < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q1Actual)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.q1Forecast < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q1Forecast)}
          </TableCell>
          {/* Q2 */}
          <TableCell className={`text-right border-r border-border/30 ${row.data.q2Actual < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q2Actual)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.q2Forecast < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q2Forecast)}
          </TableCell>
          {/* Q3 */}
          <TableCell className={`text-right border-r border-border/30 ${row.data.q3Actual < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q3Actual)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.q3Forecast < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q3Forecast)}
          </TableCell>
          {/* Q4 */}
          <TableCell className={`text-right border-r border-border/30 ${row.data.q4Actual < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q4Actual)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/50 ${row.data.q4Forecast < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.q4Forecast)}
          </TableCell>
          {/* FY26 Yearly */}
          <TableCell className="text-right border-r border-border/30">
            {formatNumber(row.data.fy26POCount)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.fy26Actual < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.fy26Actual)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.fy26Forecast < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.fy26Forecast)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/50 ${row.data.ffff < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.ffff)}
          </TableCell>
          {/* FY25 Yearly */}
          <TableCell className="text-right border-r border-border/30">
            {formatNumber(row.data.fy25POCount)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.fy25Actual < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.fy25Actual)}
          </TableCell>
          <TableCell className={`text-right border-r border-border/30 ${row.data.fy25Forecast < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.fy25Forecast)}
          </TableCell>
          <TableCell className="text-right border-r border-border/50">
            {formatNumber(row.data.poCount)}
          </TableCell>
          {/* Forecast vs */}
          <TableCell className={`text-right ${row.data.yoyDollar < 0 ? "text-red-600" : ""}`}>
            {formatCurrency(row.data.yoyDollar)}
          </TableCell>
        </TableRow>
      );

      if (row.children && isExpanded) {
        result.push(...renderRows(row.children, true));
      }
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <TopNav />

      <div className="p-6">
        {/* Back navigation */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#049FD9] hover:text-[#0389BD] mb-4 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        {/* FY Dropdown */}
        <div className="mb-2">
          <Select value={fiscalYear} onValueChange={setFiscalYear}>
            <SelectTrigger className="w-[140px] bg-white border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="FY 2025">FY 2025</SelectItem>
              <SelectItem value="FY 2026">FY 2026</SelectItem>
              <SelectItem value="FY 2027">FY 2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-[#032D4D] mb-4">
          Finance Leaders Dashboard
        </h1>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleOpenFilterModal}
              className="flex items-center gap-2 text-[#049FD9] hover:text-[#0389BD] text-sm"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {activeFilterCount > 0 ? `${activeFilterCount} Filter(s) Applied` : "No Filters Applied"}
          </span>
        </div>

        {/* Filter Modal */}
        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogContent className="max-w-[540px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#032D4D]">Filters</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Leader Filters Row */}
              <div className="grid grid-cols-2 gap-4">
                <FilterDropdown
                  label="Level 2 Leader"
                  options={filterOptions.level2Leader}
                  value={tempFilters.level2Leader}
                  onChange={(val) => setTempFilters({ ...tempFilters, level2Leader: val })}
                />
                <FilterDropdown
                  label="Node Level 2"
                  options={filterOptions.nodeLevel2}
                  value={tempFilters.nodeLevel2}
                  onChange={(val) => setTempFilters({ ...tempFilters, nodeLevel2: val })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FilterDropdown
                  label="Level 3 Leader"
                  options={filterOptions.level3Leader}
                  value={tempFilters.level3Leader}
                  onChange={(val) => setTempFilters({ ...tempFilters, level3Leader: val })}
                />
                <FilterDropdown
                  label="Node Level 3"
                  options={filterOptions.nodeLevel3}
                  value={tempFilters.nodeLevel3}
                  onChange={(val) => setTempFilters({ ...tempFilters, nodeLevel3: val })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FilterDropdown
                  label="Level 4 Leader"
                  options={filterOptions.level4Leader}
                  value={tempFilters.level4Leader}
                  onChange={(val) => setTempFilters({ ...tempFilters, level4Leader: val })}
                />
                <FilterDropdown
                  label="Node Level 4"
                  options={filterOptions.nodeLevel4}
                  value={tempFilters.nodeLevel4}
                  onChange={(val) => setTempFilters({ ...tempFilters, nodeLevel4: val })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FilterDropdown
                  label="Level 5 Leader"
                  options={filterOptions.level5Leader}
                  value={tempFilters.level5Leader}
                  onChange={(val) => setTempFilters({ ...tempFilters, level5Leader: val })}
                />
                <FilterDropdown
                  label="Node Level 5"
                  options={filterOptions.nodeLevel5}
                  value={tempFilters.nodeLevel5}
                  onChange={(val) => setTempFilters({ ...tempFilters, nodeLevel5: val })}
                />
              </div>
              
              {/* Bottom Row */}
              <div className="grid grid-cols-2 gap-4">
                <FilterDropdown
                  label="Funding Source"
                  options={filterOptions.fundingSource}
                  value={tempFilters.fundingSource}
                  onChange={(val) => setTempFilters({ ...tempFilters, fundingSource: val })}
                />
                <FilterDropdown
                  label="COGS / OPEX"
                  options={filterOptions.cogsOpex}
                  value={tempFilters.cogsOpex}
                  onChange={(val) => setTempFilters({ ...tempFilters, cogsOpex: val })}
                />
              </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleCancelFilters}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="border-[#049FD9] text-[#049FD9] hover:bg-[#049FD9]/10"
              >
                Reset
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="bg-[#049FD9] text-white hover:bg-[#0389BD]"
              >
                Apply
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Data Table */}
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {/* Row 1: Group Headers */}
                <TableRow className="border-b-0">
                  <TableHead className="bg-[#032D4D] text-white font-semibold border-r border-white/20" rowSpan={2}>
                    Spend Categories
                  </TableHead>
                  <TableHead className="bg-[#049FD9] text-white text-center font-semibold border-r border-white/20" colSpan={8}>
                    FY26 (Quarterly)
                  </TableHead>
                  <TableHead className="bg-[#032D4D] text-white text-center font-semibold border-r border-white/20" colSpan={4}>
                    FY26 (Yearly)
                  </TableHead>
                  <TableHead className="bg-amber-600 text-white text-center font-semibold border-r border-white/20" colSpan={4}>
                    FY25 (Yearly)
                  </TableHead>
                  <TableHead className="bg-red-500 text-white text-center font-semibold" rowSpan={2}>
                    Y/Y $
                  </TableHead>
                </TableRow>
                {/* Row 2: Column Headers */}
                <TableRow>
                  {/* Q1-Q4 headers */}
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q1 Actual</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q1 Forecast</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q2 Actual</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q2 Forecast</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q3 Actual</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q3 Forecast</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q4 Actual</TableHead>
                  <TableHead className="bg-[#049FD9]/90 text-white text-center text-xs border-r border-white/20">Q4 Forecast</TableHead>
                  {/* FY26 Yearly */}
                  <TableHead className="bg-[#032D4D]/90 text-white text-center text-xs border-r border-white/20">PO Count</TableHead>
                  <TableHead className="bg-[#032D4D]/90 text-white text-center text-xs border-r border-white/20">Actual</TableHead>
                  <TableHead className="bg-[#032D4D]/90 text-white text-center text-xs border-r border-white/20">Forecast</TableHead>
                  <TableHead className="bg-[#032D4D]/90 text-white text-center text-xs border-r border-white/20">FFFF</TableHead>
                  {/* FY25 Yearly */}
                  <TableHead className="bg-amber-600/90 text-white text-center text-xs border-r border-white/20">PO Count</TableHead>
                  <TableHead className="bg-amber-600/90 text-white text-center text-xs border-r border-white/20">Actual</TableHead>
                  <TableHead className="bg-amber-600/90 text-white text-center text-xs border-r border-white/20">Forecast</TableHead>
                  <TableHead className="bg-amber-600/90 text-white text-center text-xs border-r border-white/20">PO Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderRows(dashboardData)}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
