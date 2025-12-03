import { useLocation } from "react-router-dom";
import { Users, Shield, Wrench, Building2 } from "lucide-react";
import ModuleGrid from "@/components/ModuleGrid";

const adminCards = [
  {
    title: "User Management",
    description: "Manage user accounts, roles, and permissions",
    icon: Users,
  },
  {
    title: "Security Settings",
    description: "Configure authentication and access controls",
    icon: Shield,
  },
  {
    title: "Data Tool Kits",
    description: "Access data management and reporting tools",
    icon: Wrench,
  },
  {
    title: "Tenant Controls",
    description: "Manage tenant configurations and settings",
    icon: Building2,
  },
];

const AdminWorkspace = () => {
  const location = useLocation();
  const isHome = location.pathname === "/admin";

  if (isHome) {
    return (
      <div className="flex-1 p-8">
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">
            Admin / <span className="text-foreground">Home</span>
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          Asset Management Platform
        </h1>
        <ModuleGrid />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Breadcrumb */}
      <div className="mb-2">
        <span className="text-sm text-muted-foreground">
          Admin / <span className="text-foreground">Dashboard</span>
        </span>
      </div>

      {/* Page Header */}
      <h1 className="text-2xl font-semibold text-foreground mb-8">
        Admin Console
      </h1>

      {/* Admin Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminCards.map((card, index) => (
          <div
            key={card.title}
            className="module-card opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            role="button"
            tabIndex={0}
          >
            <card.icon className="module-card-icon" strokeWidth={1.5} />
            <h3 className="module-card-title">{card.title}</h3>
            <p className="module-card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkspace;
