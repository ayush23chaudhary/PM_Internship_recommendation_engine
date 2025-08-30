import { useState } from "react";
import { Header } from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import { UserProfile } from "@/components/UserProfile";
import { StatusSidebar } from "@/components/StatusSidebar";
import { InternshipForm } from "@/components/InternshipForm";
import { Notifications } from "@/components/Notifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("internship-opportunities");

  const tabs = [
    { id: "current-status", label: "My Current Status", disabled: true },
    { id: "internship-opportunities", label: "Internship Opportunities", disabled: false },
    { id: "my-internship", label: "My Internship", disabled: true },
    { id: "news-events", label: "News & Events", disabled: true },
    { id: "refer-friend", label: "Refer A Friend", disabled: true, badge: "NEW" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-80 min-h-[calc(100vh-80px)] bg-card border-r border-border p-4">
          <div className="space-y-6">
            <UserProfile />
            <StatusSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Navigation Tabs */}
          <Card className="mb-6">
            <CardContent className="p-2">
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    disabled={tab.disabled}
                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                    className={`
                      relative text-sm px-4 py-2 rounded-md transition-colors
                      ${activeTab === tab.id 
                        ? "bg-primary text-primary-foreground" 
                        : tab.disabled 
                          ? "text-muted-foreground cursor-not-allowed" 
                          : "text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    {tab.label}
                    {tab.badge && (
                      <span className="ml-2 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Area */}
          <div className="flex gap-6">
            <div className="flex-1">
              {activeTab === "internship-opportunities" && <InternshipForm />}
              
              {/* Placeholder for other tabs */}
              {activeTab !== "internship-opportunities" && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-muted-foreground">
                      <h3 className="text-lg font-semibold mb-2">Feature Coming Soon</h3>
                      <p>This section will be available in a future update.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Desktop Notifications Panel */}
            <div className="hidden xl:block">
              <Notifications />
            </div>
          </div>

          {/* Mobile User Profile and Status (bottom sheet style) */}
          <div className="md:hidden mt-8 space-y-4">
            <UserProfile />
            <Card>
              <CardContent className="p-4">
                <StatusSidebar />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© PM Internship Scheme, MCA. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Technical collaboration with</span>
            <span className="font-semibold text-accent">BISAG-N</span>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
              <span className="text-success font-medium">Do's</span>
              <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">✗</span>
              </div>
              <span className="text-destructive font-medium">Don'ts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
