"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileText,
  Calendar,
  Clock,
  User,
  Building2,
  Scale,
  FileSignature,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  title: string;
  type: "case" | "lawyer" | "ca";
  status: "active" | "pending" | "completed" | "closed";
  date: Date;
  description: string;
  assignedTo?: string;
  reference?: string;
}

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Sample history data
  const historyItems: HistoryItem[] = [
    {
      id: "1",
      title: "Divorce Case",
      type: "case",
      status: "active",
      date: new Date(2024, 2, 15),
      description: "Ongoing divorce proceedings",
      assignedTo: "Adv. Rajesh Kumar",
      reference: "CASE-2024-001",
    },
    {
      id: "2",
      title: "Property Registration",
      type: "lawyer",
      status: "completed",
      date: new Date(2024, 1, 20),
      description: "Property registration completed successfully",
      assignedTo: "Adv. Priya Sharma",
      reference: "LEG-2024-002",
    },
    {
      id: "3",
      title: "GST Registration",
      type: "ca",
      status: "pending",
      date: new Date(2024, 2, 10),
      description: "GST registration application in progress",
      assignedTo: "CA Vikram Mehta",
      reference: "CA-2024-003",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "closed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "case":
        return <Scale className="h-5 w-5" />;
      case "lawyer":
        return <FileSignature className="h-5 w-5" />;
      case "ca":
        return <Building2 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px] border-accent-violet"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">All History</TabsTrigger>
          <TabsTrigger value="case">Cases</TabsTrigger>
          <TabsTrigger value="lawyer">Lawyers</TabsTrigger>
          <TabsTrigger value="ca">CA Services</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{item.date.toLocaleDateString()}</span>
                            </div>
                            {item.assignedTo && (
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{item.assignedTo}</span>
                              </div>
                            )}
                            {item.reference && (
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>{item.reference}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
