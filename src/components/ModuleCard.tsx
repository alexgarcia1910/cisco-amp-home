import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  path?: string;
}

const ModuleCard = ({ title, description, icon: Icon, delay = 0, path }: ModuleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && path) {
      navigate(path);
    }
  };

  return (
    <div
      className="module-card opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Icon className="module-card-icon" strokeWidth={1.5} />
      <h3 className="module-card-title">{title}</h3>
      <p className="module-card-description">{description}</p>
    </div>
  );
};

export default ModuleCard;
