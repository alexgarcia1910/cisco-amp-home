import ModuleGrid from "@/components/ModuleGrid";

const AdminWorkspace = () => {
  // Always show Home view with module cards on /admin
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
};

export default AdminWorkspace;
