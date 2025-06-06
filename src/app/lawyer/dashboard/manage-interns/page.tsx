"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Plus,
  Mail,
  Phone,
  Calendar,
  Star,
  Clock,
  User,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock data for hired interns
const hiredInterns = [
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
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional woman headshot",
    tasksCompleted: 23,
    hoursWorked: 156,
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
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional man headshot asian",
    tasksCompleted: 31,
    hoursWorked: 198,
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
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional woman headshot latina",
    tasksCompleted: 18,
    hoursWorked: 124,
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
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional man headshot",
    tasksCompleted: 27,
    hoursWorked: 178,
  },
];

export default function HireAnInternPage() {
  const [selectedIntern, setSelectedIntern] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full rounded-lg shadow-lg border-[1.5px]">
      <div className="bg-amber-700/5 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-black" />
                Intern Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your legal interns and hire new talent for your practice
              </p>
            </div>
            <Link href="/lawyer/dashboard/add-internships">
              <Button className="bg-transparent text-black hover:bg-white shadow-none hover:shadow-xl hover:scale-102">
                <Plus className="h-4 w-4 mr-2" />
                Add Internships
              </Button>
            </Link>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            {/* Total Interns */}
            <Card className="relative overflow-hidden border-0 rounded-xl group shadow-none hover:shadow-md transform hover:-translate-y-2 duration-150 bg-transparent">
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent to-blue-200 group-hover:from-blue-400 group-hover:to-blue-400 transition-colors duration-300 ease-in-out backdrop-blur-sm" />
              <CardContent className="relative z-10 p-6 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors duration-300">
                      Total Interns
                    </p>
                    <p className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                      {hiredInterns.length}
                    </p>
                  </div>
                  <User className="h-8 w-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>

            {/* Active Interns */}
            <Card className="relative overflow-hidden border-0 rounded-xl group shadow-none hover:shadow-md transform hover:-translate-y-2 duration-150 bg-transparent">
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent to-green-200 group-hover:from-green-500 group-hover:to-green-500 transition-colors duration-300 ease-in-out backdrop-blur-sm" />
              <CardContent className="relative z-10 p-6 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors duration-300">
                      Active Interns
                    </p>
                    <p className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                      {
                        hiredInterns.filter(
                          (intern) => intern.status === "Active"
                        ).length
                      }
                    </p>
                  </div>
                  <Briefcase className="h-8 w-8 text-green-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>

            {/* Total Tasks */}
            <Card className="relative overflow-hidden border-0 rounded-xl group shadow-none hover:shadow-md transform hover:-translate-y-2 duration-150 bg-transparent">
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent to-purple-200 group-hover:from-purple-500 group-hover:to-purple-400 transition-colors duration-300 ease-in-out backdrop-blur-sm" />
              <CardContent className="relative z-10 p-6 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors duration-300">
                      Total Tasks
                    </p>
                    <p className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                      {hiredInterns.reduce(
                        (sum, intern) => sum + intern.tasksCompleted,
                        0
                      )}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>

            {/* Total Hours */}
            <Card className="relative overflow-hidden border-0 rounded-xl group shadow-none hover:shadow-md transform hover:-translate-y-2 duration-150 bg-transparent">
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent to-orange-200 group-hover:from-orange-500 group-hover:to-orange-400 transition-colors duration-300 ease-in-out backdrop-blur-sm" />
              <CardContent className="relative z-10 p-6 transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors duration-300">
                      Total Hours
                    </p>
                    <p className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                      {hiredInterns.reduce(
                        (sum, intern) => sum + intern.hoursWorked,
                        0
                      )}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* className="hover:bg-blue-600/10 hover:text-blue-600" */}
          {/* Interns List */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex justify-between items-center">
                Current Interns
                <Link href="/lawyer/dashboard/hire-interns">
                  <Button className="bg-transparent text-black hover:bg-white shadow-none hover:shadow-xl hover:scale-102">
                    <Plus className="h-4 w-4 mr-2" />
                    Hire Interns
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hiredInterns.map((intern, index) => (
                  <motion.div
                    key={intern.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-6 rounded-3xl bg-amber-700/5 backdrop-blur-sm shadow-none transition-all duration-300 border-2 cursor-pointer hover:shadow-none border-transparent hover:border-amber-700/40`}
                  >
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={intern.avatar || "/placeholder.svg"}
                            alt={intern.name}
                          />
                          <AvatarFallback className="bg-amber-700 text-white">
                            {intern.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground text-base">
                            {intern.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {intern.university}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(intern.status)}>
                        {intern.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>
                          {intern.year} • {intern.specialization}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Started:{" "}
                          {new Date(intern.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{intern.rating}/5.0 Rating</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-amber-700/5 rounded-xl">
                        <p className="text-lg font-semibold text-foreground">
                          {intern.tasksCompleted}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tasks Completed
                        </p>
                      </div>
                      <div className="text-center p-3 bg-amber-700/5 rounded-xl">
                        <p className="text-lg font-semibold text-foreground">
                          {intern.hoursWorked}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Hours Worked
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hiredInterns.length === 0 && (
                <div className="text-center py-12">
                  <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No Interns Hired Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start building your team by hiring your first intern
                  </p>
                  <Link href="/lawyer/hire-interns">
                    <Button className="bg-amber-700 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Hire Your First Intern
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>{" "}
        </div>
      </div>
    </div>
  );
}
