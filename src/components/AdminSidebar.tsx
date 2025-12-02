import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Shield,
  Wrench,
  FileBox,
  BarChart3,
  Users,
  Settings,
  Lock,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Admin View", icon: Shield, path: "/admin/view" },
  { title: "Tool Kits", icon: Wrench, path: "/admin/toolkits" },
  { title: "Artifacts", icon: FileBox, path: "/admin/artifacts" },
  { title: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { title: "Users", icon: Users, path: "/admin/users" },
  { title: "Tenant Settings", icon: Settings, path: "/admin/tenant" },
  { title: "Security", icon: Lock, path: "/admin/security" },
];

const AdminSidebar = () => {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-[240px] flex-shrink-0 border-r border-border bg-muted/50 overflow-y-auto">
      <nav className="flex flex-col py-4">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={item.title}
            to={item.path}
            end={item.path === "/admin"}
            className="group relative flex items-center gap-3 px-6 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
            activeClassName="bg-secondary/70 text-foreground font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary"
          >
            <item.icon className="h-5 w-5" strokeWidth={1.5} />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
