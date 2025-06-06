"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Bell,
  Shield,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Key,
  Smartphone,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isAnimating, setIsAnimating] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    company: "Doe Enterprises",
    bio: "Business professional with expertise in corporate management.",
  });

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email",
      label: "Email Notifications",
      description: "Receive notifications via email",
      enabled: true,
    },
    {
      id: "case-updates",
      label: "Case Updates",
      description: "Get notified about case status changes",
      enabled: true,
    },
    {
      id: "document-alerts",
      label: "Document Alerts",
      description: "Receive alerts for new document uploads",
      enabled: true,
    },
    {
      id: "deadlines",
      label: "Deadline Reminders",
      description: "Receive reminders for important deadlines",
      enabled: true,
    },
  ]);

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
  });

  const handleSave = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const settingsSections: SettingsSection[] = [
    {
      id: "profile",
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      description: "Manage Account",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      description: "Configure Notifications",
    },
    {
      id: "security",
      title: "Security",
      icon: <Shield className="h-5 w-5" />,
      description: "Security Settings",
    },
  ];

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === activeSection) return;
    setActiveSection(sectionId);
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };
  return (
    <div className="space-y-6 animate-fadeIn p-20">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-[#3b82f6] rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-white" />
          </div>
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700"
          >
            <Camera className="stroke-[2.5px] h-4 w-4 text-[#3b82f6]" />
          </Button>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {profileData.firstName} {profileData.lastName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {profileData.company}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  firstName: e.target.value,
                })
              }
              className="bg-white/20 border-white/20 focus-visible:ring-0 focus-visible:border-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  lastName: e.target.value,
                })
              }
              className="bg-white/20 border-white/20 focus-visible:ring-0 focus-visible:border-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    email: e.target.value,
                  })
                }
                className="pl-10 bg-white/20 border-white/20 focus-visible:ring-0 focus-visible:border-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="phone"
              className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
            >
              Phone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone: e.target.value,
                  })
                }
                className="pl-10 bg-white/20 border-white/20 focus-visible:ring-0 focus-visible:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="company"
              className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
            >
              Company
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="company"
                value={profileData.company}
                onChange={(e) =>
                  setProfileData({ ...profileData, company: e.target.value })
                }
                className="pl-10 bg-white/20 border-white/20 focus-visible:ring-0 focus-visible:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="address"
              className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
            >
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: e.target.value,
                  })
                }
                className="pl-10 bg-white/20 border-white/20 focus-visible:ring-0 focus-visible:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Label
          htmlFor="bio"
          className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
        >
          Bio
        </Label>
        <Textarea
          id="bio"
          value={profileData.bio}
          onChange={(e) =>
            setProfileData({ ...profileData, bio: e.target.value })
          }
          className="bg-white/20 border-white/20 focus-visible:border-indigo-500 focus-visible:ring-0 min-h-[100px]"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className={cn(
            "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2",
            isAnimating && "animate-pulse"
          )}
        >
          <Save className="h-4 w-4" />
          {isAnimating ? "Saving..." : "Update Profile"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
