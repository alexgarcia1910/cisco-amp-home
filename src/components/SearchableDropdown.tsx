import { useState, useMemo } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchableDropdownProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function SearchableDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== option));
  };

  const displayCount = value.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={displayCount > 0 ? "default" : "outline"}
          className="w-full justify-between gap-2 h-auto min-h-[36px] py-1.5"
          role="combobox"
          aria-expanded={open}
        >
          <span className="flex items-center gap-1.5 flex-wrap">
            {label}
            {displayCount > 0 && (
              <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded">
                {displayCount}
              </span>
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 bg-popover" align="start">
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
        {value.length > 0 && (
          <div className="p-2 border-b border-border flex flex-wrap gap-1">
            {value.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded"
              >
                {v.length > 12 ? `${v.substring(0, 12)}...` : v}
                <button
                  onClick={(e) => removeOption(v, e)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="max-h-[240px] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center gap-2",
                  value.includes(option) && "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 border rounded flex items-center justify-center shrink-0",
                    value.includes(option)
                      ? "bg-primary border-primary"
                      : "border-border"
                  )}
                >
                  {value.includes(option) && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
                {option}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
