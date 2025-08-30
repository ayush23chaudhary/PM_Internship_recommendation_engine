import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

export const Notifications = () => {
  // TODO: Replace with actual notifications data from backend
  const notifications = [
    {
      id: 1,
      title: "Action Required - How to Join after Accepting Your PM Inter...",
      description: "How to Join, after you have accepted your offer letter: 1. ...",
      type: "action",
      date: "June 2, 2025 at 14:45",
      isNew: true,
    },
    // Add more notifications as needed
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "action":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "info":
        return <HelpCircle className="w-5 h-5 text-info" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-start gap-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">
                      {notification.title}
                    </h4>
                    {notification.isNew && (
                      <Badge className="bg-destructive text-destructive-foreground text-xs px-2 py-1 flex-shrink-0">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-accent text-xs underline"
                      onClick={() => {
                        // TODO: Implement read more functionality
                        console.log('Read More clicked for notification', notification.id);
                      }}
                    >
                      Read More
                    </Button>
                    <span className="text-xs text-warning">
                      {notification.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};