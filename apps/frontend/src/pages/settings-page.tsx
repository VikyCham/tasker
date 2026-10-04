import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  User,
  Palette,
  ExternalLink,
} from "lucide-react";

export function SettingsPage() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { theme } = useTheme();

  const themeName =
    theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card className="rounded-xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-base font-semibold tracking-tight">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.imageUrl}
                alt={user?.fullName || "User"}
                className="h-16 w-16 shrink-0 rounded-full border-4 border-background ring-1 ring-border"
              />
              <div>
                <h3 className="font-semibold">{user?.fullName}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {(user?.publicMetadata?.role as string) || "User"}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Account Details</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  Member since:{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  Last updated:{" "}
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => openUserProfile()}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Account in Clerk
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="rounded-xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-base font-semibold tracking-tight">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Current theme: {themeName}
                </p>
              </div>
              <ThemeToggle />
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Theme Information</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Light theme for daytime use</p>
                <p>• Dark theme for low-light environments</p>
                <p>• System theme follows your OS preference</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Information */}
      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>About Tasker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium">Version</p>
              <p className="text-sm text-muted-foreground">1.0.0</p>
            </div>
            <div>
              <p className="font-medium">Last Updated</p>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Built With</p>
              <p className="text-sm text-muted-foreground">
                React, TypeScript, Tailwind CSS, Go, Echo, PostgreSQL, Redis
              </p>
            </div>
            <div>
              <p className="font-medium">Support</p>
              <p className="text-sm text-muted-foreground">
                Contact us for help and feedback
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
