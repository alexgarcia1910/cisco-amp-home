import { FileCheck, Database, Building2, Briefcase, Server, BarChart3 } from "lucide-react";
import ModuleCard from "./ModuleCard";

const modules = [{
  title: "Software Entitlement",
  description: "Manage software licenses and entitlements across the organization",
  icon: FileCheck,
  path: "/softwareentitlement"
}, {
  title: "GL Data View Page",
  description: "Access and review general ledger data entries",
  icon: Database,
  path: "/gldataview"
}, {
  title: "Department-wise GL Reconciliation View",
  description: "Reconcile GL data organized by department",
  icon: Building2,
  path: undefined
}, {
  title: "Financial Analysts PO Portfolio",
  description: "Purchase order portfolio management for analysts",
  icon: Briefcase,
  path: "/financialanalystpo"
}, {
  title: "Enterprise Software Portfolio New",
  description: "Comprehensive view of enterprise software assets",
  icon: Server,
  path: "/enterprisesoftwareportfolionew"
}, {
  title: "Finance Leader's Dashboard",
  description: "Executive dashboard with key financial metrics",
  icon: BarChart3,
  path: undefined
}];
const ModuleGrid = () => {
  return <main className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-card-foreground mb-2">
          Welcome to AMP
        </h1>
        <p className="text-muted-foreground">
          Select a module to get started
        </p>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <ModuleCard 
            key={module.title} 
            title={module.title} 
            description={module.description} 
            icon={module.icon} 
            delay={index * 75}
            path={module.path}
          />
        ))}
      </div>
    </main>;
};
export default ModuleGrid;