import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRoleFromToken } from "@/lib/authenticate";
import clsx from "clsx";
import {
  ShieldX,
  Home,
  BookOpen,
  AlertTriangle,
  User,
  Scale,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const AccessDeniedPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const userData = await fetchRoleFromToken(token);
  const userRole = userData?.role;
  const getRoleTheme = (role: string) => {
    switch (role) {
      case "student":
        return {
          title: "Student Account Limitation",
          portalLink: "/student",
          portalText: "Go to Student Portal",
          button: "bg-emerald-600 hover:bg-emerald-700 text-white",
        };
      case "consumer":
        return {
          title: "Consumer Account Limitation",
          portalLink: "/consumer",
          portalText: "Go to Consumer Portal",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
        };
      case "lawyer":
        return {
          title: "Lawyer Account Limitation",
          portalLink: "/lawyer",
          portalText: "Go to Lawyer Portal",
          button: "bg-amber-500 hover:bg-amber-600 text-white",
        };
      default:
        return {
          title: "Access Limitation",
          portalLink: "/",
          portalText: "Go Home",
          button: "bg-slate-600 hover:bg-slate-700 text-white",
        };
    }
  };

  const role = userRole || "default";
  const theme = getRoleTheme(role);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-all bg-white/30">
      <Card className="w-full max-w-md border-0 shadow-none rounded-xl bg-transparent">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div
              className={clsx(
                "rounded-full p-4 border shadow-inner",
                "bg-red-100 border-red-200"
              )}
            >
              <ShieldX className="h-12 w-12 text-red-600" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-red-700">
              Access Restricted
            </h1>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className={clsx("w-full", theme.button)}>
              <Link href={theme.portalLink}>
                <BookOpen className="h-4 w-4 mr-2" />
                {theme.portalText}
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact support for role
              verification and access request.
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-gray-400 mt-1">
                Current role: {userRole}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDeniedPage;
