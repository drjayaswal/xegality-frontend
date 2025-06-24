"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  GraduationCap,
  Filter,
  Star,
  ChevronRight,
  X,
  CheckCircle2,
  PenTool,
  Globe,
  Home,
  Loader2,
  RefreshCcw,
  ShieldBan,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  showSuccessToast,
  showErrorToast,
  getCompensationColor,
  getDaysUntilDeadline,
} from "@/lib/helper";
import { apiClient } from "@/lib/api";
import type { InternshipData, InternshipFilters } from "@/types/shared.types";
import { fetchRoleFromToken } from "@/lib/authenticate";

interface InternshipSkeletonCardProps {
  index?: number;
}

interface ApplicationFormData {
  name: string;
  email: string;
  college: string;
  city: string;
  resume_link: string;
}

function InternshipSkeletonCard({ index = 0 }: InternshipSkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 flex items-center justify-between"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Title and Company */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-3 w-48" />
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-18 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 ml-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-7 w-20 rounded-lg" />
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
    </motion.div>
  );
}

export default function HireAnInternPageUpdated() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [compensationFilter, setCompensationFilter] = useState("all");
  const [remoteFilter, setRemoteFilter] = useState("all");
  const [sortBy, setSortBy] = useState<InternshipFilters["sort_by"]>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showInterestedSuccess, setShowInterestedSuccess] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastSearchedQueryRef = useRef<string>("");
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // User authentication state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  // Application modal states
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedInternship, setSelectedInternship] =
    useState<InternshipData | null>(null);
  const [applicationForm, setApplicationForm] = useState<ApplicationFormData>({
    name: "",
    email: "",
    college: "",
    city: "",
    resume_link: "",
  });
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);

  const fetchInternships = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Build filters object
      const filters: InternshipFilters = {
        search: searchQuery || undefined,
        location: locationFilter !== "all" ? locationFilter : undefined,
        department: departmentFilter !== "all" ? departmentFilter : undefined,
        compensation_type:
          compensationFilter !== "all" ? compensationFilter : undefined,
        is_remote:
          remoteFilter === "remote"
            ? true
            : remoteFilter === "onsite"
            ? false
            : undefined,
        sort_by: sortBy,
      };

      const response = await apiClient.fetchInternships(filters);

      if (response.success) {
        setInternships(response.data || []);
      } else {
        throw new Error(response.message || "Failed to fetch internships");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      showErrorToast("Failed to load internships", errorMessage);
      console.error("Error fetching internships:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleInterested = async (internshipId: string) => {
    try {
      const response = await apiClient.markInternshipAsInterested(internshipId);
      if (response.success) {
        setShowInterestedSuccess(true);
        showSuccessToast(
          "Interest marked!",
          "Internship saved to your collection"
        );
        setTimeout(() => setShowInterestedSuccess(false), 2000);
      }
    } catch (error) {
      showErrorToast("Failed to mark interest", "Please try again later");
    }
  };

  const handleSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery && trimmedQuery !== lastSearchedQueryRef.current) {
        lastSearchedQueryRef.current = trimmedQuery;
        const response = await apiClient.searchInternships(searchQuery);
        if (response.success) {
          setInternships(response.data || []);
        } else {
          throw new Error(response.message || "Failed to fetch internships");
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      showErrorToast("Failed to load internships", errorMessage);
      console.error("Error fetching internships:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApply = async (internship: InternshipData) => {
    try {
      await apiClient.incrementInternshipViews(internship.id);
      setSelectedInternship(internship);
      setShowApplicationModal(true);
    } catch (error) {
      console.error("Failed to increment views:", error);
      // Still show the modal even if view increment fails
      setSelectedInternship(internship);
      setShowApplicationModal(true);
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInternship || !user) {
      showErrorToast("Authentication Error", "Please log in to apply");
      return;
    }

    // Basic form validation
    if (
      !applicationForm.name.trim() ||
      !applicationForm.email.trim() ||
      !applicationForm.college.trim() ||
      !applicationForm.city.trim() ||
      !applicationForm.resume_link.trim()
    ) {
      showErrorToast(
        "Missing Information",
        "Please fill in all required fields"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationForm.email)) {
      showErrorToast("Invalid Email", "Please enter a valid email address");
      return;
    }

    // URL validation for resume link
    try {
      new URL(applicationForm.resume_link);
    } catch {
      showErrorToast(
        "Invalid Resume Link",
        "Please enter a valid URL for your resume"
      );
      return;
    }

    setIsSubmittingApplication(true);

    try {
      // Prepare payload matching backend expectations
      const applicationPayload = {
        internship_id: selectedInternship.id,
        id: user.id,
        name: applicationForm.name,
        email: applicationForm.email,
        resume: applicationForm.resume_link, // Backend expects 'resume', not 'resume_link'
        city: applicationForm.city,
        college: applicationForm.college,
      };

      const response = await apiClient.applyInternship(applicationPayload);

      if (response.success) {
        showSuccessToast(
          "Application Submitted!",
          `Your application for ${selectedInternship.title} has been sent successfully.`
        );

        // Reset form and close modal
        setApplicationForm({
          name: "",
          email: "",
          college: "",
          city: "",
          resume_link: "",
        });
        setShowApplicationModal(false);
        setSelectedInternship(null);
      } else {
        throw new Error(response.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      showErrorToast(
        "Submission Failed",
        error instanceof Error ? error.message : "Please try again later"
      );
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmittingApplication) {
      setShowApplicationModal(false);
      setSelectedInternship(null);
      setApplicationForm({
        name: "",
        email: "",
        college: "",
        city: "",
        resume_link: "",
      });
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // Fetch user data on component mount
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await fetchRoleFromToken();
  //       if (userData) {
  //         setUser({
  //           id: userData.id,
  //           name: userData.name,
  //           email: userData.email,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // Pre-populate form with user data when available
  useEffect(() => {
    if (user && showApplicationModal) {
      setApplicationForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user, showApplicationModal]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      fetchInternships(true);
    }, 5000);
  };

  // Generate skeleton items for loading state
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="flex w-full h-full flex-col relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 transition-all duration-300",
          isSearchFocused ? "blur-md" : "blur-0"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-slate-900/20 to-emerald-600/20"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {loading ? (
                <>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                    <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 sm:h-6 w-40 sm:w-60 rounded-md" />
                    <Skeleton className="h-4 w-48 sm:w-64 rounded-md" />
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Internship Opportunities
                    </h1>
                  </div>
                </>
              )}{" "}
            </div>
            <div className="flex gap-3">
              {loading ? (
                <Button
                  className="flex justify-between text-white bg-transparent border-0 hover:bg-white hover:text-emerald-950 transition"
                  disabled={true}
                >
                  <RefreshCcw
                    className={cn(
                      "stroke-3",
                      (refreshing || loading) && "animate-spin"
                    )}
                  />
                  Refreshing
                </Button>
              ) : (
                <Button
                  className="flex justify-between text-white bg-transparent border-0 hover:bg-white hover:text-emerald-950 transition"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCcw
                    className={cn("stroke-3", refreshing && "animate-spin")}
                  />
                  Refresh
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div
          className={cn(
            "bg-white dark:bg-slate-800 rounded-xl border-0  dark:border-slate-700 p-4 sm:p-6 transition-all duration-300",
            isSearchFocused
              ? "shadow-2xl shadow-emerald-800/30 -translate-y-2"
              : "shadow-lg shadow-emerald-800/20"
          )}
        >
          <div className="space-y-4">
            <div className="relative">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                {loading ? (
                  <Skeleton className="h-9 w-full" />
                ) : (
                  <Input
                    ref={searchInputRef}
                    placeholder="Search internships by title, firm, department, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="pl-10 pr-20 py-2.5 text-sm bg-transparent border-emerald-700/30 dark:border-slate-700 rounded-lg focus-visible:ring-0 focus-visible:border-emerald-700 border-2 transition-all duration-200"
                  />
                )}
                {searchQuery && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex rounded-md shadow-sm overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleSearch();
                      }}
                      className="h-6 px-2 py-0 text-xs font-medium text-emerald-800 bg-white hover:bg-emerald-800 hover:text-white dark:bg-transparent dark:hover:bg-slate-700 rounded-none rounded-l-md"
                    >
                      Search
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchQuery("")}
                      className="h-6 w-6 p-0 bg-white text-emerald-800 hover:bg-red-100 dark:bg-transparent dark:hover:bg-slate-700 rounded-none rounded-r-md"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}{" "}
              </div>
            </div>{" "}
            {loading ? (
              <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-32" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-9 w-32" />

                  <Skeleton className="h-9 w-32" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-2 transition-colors duration-200 text-xs h-auto bg-transparent border-0 shadow-none dark:border-slate-600 rounded-lg "
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
                  <Select
                    value={sortBy}
                    onValueChange={(value) =>
                      setSortBy(value as InternshipFilters["sort_by"])
                    }
                  >
                    <SelectTrigger className="w-40 bg-transparent border-0 shadow-none dark:border-slate-600 rounded-lg text-xs">
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
            )}
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
                    <SelectTrigger className="w-40 bg-transparent border-0 shadow-none dark:border-slate-600 rounded-lg text-xs">
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
                    <SelectTrigger className="w-40 bg-transparent border-0 shadow-none dark:border-slate-600 rounded-lg text-xs">
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
                    <SelectTrigger className="w-40 bg-transparent border-0 shadow-none dark:border-slate-600 rounded-lg text-xs">
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
                    <SelectTrigger className="w-40 bg-transparent border-0 shadow-none dark:border-slate-600 rounded-lg text-xs">
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
              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-lg flex items-center justify-center gap-1 font-semibold text-slate-900 dark:text-white">
                  {loading ? (
                    <span>Searching...</span>
                  ) : (
                    <span>
                      {searchQuery ? "Search Results" : "All Internships"}(
                      {internships.length})
                    </span>
                  )}
                </h2>
              </div>

              {/* Internship List or Skeleton */}
              <div className="grid grid-cols-1 gap-4">
                {loading ? (
                  // Show skeleton cards while loading
                  skeletonItems.map((_, index) => (
                    <InternshipSkeletonCard key={index} index={index} />
                  ))
                ) : error ? (
                  // Show error state
                  <div className="text-center py-12">
                    <div className="text-center">
                      <p className="text-red-600 dark:text-red-400 mb-4">
                        {error}
                      </p>
                      <Button onClick={handleRefresh} variant="outline">
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : internships.length > 0 ? (
                  // Show actual internship data
                  internships.map((internship, index) => (
                    <motion.div
                      key={internship.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="rounded-xl dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow p-4 flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">
                          {internship.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {internship.firm_name} • {internship.location}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {internship.is_remote && (
                            <Badge className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              Remote
                            </Badge>
                          )}

                          <Badge
                            variant="outline"
                            className="text-[10px] font-medium"
                          >
                            {internship.department}
                          </Badge>

                          <Badge className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                            {internship.position_type}
                          </Badge>

                          <Badge
                            className={`text-[10px] font-medium ${getCompensationColor(
                              internship.compensation_type
                            )}`}
                          >
                            {internship.compensation_type}
                          </Badge>

                          {internship.salary_amount !== "N/A" && (
                            <Badge className="text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
                              {internship.salary_amount}
                            </Badge>
                          )}

                          <Badge className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {internship.duration}
                          </Badge>

                          {internship.accepts_international && (
                            <Badge className="text-[10px] font-medium flex items-center gap-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                              <Globe size={10} />
                              Intl Accepted
                            </Badge>
                          )}

                          {internship.provides_housing && (
                            <Badge className="text-[10px] font-medium flex items-center gap-1 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">
                              <Home size={10} />
                              Housing
                            </Badge>
                          )}

                          {internship.rating && (
                            <Badge className="text-[10px] bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 flex items-center gap-1">
                              <Star size={10} />
                              {internship.rating.toFixed(1)}
                            </Badge>
                          )}

                          <Badge className="text-[10px] bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400">
                            {internship.applicants_till_now} Applicants
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            getDaysUntilDeadline(
                              internship.application_deadline
                            ) <= 7
                              ? "text-red-600"
                              : "text-slate-500"
                          )}
                        >
                          {getDaysUntilDeadline(
                            internship.application_deadline
                          ) > 0 &&
                            `
                          ${getDaysUntilDeadline(
                            internship.application_deadline
                          )}
                          d left
                          `}
                        </span>
                        {getDaysUntilDeadline(internship.application_deadline) >
                        0 ? (
                          <Button
                            size="sm"
                            onClick={() => handleApply(internship)}
                            className="flex items-center gap-1 hover:bg-emerald-700 bg-emerald-600/30 hover:text-white text-emerald-800 px-3 py-1 text-xs rounded-lg"
                          >
                            <PenTool className="h-3 w-3" />
                            Apply
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            disabled={true}
                            className="flex items-center gap-1 bg-gray-200 text-gray-500 px-3 py-1 text-xs rounded-lg cursor-not-allowed"
                          >
                            <ShieldBan className="h-3 w-3" />
                            Expired
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // Show empty state
                  <div className="text-center py-12">
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
                      className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/10"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-emerald-600" />
              Apply for Internship
            </DialogTitle>
            <DialogDescription>
              {selectedInternship && (
                <>
                  <span className="font-medium">
                    {selectedInternship.title}
                  </span>
                  <br />
                  <span className="text-sm text-slate-500">
                    {selectedInternship.firm_name} •{" "}
                    {selectedInternship.location}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={applicationForm.name || user?.name || ""}
                onChange={(e) =>
                  setApplicationForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
                disabled={isSubmittingApplication}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={applicationForm.email || user?.email || ""}
                onChange={(e) =>
                  setApplicationForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
                disabled={isSubmittingApplication}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="college">College/University *</Label>
              <Input
                id="college"
                type="text"
                placeholder="Enter your college or university name"
                value={applicationForm.college}
                onChange={(e) =>
                  setApplicationForm((prev) => ({
                    ...prev,
                    college: e.target.value,
                  }))
                }
                required
                disabled={isSubmittingApplication}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={applicationForm.city}
                onChange={(e) =>
                  setApplicationForm((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                required
                disabled={isSubmittingApplication}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume_link">Resume Link *</Label>
              <Input
                id="resume_link"
                type="url"
                placeholder="https://drive.google.com/... or https://..."
                value={applicationForm.resume_link}
                onChange={(e) =>
                  setApplicationForm((prev) => ({
                    ...prev,
                    resume_link: e.target.value,
                  }))
                }
                required
                disabled={isSubmittingApplication}
              />
              <p className="text-xs text-slate-500">
                Please provide a link to your resume (Google Drive, Dropbox,
                etc.)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
                disabled={isSubmittingApplication}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmittingApplication}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmittingApplication ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Toast */}
      <AnimatePresence>
        {showInterestedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3 z-50 max-w-sm"
          >
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
