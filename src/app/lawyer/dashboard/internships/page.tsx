"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface InternshipOpportunity {
  id: string;
  title: string;
  firmName: string;
  location: string;
  department: string;
  positionType: string;
  duration: string;
  workSchedule: string;
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

  // Mock data for internship opportunities
  const [internships, setInternships] = useState<InternshipOpportunity[]>([
    {
      id: "1",
      title: "Summer Legal Intern - Corporate Law",
      firmName: "Morrison & Associates LLP",
      location: "New York, NY",
      department: "Corporate Law",
      positionType: "Summer Internship",
      duration: "10 Weeks",
      workSchedule: "Full-time (40 hours/week)",
      compensationType: "Paid",
      salaryAmount: "$25/hour",
      startDate: "2024-06-01",
      applicationDeadline: "2024-03-15",
      description:
        "Join our dynamic corporate law team and gain hands-on experience in mergers & acquisitions, securities law, and corporate governance. You'll work directly with partners and senior associates on high-profile transactions.",
      requirements: [
        "2L or 3L law student",
        "3.5+ GPA",
        "Strong writing skills",
        "Interest in corporate law",
      ],
      benefits: [
        "Health Insurance",
        "Mentorship Program",
        "Networking Opportunities",
        "Bar Exam Prep",
      ],
      isRemote: false,
      acceptsInternational: true,
      providesHousing: true,
      contactPerson: "Sarah Johnson, Recruiting Manager",
      contactEmail: "internships@morrison-law.com",
      postedDate: "2024-01-10",
      applicants: 45,
      views: 234,
      rating: 4.8,
      isInterested: false,
    },
    {
      id: "2",
      title: "Litigation Intern - Civil Rights",
      firmName: "Justice & Partners",
      location: "Washington, DC",
      department: "Litigation",
      positionType: "Semester Internship",
      duration: "1 Semester",
      workSchedule: "Part-time (20 hours/week)",
      compensationType: "Stipend",
      salaryAmount: "$2000/month",
      startDate: "2024-02-01",
      applicationDeadline: "2024-02-28",
      description:
        "Work on cutting-edge civil rights cases and contribute to meaningful social justice work. Interns will assist with legal research, brief writing, and client interviews.",
      requirements: [
        "1L, 2L, or 3L",
        "Passion for civil rights",
        "Research skills",
        "Bilingual preferred",
      ],
      benefits: [
        "Professional Development",
        "Court Observation",
        "Client Interaction",
        "Public Interest Focus",
      ],
      isRemote: true,
      acceptsInternational: false,
      providesHousing: false,
      contactPerson: "Michael Chen, Senior Associate",
      contactEmail: "careers@justice-partners.org",
      postedDate: "2024-01-08",
      applicants: 67,
      views: 189,
      rating: 4.9,
      isInterested: false,
    },
    {
      id: "3",
      title: "Intellectual Property Research Intern",
      firmName: "TechLaw Innovations",
      location: "San Francisco, CA",
      department: "Intellectual Property",
      positionType: "Summer Internship",
      duration: "12 Weeks",
      workSchedule: "Full-time (35 hours/week)",
      compensationType: "Paid",
      salaryAmount: "$30/hour",
      startDate: "2024-05-15",
      applicationDeadline: "2024-03-01",
      description:
        "Dive into the world of tech patents and trademarks. Work with cutting-edge technology companies to protect their intellectual property rights and conduct patent research.",
      requirements: [
        "2L or 3L",
        "Technical background preferred",
        "Patent law interest",
        "Detail-oriented",
      ],
      benefits: [
        "Tech Industry Exposure",
        "Patent Training",
        "Flexible Hours",
        "Innovation Focus",
      ],
      isRemote: true,
      acceptsInternational: true,
      providesHousing: false,
      contactPerson: "Dr. Emily Rodriguez, IP Director",
      contactEmail: "ip-internships@techlaw.com",
      postedDate: "2024-01-12",
      applicants: 32,
      views: 156,
      rating: 4.7,
      isInterested: true,
    },
    {
      id: "4",
      title: "Criminal Defense Clinic Intern",
      firmName: "Public Defender's Office",
      location: "Chicago, IL",
      department: "Criminal Law",
      positionType: "Externship",
      duration: "1 Semester",
      workSchedule: "Part-time (25 hours/week)",
      compensationType: "Academic Credit",
      startDate: "2024-01-20",
      applicationDeadline: "2024-02-15",
      description:
        "Gain real courtroom experience defending clients in criminal cases. Interns will observe trials, assist with case preparation, and conduct client interviews under supervision.",
      requirements: [
        "3L student",
        "Criminal law coursework",
        "Trial advocacy interest",
        "Strong ethics",
      ],
      benefits: [
        "Courtroom Experience",
        "Trial Observation",
        "Client Advocacy",
        "Public Service",
      ],
      isRemote: false,
      acceptsInternational: false,
      providesHousing: false,
      contactPerson: "David Thompson, Chief Public Defender",
      contactEmail: "internships@pd-chicago.gov",
      postedDate: "2024-01-05",
      applicants: 28,
      views: 98,
      rating: 4.6,
      isInterested: false,
    },
    {
      id: "5",
      title: "Environmental Law Research Assistant",
      firmName: "Green Earth Legal",
      location: "Seattle, WA",
      department: "Environmental Law",
      positionType: "Part-time Internship",
      duration: "Flexible",
      workSchedule: "Part-time (15 hours/week)",
      compensationType: "Paid",
      salaryAmount: "$22/hour",
      startDate: "2024-02-01",
      applicationDeadline: "2024-03-30",
      description:
        "Join our mission to protect the environment through legal advocacy. Research environmental regulations, assist with policy analysis, and support litigation efforts.",
      requirements: [
        "Any year law student",
        "Environmental interest",
        "Research skills",
        "Sustainability focus",
      ],
      benefits: [
        "Environmental Impact",
        "Policy Work",
        "Flexible Schedule",
        "Mission-Driven",
      ],
      isRemote: true,
      acceptsInternational: true,
      providesHousing: false,
      contactPerson: "Lisa Park, Environmental Attorney",
      contactEmail: "internships@greenearth.legal",
      postedDate: "2024-01-15",
      applicants: 19,
      views: 87,
      rating: 4.5,
      isInterested: false,
    },
    {
      id: "6",
      title: "Immigration Law Clinic Intern",
      firmName: "Border Rights Advocacy",
      location: "Los Angeles, CA",
      department: "Immigration Law",
      positionType: "Summer Internship",
      duration: "8 Weeks",
      workSchedule: "Full-time (40 hours/week)",
      compensationType: "Stipend",
      salaryAmount: "$3000 total",
      startDate: "2024-06-10",
      applicationDeadline: "2024-04-01",
      description:
        "Provide legal assistance to immigrants and refugees. Help with asylum cases, family reunification, and deportation defense while making a real difference in people's lives.",
      requirements: [
        "2L or 3L",
        "Spanish fluency preferred",
        "Immigration law interest",
        "Cultural sensitivity",
      ],
      benefits: [
        "Humanitarian Impact",
        "Language Skills",
        "Community Service",
        "Diverse Experience",
      ],
      isRemote: false,
      acceptsInternational: false,
      providesHousing: true,
      contactPerson: "Maria Gonzalez, Clinic Director",
      contactEmail: "internships@borderrights.org",
      postedDate: "2024-01-18",
      applicants: 54,
      views: 201,
      rating: 4.9,
      isInterested: false,
    },
  ]);

  const handleInterested = (internshipId: string) => {
    setInternships((prev) =>
      prev.map((internship) =>
        internship.id === internshipId
          ? { ...internship, isInterested: !internship.isInterested }
          : internship
      )
    );
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
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Stipend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Academic Credit":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Unpaid":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 border-[1.5px] shadow-lg rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-[#3b82f6]" />
              Available Internship Opportunities
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover internship opportunities posted by law firms and legal
              organizations
            </p>
          </div>
          <Link href="/lawyer/dashboard/add-internships">
            <Button className="bg-gray-50 text-black hover:bg-white shadow-none hover:shadow-xl hover:scale-102">
              <Plus className="h-4 w-4 mr-2" />
              Add Internships
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-2 bg-transparent border-0 shadow-none">
          <CardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                <Input
                  placeholder="Search internships by title, firm, department, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base focus-visible:ring-0"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
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
                  <span className="text-sm text-muted-foreground">
                    {filteredInternships.length} opportunities found
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
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
              {showFilters && (
                <div className="flex items-center justify-between py-4 border-t border-b">
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Work Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Internship Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:scale-[1.01] border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all dark:bg-gray-900">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-[#3b82f6] mb-1">
                        {internship.title}
                      </CardTitle>
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {internship.firmName}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleInterested(internship.id)}
                      className={`rounded-full ${
                        internship.isInterested
                          ? "text-red-500 hover:bg-red-100"
                          : "hover:text-[#3b82f6]"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          internship.isInterested ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{internship.department}</Badge>
                    <Badge
                      className={getCompensationColor(
                        internship.compensationType
                      )}
                    >
                      {internship.compensationType}
                    </Badge>
                    {internship.isRemote && (
                      <Badge variant="outline">Remote</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {internship.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <span
                      className={`text-xs font-medium ${
                        getDaysUntilDeadline(internship.applicationDeadline) <=
                        7
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {getDaysUntilDeadline(internship.applicationDeadline)}{" "}
                      days left
                    </span>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-[#3b82f6] text-xs px-0"
                    >
                      <Link
                        href={"lawyer/dashboard/internships/${internship.id}"}
                      >
                        View Details →
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>{" "}
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No internships found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or check back later for new
              opportunities
            </p>
            <Button variant="outline">Clear Filters</Button>
          </div>
        )}

        {/* Interested Internships Summary */}
        {internships.some((i) => i.isInterested) && (
          <Card className="mt-8 border border-red-300 bg-red-50 dark:bg-red-900/10 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span>Your Interested Internships</span>
                <Badge className="text-xs px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  {internships.filter((i) => i.isInterested).length}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {internships
                  .filter((i) => i.isInterested)
                  .map((internship) => (
                    <div
                      key={internship.id}
                      className="flex items-center justify-between p-4 bg-red-200/20 dark:bg-gray-800 rounded-lg "
                    >
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                          {internship.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {internship.firmName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-red-400 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                        >
                          {getDaysUntilDeadline(internship.applicationDeadline)}{" "}
                          days left
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-amber-500/80 hover:bg-emerald-600 text-white px-3 py-1 rounded-3xl group"
                        >
                          <span className="block group-hover:hidden">
                            <Info className="h-5 w-5" />
                          </span>
                          <span className="hidden group-hover:block">
                            <Check className="h-5 w-5" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
