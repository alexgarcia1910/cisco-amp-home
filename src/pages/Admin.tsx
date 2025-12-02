import TopNav from "@/components/TopNav";
import AdminSidebar from "@/components/AdminSidebar";
import AdminWorkspace from "@/components/AdminWorkspace";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <AdminSidebar />
        <AdminWorkspace />
      </div>
    </div>
  );
};

export default Admin;
