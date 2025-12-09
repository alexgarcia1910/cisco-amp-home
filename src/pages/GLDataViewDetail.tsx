import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import TopNav from "@/components/TopNav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const GLDataViewDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <div className="p-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/gldataview")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground mb-2">
          Financial Analysts Portfolio View for the PO: {id} in Financial Year FY26
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground mb-6">
          Forecast for this PO does not exist within Logged-In User's Portfolio
        </p>

        {/* GL Transaction Details Collapsible */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="bg-card border border-border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium text-foreground">GL Transaction Details</span>
              </div>
              <span className="text-sm text-muted-foreground">(Expand To Explore)</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Transaction details will be displayed here.</p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
};

export default GLDataViewDetail;
