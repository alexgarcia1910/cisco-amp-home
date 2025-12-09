import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Save, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Extended mock data for detail view
const getDetailData = (id: string) => {
  const baseData: Record<string, any> = {
    "1": {
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
      level4Leader: "Michael Brown",
      level5Leader: "Sarah Wilson",
      level6Leader: "Tom Davis",
      // Main PO Financial Data
      q1CommitFY26: 125000, q2CommitFY26: 135000, q3CommitFY26: 145000, q4CommitFY26: 155000, totalCommitFY26: 560000,
      q1CommitFY27: 130000, q2CommitFY27: 140000, q3CommitFY27: 150000, q4CommitFY27: 160000, totalCommitFY27: 580000,
      q1ActualsFY26: 120000, q2ActualsFY26: 130000, q3ActualsFY26: 0, q4ActualsFY26: 0, totalActualsFY26: 250000,
      q1ActualsFY27: 0, q2ActualsFY27: 0, q3ActualsFY27: 0, q4ActualsFY27: 0, totalActualsFY27: 0,
      q1ForecastFY26: 125000, q2ForecastFY26: 135000, q3ForecastFY26: 145000, q4ForecastFY26: 155000, totalForecastFY26: 560000,
      q1ForecastFY27: 130000, q2ForecastFY27: 140000, q3ForecastFY27: 150000, q4ForecastFY27: 160000, totalForecastFY27: 580000,
      // Renewal Data
      renewalDeptNumber: "D1000-R",
      renewalPONumber: "PO-2026-0001-R",
      renewalPOAmount: 600000,
      renewalStartDate: "2026-08-01",
      renewalEndDate: "2027-07-31",
      renewalTermMonths: 12,
      renewalQuarter: "Q3 FY26",
      dealStatus: "In Progress",
      opportunityStatus: "Qualified",
      internalSSMComments: "Pending approval from finance",
      posBeingConsolidated: "PO-2025-0089, PO-2025-0091",
      eltStrategy: "Consolidation",
      // Potential Liabilities
      potentialLiabilityQ1FY26: 5000, potentialLiabilityQ2FY26: 5500, potentialLiabilityQ3FY26: 6000, potentialLiabilityQ4FY26: 6500, potentialLiabilityTotalFY26: 23000,
      potentialLiabilityQ1FY27: 7000, potentialLiabilityQ2FY27: 7500, potentialLiabilityQ3FY27: 8000, potentialLiabilityQ4FY27: 8500, potentialLiabilityTotalFY27: 31000,
      // Uplift Data
      priceChangePercent: 3.5,
      priceChangeQ1FY26: 4375, priceChangeQ2FY26: 4725, priceChangeQ3FY26: 5075, priceChangeQ4FY26: 5425, priceChangeTotalFY26: 19600,
      volumeChangePercent: 2.0,
      volumeChangeQ1FY26: 2500, volumeChangeQ2FY26: 2700, volumeChangeQ3FY26: 2900, volumeChangeQ4FY26: 3100, volumeChangeTotalFY26: 11200,
      expansionPercent: 5.0,
      expansionQ1FY26: 6250, expansionQ2FY26: 6750, expansionQ3FY26: 7250, expansionQ4FY26: 7750, expansionTotalFY26: 28000,
      totalUpliftPercent: 10.5,
      finalForecastWithUpliftQ1FY26: 138125, finalForecastWithUpliftQ2FY26: 149175, finalForecastWithUpliftQ3FY26: 160225, finalForecastWithUpliftQ4FY26: 171275, finalForecastWithUpliftTotalFY26: 618800,
      finalForecastWithoutUpliftQ1FY26: 125000, finalForecastWithoutUpliftQ2FY26: 135000, finalForecastWithoutUpliftQ3FY26: 145000, finalForecastWithoutUpliftQ4FY26: 155000, finalForecastWithoutUpliftTotalFY26: 560000,
    }
  };
  
  // Generate similar data for other IDs
  if (!baseData[id]) {
    return {
      id,
      expenseCategory: "Software",
      costPool: "Cloud Services",
      swUsageCategory: "Departmental",
      swCategory: "SaaS",
      deptNumber: `D100${id}`,
      poNumber: `PO-2026-000${id}`,
      poNumberSecondary: "",
      cogsOpex: "OPEX",
      level2Leader: "Sample Leader 2",
      level3Leader: "Sample Leader 3",
      level4Leader: "Sample Leader 4",
      level5Leader: "Sample Leader 5",
      level6Leader: "Sample Leader 6",
      q1CommitFY26: 100000, q2CommitFY26: 105000, q3CommitFY26: 110000, q4CommitFY26: 115000, totalCommitFY26: 430000,
      q1CommitFY27: 120000, q2CommitFY27: 125000, q3CommitFY27: 130000, q4CommitFY27: 135000, totalCommitFY27: 510000,
      q1ActualsFY26: 98000, q2ActualsFY26: 103000, q3ActualsFY26: 0, q4ActualsFY26: 0, totalActualsFY26: 201000,
      q1ActualsFY27: 0, q2ActualsFY27: 0, q3ActualsFY27: 0, q4ActualsFY27: 0, totalActualsFY27: 0,
      q1ForecastFY26: 100000, q2ForecastFY26: 105000, q3ForecastFY26: 110000, q4ForecastFY26: 115000, totalForecastFY26: 430000,
      q1ForecastFY27: 120000, q2ForecastFY27: 125000, q3ForecastFY27: 130000, q4ForecastFY27: 135000, totalForecastFY27: 510000,
      renewalDeptNumber: "",
      renewalPONumber: "",
      renewalPOAmount: 0,
      renewalStartDate: "",
      renewalEndDate: "",
      renewalTermMonths: 0,
      renewalQuarter: "",
      dealStatus: "",
      opportunityStatus: "",
      internalSSMComments: "",
      posBeingConsolidated: "",
      eltStrategy: "",
      potentialLiabilityQ1FY26: 0, potentialLiabilityQ2FY26: 0, potentialLiabilityQ3FY26: 0, potentialLiabilityQ4FY26: 0, potentialLiabilityTotalFY26: 0,
      potentialLiabilityQ1FY27: 0, potentialLiabilityQ2FY27: 0, potentialLiabilityQ3FY27: 0, potentialLiabilityQ4FY27: 0, potentialLiabilityTotalFY27: 0,
      priceChangePercent: 0,
      priceChangeQ1FY26: 0, priceChangeQ2FY26: 0, priceChangeQ3FY26: 0, priceChangeQ4FY26: 0, priceChangeTotalFY26: 0,
      volumeChangePercent: 0,
      volumeChangeQ1FY26: 0, volumeChangeQ2FY26: 0, volumeChangeQ3FY26: 0, volumeChangeQ4FY26: 0, volumeChangeTotalFY26: 0,
      expansionPercent: 0,
      expansionQ1FY26: 0, expansionQ2FY26: 0, expansionQ3FY26: 0, expansionQ4FY26: 0, expansionTotalFY26: 0,
      totalUpliftPercent: 0,
      finalForecastWithUpliftQ1FY26: 0, finalForecastWithUpliftQ2FY26: 0, finalForecastWithUpliftQ3FY26: 0, finalForecastWithUpliftQ4FY26: 0, finalForecastWithUpliftTotalFY26: 0,
      finalForecastWithoutUpliftQ1FY26: 0, finalForecastWithoutUpliftQ2FY26: 0, finalForecastWithoutUpliftQ3FY26: 0, finalForecastWithoutUpliftQ4FY26: 0, finalForecastWithoutUpliftTotalFY26: 0,
    };
  }
  
  return baseData[id];
};

