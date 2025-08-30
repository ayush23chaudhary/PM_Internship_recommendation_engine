import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, MessageSquare } from "lucide-react";

export const StatusSidebar = () => {
  // TODO: Replace with actual status data from backend
  const statusItems = [
    { label: "Disposed", count: 0, color: "bg-success" },
    { label: "Clarification Asked", count: 0, color: "bg-warning" },
    { label: "Document(s) Asked", count: 0, color: "bg-info" },
    { label: "Interim Reply", count: 0, color: "bg-accent" },
    { label: "Re-Submitted", count: 0, color: "bg-warning" },
    { label: "Raised Appeal", count: 0, color: "bg-accent" },
    { label: "Final Disposed", count: 0, color: "bg-success" },
  ];

  return (
    <div className="w-80 space-y-6">
      {/* Status List */}
      <Card>
        <CardContent className="p-4 space-y-3">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <Badge 
                className={`${item.color} text-white px-2 py-1 rounded-full min-w-[24px] text-center`}
              >
                {item.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modify Consent Button */}
      <Button
        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3"
        onClick={() => {
          // TODO: Implement modify consent functionality
          console.log('Modify Consent clicked');
        }}
      >
        <Shield className="w-4 h-4 mr-2" />
        Modify Consent
      </Button>

      {/* File Grievance Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">File a Grievance</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Button
            variant="destructive"
            className="w-full font-semibold py-3"
            onClick={() => {
              // TODO: Implement grievance filing functionality
              console.log('New Grievance clicked');
            }}
          >
            New Grievance
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};