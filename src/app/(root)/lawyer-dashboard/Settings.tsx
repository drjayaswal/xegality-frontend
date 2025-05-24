"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Eye,
} from "lucide-react";
import SiriWave from "@/components/ui/ai";

// Lightweight alternative to SiriWave
const SimplePulse = ({ active }: { active: boolean }) => (
  <div className="relative h-full w-full overflow-hidden">
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex gap-2 justify-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 w-16 rounded-full bg-white/70",
              active && "animate-pulse"
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

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

export default function SettingsLite() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@lawfirm.com",
    phone: "+1 (555) 123-4567",
    address: "123 Legal Street, Law City, LC 12345",
    firm: "Doe & Associates Law Firm",
    bio: "Experienced attorney specializing in corporate law with over 10 years of practice.",
  });

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email",
      label: "Email Notifications",
      description: "Receive notifications via email",
      enabled: true,
    },
    {
      id: "push",
      label: "Push Notifications",
      description: "Receive push notifications on your device",
      enabled: true,
    },
    {
      id: "sms",
      label: "SMS Notifications",
      description: "Receive important updates via SMS",
      enabled: false,
    },
    {
      id: "case-updates",
      label: "Case Updates",
      description: "Get notified about case status changes",
      enabled: true,
    },
    {
      id: "deadlines",
      label: "Deadline Reminders",
      description: "Receive reminders for important deadlines",
      enabled: true,
    },
    {
      id: "client-messages",
      label: "Client Messages",
      description: "Get notified when clients send messages",
      enabled: true,
    },
  ]);

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    soundEnabled: true,
    autoSave: true,
    twoFactorAuth: false,
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return !prev;
    });
  };

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
      description: "Configure Notification",
    },
    {
      id: "security",
      title: "Security",
      icon: <Shield className="h-5 w-5" />,
      description: "Security and Privacy",
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: <Palette className="h-5 w-5" />,
      description: "Customize Xegality",
    },
    {
      id: "preferences",
      title: "Preferences",
      icon: <Settings className="h-5 w-5" />,
      description: "General Preferences",
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

  // Optimized section renderers without heavy animations
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {profileData.firm}
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
                    htmlFor="firm"
                    className="text-gray-700 dark:text-gray-300 mb-1 ml-1"
                  >
                    Law Firm
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firm"
                      value={profileData.firm}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firm: e.target.value })
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
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid gap-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {notification.label}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {notification.description}
                    </p>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={() => toggleNotification(notification.id)}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid gap-4">
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Change Password
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Update your account password
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, twoFactorAuth: checked })
                    }
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              </div>
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Privacy Settings
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Manage your privacy preferences
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid gap-4">
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {preferences.darkMode ? (
                      <Moon className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Sun className="h-5 w-5 text-indigo-600" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Dark Mode
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Toggle dark theme
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative w-18 h-8 flex items-center bg-gradient-to-r border-4 border-white dark:border-black from-rose-500 to-indigo-600 rounded-full px-1 cursor-pointer shadow-none"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    {/* Toggle Knob */}
                    <div
                      className={cn(
                        "absolute w-8 h-[31px] bg-white dark:bg-black rounded-full transform transition-transform duration-300 shadow-none",
                        {
                          "-translate-x-1": !isDarkMode,
                          "translate-x-7": isDarkMode,
                        }
                      )}
                    />

                    {/* Icons */}
                    <Sun
                      className="absolute left-1 w-5 h-5 text-yellow-400 dark:text-gray-400 transition-opacity duration-300"
                      style={{ opacity: !isDarkMode ? 1 : 0 }}
                    />
                    <Moon
                      className="absolute right-1 w-5 h-5 text-blue-400 dark:text-gray-400 transition-opacity duration-300"
                      style={{ opacity: isDarkMode ? 1 : 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Display Density
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Adjust interface density
                      </p>
                    </div>
                  </div>
                  <select className="px-3 py-1 rounded-lg border border-white/10 text-sm">
                    <option>Comfortable</option>
                    <option>Compact</option>
                    <option>Spacious</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid gap-4">
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Language
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose your preferred language
                      </p>
                    </div>
                  </div>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        language: e.target.value,
                      })
                    }
                    className="px-3 py-1 rounded-lg border border-white/10 text-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Sound Effects
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Enable notification sounds
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.soundEnabled}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, soundEnabled: checked })
                    }
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              </div>
              <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Save className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Auto Save
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Automatically save your work
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, autoSave: checked })
                    }
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <div className="w-full h-full bg-white dark:bg-black rounded-lg overflow-hidden flex flex-col relative">
      {/* Header with simplified animation */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-[#4f46e5]/40 via-[#ec4899]/40 to-[#3b82f6]/40">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-fit flex items-center justify-center">
            <SiriWave isWaveMode={isAnimating} />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white/80">Settings</h1>
        </div>
      </div>

      <div className="flex-1 flex bg-gradient-to-r from-[#4f46e5]/40 via-[#ec4899]/40 to-[#3b82f6]/40">
        {/* Sidebar - Simplified */}
        <div className="w-80 p-6 border-r border-white/20">
          <div className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-all duration-200 group",
                  activeSection === section.id
                    ? "bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg"
                    : "hover:bg-white/20 backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      activeSection === section.id
                        ? "bg-indigo-600 text-white"
                        : "bg-white/20 text-gray-700 dark:text-gray-300 group-hover:bg-indigo-600 group-hover:text-white"
                    )}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Simplified */}
        <div className="flex-1 p-6">
          <ScrollArea className="h-full">
            <div className="max-w-4xl">
              {/* Content with optimized transitions */}
              <div
                className="transition-opacity duration-200"
                key={activeSection}
              >
                {renderSection()}
              </div>

              {/* Save Button - Simplified */}
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={isAnimating}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isAnimating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
