import { useState, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";
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
  value: string | null;
  onChange: (value: string) => void;
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

  const displayValue = value
    ? value.length > 15
      ? `${value.substring(0, 15)}...`
      : value
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={value ? "default" : "outline"}
          className="gap-2"
          role="combobox"
          aria-expanded={open}
        >
          {label} {displayValue && `(${displayValue})`}
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
        <div className="max-h-[280px] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm hover:bg-muted/50 transition-colors",
                  value === option && "bg-muted font-medium"
                )}
              >
                {option}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
