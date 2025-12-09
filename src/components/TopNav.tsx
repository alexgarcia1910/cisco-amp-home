import { User } from "lucide-react";
import { Link } from "react-router-dom";
import ciscoLogo from "@/assets/cisco-logo.png";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src={ciscoLogo}
              alt="Cisco"
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-card-foreground leading-tight">
                AMP
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Asset Management Platform
              </span>
            </div>
          </Link>

          {/* User Profile */}
          <div className="flex items-center">
            <button
              className="flex items-center gap-2 rounded-full p-2 hover:bg-secondary transition-colors"
              aria-label="User profile"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
