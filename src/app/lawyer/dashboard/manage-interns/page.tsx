"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Star,
  Users,
  Plus,
  X,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  Calendar,
  Clock,
  User,
  MessageSquare,
  Award,
  Target,
  BarChart3,
  Mail,
  Eye,
  Phone,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface HiredIntern {
  id: number;
  name: string;
  email: string;
  phone: string;
  university: string;
  year: string;
  specialization: string;
  startDate: string;
  status: "Active" | "On Leave" | "Completed";
  rating: number;
  avatar: string;
  tasksCompleted: number;
  hoursWorked: number;
  performance:
    | "Outstanding"
    | "Excellent"
    | "Very Good"
    | "Good"
    | "Needs Improvement";
  recentActivity: string;
  supervisor: string;
  department: string;
  contractType: "Full-time" | "Part-time" | "Project-based";
  endDate?: string;
  salary?: string;
}

// Mock data for hired interns
const mockHiredInterns: HiredIntern[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    university: "Harvard Law School",
    year: "2nd Year",
    specialization: "Corporate Law",
    startDate: "2024-01-15",
    status: "Active",
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 23,
    hoursWorked: 156,
    performance: "Excellent",
    recentActivity: "Completed contract review for merger case",
    supervisor: "John Smith",
    department: "Corporate Law",
    contractType: "Full-time",
    salary: "$25/hour",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    university: "Stanford Law School",
    year: "3rd Year",
    specialization: "Intellectual Property",
    startDate: "2024-02-01",
    status: "Active",
    rating: 4.9,
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 31,
    hoursWorked: 198,
    performance: "Outstanding",
    recentActivity: "Filed patent application for tech startup",
    supervisor: "Emily Davis",
    department: "IP Law",
    contractType: "Full-time",
    salary: "$30/hour",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    university: "Yale Law School",
    year: "1st Year",
    specialization: "Criminal Law",
    startDate: "2024-03-10",
    status: "On Leave",
    rating: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 18,
    hoursWorked: 124,
    performance: "Good",
    recentActivity: "Research on case precedents",
    supervisor: "Robert Wilson",
    department: "Criminal Law",
    contractType: "Part-time",
    salary: "$20/hour",
    endDate: "2024-04-15",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@email.com",
    phone: "+1 (555) 321-0987",
    university: "Columbia Law School",
    year: "2nd Year",
    specialization: "Environmental Law",
    startDate: "2024-01-20",
    status: "Active",
    rating: 4.7,
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 27,
    hoursWorked: 178,
    performance: "Very Good",
    recentActivity: "Environmental impact analysis for client",
    supervisor: "Lisa Anderson",
    department: "Environmental Law",
    contractType: "Full-time",
    salary: "$22/hour",
  },
  {
    id: 5,
    name: "Jessica Park",
    email: "jessica.park@email.com",
    phone: "+1 (555) 654-3210",
    university: "NYU Law School",
    year: "3rd Year",
    specialization: "Immigration Law",
    startDate: "2023-09-01",
    status: "Completed",
    rating: 4.5,
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 45,
    hoursWorked: 320,
    performance: "Very Good",
    recentActivity: "Successfully completed internship program",
    supervisor: "Maria Garcia",
    department: "Immigration Law",
    contractType: "Full-time",
    endDate: "2024-01-15",
    salary: "$24/hour",
  },
];