const formatCurrency = (amount: number) => {
  if (amount === 0) return "-";
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const FinancialAnalystPODetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    mainPO: true,
    renewal: true,
    commits: true,
    actuals: true,
    forecasts: true,
    liabilities: true,
    uplifts: true,
    finalForecasts: true
  });

  const data = getDetailData(id || "1");

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const QuarterlyGrid = ({ 
    label, 
    values, 
    headerBg = "bg-[#032D4D]",
    totalBg = "bg-[#049FD9]/20"
  }: { 
    label: string; 
    values: { q1: number; q2: number; q3: number; q4: number; total: number }[];
    headerBg?: string;
    totalBg?: string;
  }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className={`${headerBg} text-white px-4 py-2 font-medium text-sm`}>
        {label}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground w-20">FY</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Q1</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Q2</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Q3</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Q4</th>
              <th className={`px-3 py-2 text-right font-medium text-muted-foreground ${totalBg}`}>Total</th>
            </tr>
          </thead>
          <tbody>
            {values.map((row, idx) => (
              <tr key={idx} className="border-t border-border">
                <td className="px-3 py-2 font-medium">FY{26 + idx}</td>
                <td className="px-3 py-2 text-right">
                  {isEditMode ? (
                    <Input type="text" defaultValue={formatCurrency(row.q1)} className="h-7 w-24 text-right text-sm" />
                  ) : formatCurrency(row.q1)}
                </td>
                <td className="px-3 py-2 text-right">
                  {isEditMode ? (
                    <Input type="text" defaultValue={formatCurrency(row.q2)} className="h-7 w-24 text-right text-sm" />
                  ) : formatCurrency(row.q2)}
                </td>
                <td className="px-3 py-2 text-right">
                  {isEditMode ? (
                    <Input type="text" defaultValue={formatCurrency(row.q3)} className="h-7 w-24 text-right text-sm" />
                  ) : formatCurrency(row.q3)}
                </td>
                <td className="px-3 py-2 text-right">
                  {isEditMode ? (
                    <Input type="text" defaultValue={formatCurrency(row.q4)} className="h-7 w-24 text-right text-sm" />
                  ) : formatCurrency(row.q4)}
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${totalBg}`}>{formatCurrency(row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UpliftSection = ({
    label,
    percentValue,
    values,
    headerBg = "bg-teal-600"
  }: {
    label: string;
    percentValue: number;
    values: { q1: number; q2: number; q3: number; q4: number; total: number };
    headerBg?: string;
  }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className={`${headerBg} text-white px-4 py-2 font-medium text-sm flex items-center justify-between`}>
        <span>{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-80">%</span>
          {isEditMode ? (
            <Input type="number" defaultValue={percentValue} className="h-6 w-16 text-right text-sm bg-white/20 border-white/30 text-white" />
          ) : (
            <span className="font-semibold">{percentValue}%</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-0 text-sm">
        <div className="px-3 py-2 border-r border-border text-center">
          <div className="text-xs text-muted-foreground mb-1">Q1</div>
          <div className="font-medium">{formatCurrency(values.q1)}</div>
        </div>
        <div className="px-3 py-2 border-r border-border text-center">
          <div className="text-xs text-muted-foreground mb-1">Q2</div>
          <div className="font-medium">{formatCurrency(values.q2)}</div>
        </div>
        <div className="px-3 py-2 border-r border-border text-center">
          <div className="text-xs text-muted-foreground mb-1">Q3</div>
          <div className="font-medium">{formatCurrency(values.q3)}</div>
        </div>
        <div className="px-3 py-2 border-r border-border text-center">
          <div className="text-xs text-muted-foreground mb-1">Q4</div>
          <div className="font-medium">{formatCurrency(values.q4)}</div>
        </div>
        <div className="px-3 py-2 text-center bg-teal-50">
          <div className="text-xs text-muted-foreground mb-1">Total</div>
          <div className="font-semibold">{formatCurrency(values.total)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/financialanalystpo")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-card-foreground">
                  Details of Selected PO: {data.poNumber}
                </h1>
                <p className="text-sm text-muted-foreground">Fiscal Year: FY26</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Legend */}
              <div className="flex items-center gap-2">
                <Badge className="bg-[#032D4D] text-white hover:bg-[#032D4D]/90 text-xs">
                  Main/Signed PO Fields
                </Badge>
                <Badge className="bg-teal-600 text-white hover:bg-teal-600/90 text-xs">
                  Renewal Period Fields
                </Badge>
                <Badge className="bg-gray-500 text-white hover:bg-gray-500/90 text-xs">
                  Common Financial Fields
                </Badge>
              </div>
              <Button 
                variant={isEditMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                {isEditMode ? "Editing" : "Edit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main PO Data Section */}
            <Collapsible open={expandedSections.mainPO} onOpenChange={() => toggleSection('mainPO')}>
              <Card>
                <CardHeader className="bg-[#032D4D] text-white rounded-t-lg py-3">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <CardTitle className="text-base font-medium">Main PO Data</CardTitle>
                    {expandedSections.mainPO ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground text-xs">Expense Category</label>
                        {isEditMode ? (
                          <Input defaultValue={data.expenseCategory} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.expenseCategory}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Cost Pool</label>
                        {isEditMode ? (
                          <Input defaultValue={data.costPool} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.costPool}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">SW Usage Category</label>
                        {isEditMode ? (
                          <Input defaultValue={data.swUsageCategory} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.swUsageCategory}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">SW Category</label>
                        {isEditMode ? (
                          <Input defaultValue={data.swCategory} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.swCategory}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Dept Number</label>
                        {isEditMode ? (
                          <Input defaultValue={data.deptNumber} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.deptNumber}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">PO#</label>
                        {isEditMode ? (
                          <Input defaultValue={data.poNumber} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.poNumber}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">COGS / OPEX</label>
                        {isEditMode ? (
                          <Input defaultValue={data.cogsOpex} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.cogsOpex}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Level 2 Leader</label>
                        {isEditMode ? (
                          <Input defaultValue={data.level2Leader} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.level2Leader}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Level 3 Leader</label>
                        {isEditMode ? (
                          <Input defaultValue={data.level3Leader} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.level3Leader}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Level 4 Leader</label>
                        {isEditMode ? (
                          <Input defaultValue={data.level4Leader} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.level4Leader || "-"}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Level 5 Leader</label>
                        {isEditMode ? (
                          <Input defaultValue={data.level5Leader} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.level5Leader || "-"}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Level 6 Leader</label>
                        {isEditMode ? (
                          <Input defaultValue={data.level6Leader} className="h-8 mt-1" />
                        ) : (
                          <p className="font-medium">{data.level6Leader || "-"}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Renewal PO Data Section */}
            <Collapsible open={expandedSections.renewal} onOpenChange={() => toggleSection('renewal')}>
              <Card>
                <CardHeader className="bg-teal-600 text-white rounded-t-lg py-3">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <CardTitle className="text-base font-medium">Renewal PO Data</CardTitle>
                    {expandedSections.renewal ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Dept Number</th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">PO#</th>
                            <th className="px-3 py-2 text-right font-medium text-muted-foreground">PO Amount</th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Start Date</th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">End Date</th>
                            <th className="px-3 py-2 text-center font-medium text-muted-foreground">Term (Months)</th>
                            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Renewal Qtr</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-border">
                            <td className="px-3 py-2">{data.renewalDeptNumber || "-"}</td>
                            <td className="px-3 py-2">{data.renewalPONumber || "-"}</td>
                            <td className="px-3 py-2 text-right">{data.renewalPOAmount ? formatCurrency(data.renewalPOAmount) : "-"}</td>
                            <td className="px-3 py-2">{data.renewalStartDate || "-"}</td>
                            <td className="px-3 py-2">{data.renewalEndDate || "-"}</td>
                            <td className="px-3 py-2 text-center">{data.renewalTermMonths || "-"}</td>
                            <td className="px-3 py-2">{data.renewalQuarter || "-"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                      <div>
                        <label className="text-muted-foreground text-xs">Deal Status</label>
                        <p className="font-medium">{data.dealStatus || "-"}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">Opportunity Status</label>
                        <p className="font-medium">{data.opportunityStatus || "-"}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-muted-foreground text-xs">Internal SSM Comments</label>
                        <p className="font-medium">{data.internalSSMComments || "-"}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-muted-foreground text-xs">POs Being Consolidated</label>
                        <p className="font-medium">{data.posBeingConsolidated || "-"}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground text-xs">ELT Strategy</label>
                        <p className="font-medium">{data.eltStrategy || "-"}</p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Commit Amounts */}
            <Collapsible open={expandedSections.commits} onOpenChange={() => toggleSection('commits')}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left mb-2">
                {expandedSections.commits ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-medium">Commit Amounts</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <QuarterlyGrid 
                  label="Commit Amounts"
                  values={[
                    { q1: data.q1CommitFY26, q2: data.q2CommitFY26, q3: data.q3CommitFY26, q4: data.q4CommitFY26, total: data.totalCommitFY26 },
                    { q1: data.q1CommitFY27, q2: data.q2CommitFY27, q3: data.q3CommitFY27, q4: data.q4CommitFY27, total: data.totalCommitFY27 }
                  ]}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Actuals Amounts */}
            <Collapsible open={expandedSections.actuals} onOpenChange={() => toggleSection('actuals')}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left mb-2">
                {expandedSections.actuals ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-medium">Actuals Amounts (Automated from GL)</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <QuarterlyGrid 
                  label="Actuals Amounts (Automated from GL)"
                  headerBg="bg-gray-500"
                  values={[
                    { q1: data.q1ActualsFY26, q2: data.q2ActualsFY26, q3: data.q3ActualsFY26, q4: data.q4ActualsFY26, total: data.totalActualsFY26 },
                    { q1: data.q1ActualsFY27, q2: data.q2ActualsFY27, q3: data.q3ActualsFY27, q4: data.q4ActualsFY27, total: data.totalActualsFY27 }
                  ]}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Forecast Amounts */}
            <Collapsible open={expandedSections.forecasts} onOpenChange={() => toggleSection('forecasts')}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left mb-2">
                {expandedSections.forecasts ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-medium">Forecast Amounts</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <QuarterlyGrid 
                  label="Forecast Amounts"
                  values={[
                    { q1: data.q1ForecastFY26, q2: data.q2ForecastFY26, q3: data.q3ForecastFY26, q4: data.q4ForecastFY26, total: data.totalForecastFY26 },
                    { q1: data.q1ForecastFY27, q2: data.q2ForecastFY27, q3: data.q3ForecastFY27, q4: data.q4ForecastFY27, total: data.totalForecastFY27 }
                  ]}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Potential Liabilities */}
            <Collapsible open={expandedSections.liabilities} onOpenChange={() => toggleSection('liabilities')}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left mb-2">
                {expandedSections.liabilities ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-medium">Potential Liabilities without Uplift</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <QuarterlyGrid 
                  label="Potential Liabilities without Uplift (Expected Increase Amount)"
                  headerBg="bg-amber-600"
                  values={[
                    { q1: data.potentialLiabilityQ1FY26, q2: data.potentialLiabilityQ2FY26, q3: data.potentialLiabilityQ3FY26, q4: data.potentialLiabilityQ4FY26, total: data.potentialLiabilityTotalFY26 },
                    { q1: data.potentialLiabilityQ1FY27, q2: data.potentialLiabilityQ2FY27, q3: data.potentialLiabilityQ3FY27, q4: data.potentialLiabilityQ4FY27, total: data.potentialLiabilityTotalFY27 }
                  ]}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Uplifts for Renewal Period Header */}
            <Collapsible open={expandedSections.uplifts} onOpenChange={() => toggleSection('uplifts')}>
              <div className="bg-teal-600 text-white rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3">
                  <span className="font-semibold">Uplifts for Renewal Period</span>
                  {expandedSections.uplifts ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-4 mt-4">
                {/* Price Change Forecasts */}
                <UpliftSection 
                  label="Price Change Forecasts"
                  percentValue={data.priceChangePercent}
                  values={{
                    q1: data.priceChangeQ1FY26,
                    q2: data.priceChangeQ2FY26,
                    q3: data.priceChangeQ3FY26,
                    q4: data.priceChangeQ4FY26,
                    total: data.priceChangeTotalFY26
                  }}
                />

                {/* Volume Change Forecasts */}
                <UpliftSection 
                  label="Volume Change Forecasts"
                  percentValue={data.volumeChangePercent}
                  values={{
                    q1: data.volumeChangeQ1FY26,
                    q2: data.volumeChangeQ2FY26,
                    q3: data.volumeChangeQ3FY26,
                    q4: data.volumeChangeQ4FY26,
                    total: data.volumeChangeTotalFY26
                  }}
                />

                {/* Expansion Forecasts */}
                <UpliftSection 
                  label="Expansion Forecasts"
                  percentValue={data.expansionPercent}
                  values={{
                    q1: data.expansionQ1FY26,
                    q2: data.expansionQ2FY26,
                    q3: data.expansionQ3FY26,
                    q4: data.expansionQ4FY26,
                    total: data.expansionTotalFY26
                  }}
                />

                {/* Total Uplift */}
                <div className="border-2 border-teal-600 rounded-lg p-3 bg-teal-50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-teal-800">Total Uplift</span>
                    <span className="text-2xl font-bold text-teal-600">{data.totalUpliftPercent}%</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Final Forecasts */}
            <Collapsible open={expandedSections.finalForecasts} onOpenChange={() => toggleSection('finalForecasts')}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left mb-2">
                {expandedSections.finalForecasts ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-medium">Final Forecasts</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                {/* Final Forecast with Uplift */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-[#032D4D] text-white px-4 py-2 font-medium text-sm">
                    Final Forecast with Uplift
                  </div>
                  <div className="grid grid-cols-5 gap-0 text-sm">
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q1</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithUpliftQ1FY26)}</div>
                    </div>
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q2</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithUpliftQ2FY26)}</div>
                    </div>
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q3</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithUpliftQ3FY26)}</div>
                    </div>
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q4</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithUpliftQ4FY26)}</div>
                    </div>
                    <div className="px-3 py-2 text-center bg-[#049FD9]/20">
                      <div className="text-xs text-muted-foreground mb-1">Total</div>
                      <div className="font-bold">{formatCurrency(data.finalForecastWithUpliftTotalFY26)}</div>
                    </div>
                  </div>
                </div>

                {/* Final Forecast without Uplift */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-gray-500 text-white px-4 py-2 font-medium text-sm">
                    Final Forecast without Uplift
                  </div>
                  <div className="grid grid-cols-5 gap-0 text-sm">
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q1</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithoutUpliftQ1FY26)}</div>
                    </div>
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q2</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithoutUpliftQ2FY26)}</div>
                    </div>
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q3</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithoutUpliftQ3FY26)}</div>
                    </div>
                    <div className="px-3 py-2 border-r border-border text-center">
                      <div className="text-xs text-muted-foreground mb-1">Q4</div>
                      <div className="font-medium">{formatCurrency(data.finalForecastWithoutUpliftQ4FY26)}</div>
                    </div>
                    <div className="px-3 py-2 text-center bg-gray-100">
                      <div className="text-xs text-muted-foreground mb-1">Total</div>
                      <div className="font-bold">{formatCurrency(data.finalForecastWithoutUpliftTotalFY26)}</div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-20 bg-card border-t border-border shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {isEditMode ? (
              <span className="text-amber-600 font-medium">Editing mode active - make changes and save</span>
            ) : (
              <span>Last updated: Dec 9, 2025 at 10:30 AM</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            {isEditMode && (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalystPODetail;
