import { User } from "lucide-react";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <svg
              className="h-8 w-auto text-cisco-blue"
              viewBox="0 0 100 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cisco Bridge Logo */}
              <rect x="10" y="20" width="6" height="15" rx="1" />
              <rect x="22" y="12" width="6" height="23" rx="1" />
              <rect x="34" y="8" width="6" height="27" rx="1" />
              <rect x="46" y="5" width="6" height="30" rx="1" />
              <rect x="58" y="8" width="6" height="27" rx="1" />
              <rect x="70" y="12" width="6" height="23" rx="1" />
              <rect x="82" y="20" width="6" height="15" rx="1" />
            </svg>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-card-foreground leading-tight">
                Cisco AMP
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Asset Management Platform
              </span>
            </div>
          </div>

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
