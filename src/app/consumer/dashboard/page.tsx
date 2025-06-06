"use client";

import { 
  Search, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Bell, 
  ChevronRight,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ConsumerDashboard() {
  const quickActions = [
    {
      name: "Find a Lawyer",
      description: "Search and connect with qualified legal professionals",
      icon: Search,
      value: "find-lawyer",
    },
    {
      name: "My Documents",
      description: "Access and manage your legal documents",
      icon: FileText,
      value: "documents",
    },
    {
      name: "Messages",
      description: "Communicate with your legal team",
      icon: MessageSquare,
      value: "messages",
    },
  ];

  const recentActivity = [
    {
      title: "Document Review",
      description: "Your contract review is in progress",
      icon: FileText,
      time: "2 hours ago",
    },
    {
      title: "Appointment Scheduled",
      description: "Meeting with your lawyer tomorrow",
      icon: Calendar,
      time: "1 day ago",
    },
    {
      title: "New Message",
      description: "Your lawyer sent you a message",
      icon: MessageSquare,
      time: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Welcome to Your Legal Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your central place for managing legal matters, connecting with lawyers, and accessing legal services.
          </p>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="group cursor-pointer hover:shadow-lg transition-all border border-muted bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-full w-fit bg-primary/10">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:text-primary"
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

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-muted"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

