import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Eye, 
  Lock, 
  LogOut, 
  MapPin,
  Edit,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface UserProfileProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const UserProfile = ({ isMobile = false, isOpen = true, onToggle }: UserProfileProps) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  // TODO: Replace with actual user data from backend
  const userData = {
    id: "874046",
    name: "User",
    age: "21 Yrs",
    location: "Agra, UTTAR PRADESH",
    profileCompletion: 100,
    avatar: "/placeholder-avatar.jpg"
  };

  const handleToggle = () => {
    if (isMobile && onToggle) {
      onToggle();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  if (isMobile && !isOpen) return null;

  return (
    <Card className={`${isMobile ? 'absolute top-16 right-4 w-80 z-50 shadow-xl' : 'w-full'} bg-card border-border`}>
      <CardContent className="p-4">
        {/* Candidate ID Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2">
            Candidate ID {userData.id}
            <Edit className="w-4 h-4 cursor-pointer" />
          </div>
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              className="p-1"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {(isExpanded || isMobile) && (
          <>
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.age}</p>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Profile Completed:</span>
                <span className="text-sm font-semibold text-success">{userData.profileCompletion}%</span>
              </div>
              <Progress value={userData.profileCompletion} className="h-2" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              {userData.location}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-accent hover:text-accent-foreground hover:bg-accent/10"
                onClick={() => {
                  // TODO: Implement view profile functionality
                  console.log('View Profile clicked');
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Profile / CV
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-accent hover:text-accent-foreground hover:bg-accent/10"
                onClick={() => {
                  // TODO: Implement change password functionality
                  console.log('Change Password clicked');
                }}
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  // TODO: Implement sign out functionality
                  console.log('Sign Out clicked');
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};