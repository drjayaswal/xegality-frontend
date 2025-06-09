"use client";

import {
  Search,
  FileText,
  MessageSquare,
  Calendar,
  Bell,
  ChevronRight,
  Shield,
  Clock,
  Users,
  FileCheck,
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ConsumerDashboard() {
  const stats = [
    {
      title: "Active Cases",
      value: "3",
      icon: Briefcase,
      change: "+1",
      trend: "up"
    },
    {
      title: "Documents",
      value: "12",
      icon: FileCheck,
      change: "+3",
      trend: "up"
    },
    {
      title: "Messages",
      value: "5",
      icon: MessageSquare,
      change: "2 new",
      trend: "neutral"
    },
    {
      title: "Pending Tasks",
      value: "4",
      icon: AlertCircle,
      change: "-2",
      trend: "down"
    }
  ];

  const quickActions = [
    {
      name: "Find a Lawyer",
      description: "Search and connect with qualified legal professionals",
      icon: Search,
      value: "find-lawyer",
      color: "from-violet-500 to-purple-600"
    },
    {
      name: "My Documents",
      description: "Access and manage your legal documents",
      icon: FileText,
      value: "documents",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Messages",
      description: "Communicate with your legal team",
      icon: MessageSquare,
      value: "messages",
      color: "from-emerald-500 to-teal-600"
    },
  ];

  const upcomingAppointments = [
    {
      title: "Contract Review",
      lawyer: "Sarah Johnson",
      time: "Tomorrow, 10:00 AM",
      type: "Video Call"
    },
    {
      title: "Legal Consultation",
      lawyer: "Michael Chen",
      time: "Friday, 2:30 PM",
      type: "In-Person"
    }
  ];

  const recentDocuments = [
    {
      name: "Rental Agreement.pdf",
      type: "Contract",
      date: "2 days ago",
      size: "2.4 MB"
    },
    {
      name: "Legal Brief.docx",
      type: "Document",
      date: "1 week ago",
      size: "1.8 MB"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-600">
              Welcome back, John
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your legal matters</p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                      <stat.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' :
                      stat.trend === 'down' ? 'text-red-500' :
                        'text-blue-500'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="group cursor-pointer hover:shadow-lg transition-all border-none bg-gradient-to-br from-background to-muted/50">
                    <CardContent className="p-6">
                      <div className={`mb-4 p-3 text-lg font-semibold text-white flex gap-3 items-center rounded-lg bg-gradient-to-r ${action.color} bg-opacity-10`}>
                        <action.icon className="h-6 w-6 text-white" />
                        {action.name}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {action.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-full justify-between group-hover:text-violet-600"
                        asChild
                      >
                        <Link href={`/consumer/${action.value}`}>
                          Get Started
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Upcoming Appointments</h2>
            <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{appointment.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                          {appointment.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{appointment.lawyer}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-violet-600">
                  View Calendar
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Documents</h2>
            <Button variant="ghost" className="text-violet-600">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                        <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                      <p className="text-xs text-muted-foreground">{doc.size}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

