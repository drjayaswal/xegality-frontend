"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  GraduationCap,
  Heart,
  Filter,
  Star,
  Users,
  ChevronRight,
  Eye,
  Mail,
  Plus,
  Check,
  Info,
  X,
  CheckCircle2,
  Briefcase,
  Building,
  TrendingUp,
  Pen,
  PenTool,
  Globe,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import internshipsDataRaw from "./internship_opportunities_2025.json";

interface InternshipOpportunity {
  id: string;
  title: string;
  firmName: string;
  location: string;
  department: string;
  positionType: string;
  duration: string;
  compensationType: string;
  salaryAmount?: string;
  startDate: string;
  applicationDeadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  acceptsInternational: boolean;
  providesHousing: boolean;
  contactPerson: string;
  contactEmail: string;
  postedDate: string;
  applicants: number;
  views: number;
  rating: number;
  isInterested: boolean;
}

export default function HireAnInternPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [compensationFilter, setCompensationFilter] = useState("all");
  const [remoteFilter, setRemoteFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showInterestedSuccess, setShowInterestedSuccess] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock data for internship opportunities
  const [internships, setInternships] =
    useState<InternshipOpportunity[]>(internshipsDataRaw);

  const handleInterested = (internshipId: string) => {
    setInternships((prev) =>
      prev.map((internship) =>
        internship.id === internshipId
          ? { ...internship, isInterested: !internship.isInterested }
          : internship
      )
    );

    setShowInterestedSuccess(true);
    setTimeout(() => setShowInterestedSuccess(false), 2000);
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.firmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      locationFilter === "all" || internship.location.includes(locationFilter);
    const matchesDepartment =
      departmentFilter === "all" || internship.department === departmentFilter;
    const matchesCompensation =
      compensationFilter === "all" ||
      internship.compensationType === compensationFilter;
    const matchesRemote =
      remoteFilter === "all" ||
      (remoteFilter === "remote" && internship.isRemote) ||
      (remoteFilter === "onsite" && !internship.isRemote);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesDepartment &&
      matchesCompensation &&
      matchesRemote
    );
  });

  const sortedInternships = [...filteredInternships].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      case "deadline":
        return (
          new Date(a.applicationDeadline).getTime() -
          new Date(b.applicationDeadline).getTime()
        );
      case "salary":
        const aSalary = a.salaryAmount
          ? Number.parseFloat(a.salaryAmount.replace(/[^0-9.]/g, ""))
          : 0;
        const bSalary = b.salaryAmount
          ? Number.parseFloat(b.salaryAmount.replace(/[^0-9.]/g, ""))
          : 0;
        return bSalary - aSalary;
      case "rating":
        return b.rating - a.rating;
      case "applicants":
        return a.applicants - b.applicants;
      default:
        return 0;
    }
  });

  const getCompensationColor = (type: string) => {
    switch (type) {
      case "Paid":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
      case "Stipend":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
      case "Academic Credit":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
      case "Unpaid":
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Corporate Law":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800";
      case "Litigation":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800";
      case "Intellectual Property":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800";
      case "Criminal Law":
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/10 dark:text-orange-400 dark:border-orange-800";
      case "Environmental Law":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800";
      case "Immigration Law":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/10 dark:text-slate-400 dark:border-slate-800";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get featured internships for trending section
  const featuredInternships = internships
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className=" flex flex-col relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden max-w-7xl mx-auto">
      {/* Compact Header */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-950 to-amber-900 transition-all duration-300",
          isSearchFocused ? "blur-md" : "blur-0"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-slate-900/20 to-amber-600/20"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Internship Opportunities
                </h1>
                <p className="text-amber-100 text-sm font-medium">
                  Discover legal internships from top firms
                </p>
              </div>
            </div>

            {/* Right: Add Internship Button */}
            <Button
              asChild
              className="flex justify-between text-white bg-transparent border-white border hover:bg-white hover:text-amber-950 transition"
            >
              <Link href="/lawyer/dashboard/add-internships">
                <Plus className="stroke-3" />
                Add Internship
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Compact Search Section */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div
          className={cn(
            "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-all duration-300",
            isSearchFocused
              ? "shadow-2xl shadow-amber-800/30 -translate-y-2"
              : "shadow-lg shadow-amber-800/20"
          )}
        >
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                ref={searchInputRef}
                placeholder="Search internships by title, firm, department, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-10 py-2.5 text-sm bg-transparent border-amber-700/20 dark:border-slate-700 rounded-lg focus-visible:ring-0 focus-visible:border-amber-500 border-2 transition-all duration-200"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Filter Toggle and Sort */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 rounded-full border transition-colors duration-200 text-xs px-3 py-1.5 h-auto",
                  showFilters
                    ? "bg-amber-600 hover:bg-amber-700 hover:text-white text-white shadow-md border-amber-600"
                    : "border-slate-300 dark:border-slate-600 hover:bg-transparent hover:border-amber-400 hover:text-amber-600"
                )}
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-90" : ""
                  }`}
                />
              </Button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {filteredInternships.length} opportunities found
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-transparent border border-slate-300 dark:border-slate-600 rounded-lg text-xs">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="deadline">Deadline Soon</SelectItem>
                    <SelectItem value="salary">Highest Pay</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="applicants">
                      Fewest Applicants
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Washington">Washington, DC</SelectItem>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="Seattle">Seattle</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Corporate Law">
                        Corporate Law
                      </SelectItem>
                      <SelectItem value="Litigation">Litigation</SelectItem>
                      <SelectItem value="Intellectual Property">
                        Intellectual Property
                      </SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Environmental Law">
                        Environmental Law
                      </SelectItem>
                      <SelectItem value="Immigration Law">
                        Immigration Law
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={compensationFilter}
                    onValueChange={setCompensationFilter}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Compensation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Stipend">Stipend</SelectItem>
                      <SelectItem value="Academic Credit">
                        Academic Credit
                      </SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={remoteFilter} onValueChange={setRemoteFilter}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Work Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          isSearchFocused ? "blur-sm" : "blur-0"
        )}
      >
        <ScrollArea className="min-h-[580px]">
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {searchQuery ? "Search Results" : "All Internships"} (
                  {sortedInternships.length})
                </h2>
              </div>

              {/* Internship List */}
              {sortedInternships.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {sortedInternships.map((internship, index) => (
                    <motion.div
                      key={internship.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow p-4 flex items-center justify-between"
                    >
                      {/* Left */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">
                          {internship.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {internship.firmName} • {internship.location}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {/* Remote badge */}
                          {internship.isRemote && (
                            <Badge className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              Remote
                            </Badge>
                          )}

                          {/* Department */}
                          <Badge
                            variant="outline"
                            className="text-[10px] font-medium"
                          >
                            {internship.department}
                          </Badge>

                          {/* Position Type */}
                          <Badge className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                            {internship.positionType}
                          </Badge>

                          {/* Compensation Type */}
                          <Badge
                            className={`text-[10px] font-medium ${
                              internship.compensationType === "Paid"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : internship.compensationType === "Unpaid"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {internship.compensationType}
                          </Badge>

                          {/* Salary */}
                          {internship.salaryAmount !== "N/A" && (
                            <Badge className="text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
                              {internship.salaryAmount}
                            </Badge>
                          )}

                          {/* Duration */}
                          <Badge className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {internship.duration}
                          </Badge>

                          {/* Accepts International - show only if true */}
                          {internship.acceptsInternational && (
                            <Badge className="text-[10px] font-medium flex items-center gap-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                              <Globe size={10} />
                              Intl Accepted
                            </Badge>
                          )}

                          {/* Provides Housing */}
                          {internship.providesHousing && (
                            <Badge
                              className={`text-[10px] font-medium flex items-center gap-1 ${
                                internship.providesHousing
                                  ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
                                  : "bg-gray-200 text-gray-500 dark:bg-gray-700/30 dark:text-gray-400"
                              }`}
                            >
                              <Home size={10} />
                              {internship.providesHousing
                                ? "Housing"
                                : "No Housing"}
                            </Badge>
                          )}
                          {/* Rating */}
                          <Badge className="text-[10px] bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 flex items-center gap-1">
                            <Star size={10} />
                            {internship.rating.toFixed(1)}
                          </Badge>

                          {/* Applicants count (optional) */}
                          <Badge className="text-[10px] bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400">
                            {internship.applicants} Applicants
                          </Badge>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            getDaysUntilDeadline(
                              internship.applicationDeadline
                            ) <= 7
                              ? "text-red-600"
                              : "text-slate-500"
                          )}
                        >
                          {getDaysUntilDeadline(internship.applicationDeadline)}
                          d left
                        </span>
                        <Button
                          size="sm"
                          className="flex justify-between hover:bg-amber-700 bg-amber-600/30 hover:text-white text-amber-800 px-3 py-1 text-xs rounded-lg"
                        >
                          <PenTool className="rotate-270" />
                          <Link
                            href={`/lawyer/dashboard/internships/${internship.id}`}
                          >
                            Apply
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 h-120">
                  <GraduationCap className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-base font-medium text-slate-900 dark:text-white mb-1">
                    No internships found
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Try different filters or check back soon.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setLocationFilter("all");
                      setDepartmentFilter("all");
                      setCompensationFilter("all");
                      setRemoteFilter("all");
                    }}
                    className="text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showInterestedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-amber-200 dark:border-amber-800 p-4 flex items-center gap-3 z-50 max-w-sm"
          >
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                Interest Updated!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Internship saved to your collection
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInterestedSuccess(false)}
              className="h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