export default function ManageInternsPage() {
  const [showActionSuccess, setShowActionSuccess] = useState(false);
  const [hiredInterns] = useState<HiredIntern[]>(mockHiredInterns);
  const [selectedIntern, setSelectedIntern] = useState<HiredIntern | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300";
      case "On Leave":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300";
      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Outstanding":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300";
      case "Excellent":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300";
      case "Very Good":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300";
      case "Good":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300";
      case "Needs Improvement":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Corporate Law":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/10 dark:text-amber-400";
      case "Criminal Law":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400";
      case "IP Law":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/10 dark:text-purple-400";
      case "Environmental Law":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400";
      case "Immigration Law":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/10 dark:text-slate-400";
    }
  };

  const handleAction = (action: string, internId: number) => {
    if (action === "view") {
      const intern = hiredInterns.find((i) => i.id === internId);
      if (intern) {
        setSelectedIntern(intern);
        setIsModalOpen(true);
      }
    } else {
      setShowActionSuccess(true);
      setTimeout(() => setShowActionSuccess(false), 3000);
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    const totalInterns = hiredInterns.length;
    const activeInterns = hiredInterns.filter(
      (intern) => intern.status === "Active"
    ).length;
    const totalTasks = hiredInterns.reduce(
      (sum, intern) => sum + intern.tasksCompleted,
      0
    );
    const totalHours = hiredInterns.reduce(
      (sum, intern) => sum + intern.hoursWorked,
      0
    );

    return { totalInterns, activeInterns, totalTasks, totalHours };
  }, [hiredInterns]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-slate-200 text-slate-200 dark:fill-slate-600 dark:text-slate-600"
        )}
      />
    ));
  };

  return (
    <div
      className={`flex flex-col h-full relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden max-w-7xl mx-auto ${
        isModalOpen && "blur-md"
      }`}
    >
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f59e0b' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative z-10">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-950 to-amber-900">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-slate-900/20 to-amber-600/20"></div>
            <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        Manage Interns
                      </h1>
                      <p className="text-amber-100 text-sm font-medium">
                        Manage your legal interns and track progress
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      className="hidden sm:flex text-white bg-transparent border-white border hover:bg-white hover:text-amber-950 transition-colors duration-200 text-sm"
                    >
                      <Link href="/lawyer/dashboard/add-internships">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Internships
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-white text-amber-950 hover:bg-white/90 shadow-lg font-medium text-sm transition-colors duration-200"
                    >
                      <Link href="/lawyer/dashboard/hire-interns">
                        <Users className="h-4 w-4 mr-2" />
                        Hire Interns
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform translate-y-3 hover:-translate-y-3">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Total Interns
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stats.totalInterns}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="h-3 w-3" />
                          <span>+12%</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform translate-y-3 hover:-translate-y-3">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Active
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stats.activeInterns}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <Target className="h-3 w-3" />
                          <span>85%</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform translate-y-3 hover:-translate-y-3">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Tasks
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stats.totalTasks}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <Award className="h-3 w-3" />
                          <span>94%</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform translate-y-3 hover:-translate-y-3">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Hours
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stats.totalHours}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <BarChart3 className="h-3 w-3" />
                          <span>+8%</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-600 rounded-xl flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    All Interns ({hiredInterns.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {hiredInterns.map((intern, index) => (
                    <motion.div
                      key={intern.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow p-4 flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-evenly gap-3">
                            <Avatar className="h-10 w-10 ring-2 ring-white/50 shadow-sm">
                              <AvatarImage
                                src={intern.avatar || "/placeholder.svg"}
                                alt={intern.name}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-amber-700 to-orange-600 text-white text-sm font-semibold">
                                {intern.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <h3 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {intern.name}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {intern.year}
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs font-medium",
                                  getDepartmentColor(intern.department)
                                )}
                              >
                                {intern.department}
                              </Badge>
                              <Badge className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                {intern.contractType}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction("message", intern.id)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction("email", intern.id)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          className="bg-amber-600/30 hover:bg-amber-700 hover:text-white text-amber-800 px-3 py-1 text-xs rounded-lg transition-all duration-200 hover:scale-105"
                          onClick={() => handleAction("view", intern.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md w-full max-h-[85vh] overflow-y-auto p-4 rounded-3xl shadow-lg animate-fade-in-up space-y-4 border-transparent">
            {selectedIntern && (
              <>
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-1 ring-amber-400 shadow-sm">
                    <AvatarImage
                      src={selectedIntern.avatar || "/placeholder.svg"}
                      alt={selectedIntern.name}
                    />
                    <AvatarFallback className="bg-amber-700 text-white text-sm font-semibold">
                      {selectedIntern.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-xl">{selectedIntern.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedIntern.specialization} • {selectedIntern.year}
                    </p>
                  </div>
                </div>

                {/* Work Info */}
                <div className="text-sm grid gap-2 mx-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      Supervisor
                    </span>
                    <span>{selectedIntern.supervisor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      Contract
                    </span>
                    <span>{selectedIntern.contractType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Start
                    </span>
                    <span>
                      {new Date(selectedIntern.startDate).toLocaleDateString(
                        "en-US",
                        {
                          dateStyle: "medium",
                        }
                      )}
                    </span>
                  </div>
                  {selectedIntern.endDate && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        End
                      </span>
                      <span>
                        {new Date(selectedIntern.endDate).toLocaleDateString(
                          "en-US",
                          {
                            dateStyle: "medium",
                          }
                        )}
                      </span>
                    </div>
                  )}
                  {selectedIntern.salary && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        Salary
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {selectedIntern.salary}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <Separator />

                {/* Contact Info */}
                <div className="text-sm grid gap-2 mx-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      Email
                    </span>
                    <span className="flex items-center gap-1">
                      {selectedIntern.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Phone
                    </span>
                    <span className="flex items-center gap-1">
                      {selectedIntern.phone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      University
                    </span>
                    <span className="flex items-center gap-1">
                      {selectedIntern.university}
                    </span>
                  </div>
                </div>
                <Separator />

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction("message", selectedIntern.id)}
                    className="h-8 px-3"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" /> Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction("email", selectedIntern.id)}
                    className="h-8 px-3"
                  >
                    <Mail className="h-4 w-4 mr-1" /> Email
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 px-4 bg-amber-700 hover:bg-amber-600 text-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
