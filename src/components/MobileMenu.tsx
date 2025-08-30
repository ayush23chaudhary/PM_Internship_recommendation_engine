import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  BookOpen, 
  Building2, 
  FileText, 
  PlayCircle, 
  Phone, 
  Mail 
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: HelpCircle, label: "FAQs", href: "#" },
    { icon: BookOpen, label: "Guidelines", href: "#" },
    { icon: Building2, label: "Partner Companies", href: "#" },
    { icon: FileText, label: "Manuals", href: "#" },
    { icon: PlayCircle, label: "Tutorials/Guidance Videos", href: "#" },
    { icon: Phone, label: "Call Support", href: "#" },
    { icon: Mail, label: "Email Support", href: "#" },
  ];

  return (
    <div className="md:hidden bg-card border-b border-border">
      <div className="px-4 py-2 space-y-1">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-left py-3 hover:bg-primary/5"
            onClick={() => {
              // TODO: Implement navigation functionality
              console.log(`Navigate to ${item.label}`);
            }}
          >
            <item.icon className="w-5 h-5 mr-3 text-accent" />
            <span className="text-foreground">{item.label}</span>
          </Button>
        ))}
        
        <div className="pt-4 pb-2 space-y-2">
          <Button
            variant="outline"
            className="w-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          >
            Apply Insurance
          </Button>
          
          <Button
            variant="default"
            className="w-full bg-gradient-primary hover:bg-primary-hover"
          >
            My Bharat Portal
          </Button>
        </div>
      </div>
    </div>
  );
};