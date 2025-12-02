import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const ModuleCard = ({ title, description, icon: Icon, delay = 0 }: ModuleCardProps) => {
  return (
    <div
      className="module-card opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // Handle navigation
        }
      }}
    >
      <Icon className="module-card-icon" strokeWidth={1.5} />
      <h3 className="module-card-title">{title}</h3>
      <p className="module-card-description">{description}</p>
    </div>
  );
};

export default ModuleCard;
