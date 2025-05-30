"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Users,
  Star,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Calendar,
  FileText,
  Download,
  Eye,
  CheckCircle,
  X,
  Clock,
  Award,
  Briefcase,
  MessageSquare,
  UserCheck,
  BriefcaseBusiness,
} from "lucide-react";
import { motion } from "framer-motion";

interface InternshipPosting {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  applicationDeadline: string;
  totalInterested: number;
  status: "active" | "closed" | "filled";
}

interface InterestedCandidate {
  id: string;
  internshipId: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  year: string;
  gpa: string;
  location: string;
  avatar: string;
  appliedDate: string;
  status: "interested" | "reviewed" | "interviewed" | "selected" | "rejected";
  resumeUrl: string;
  coverLetterUrl: string;
  writingSampleUrl?: string;
  skills: string[];
  experience: string[];
  interests: string[];
  availability: string;
  expectedGraduation: string;
  barExamPlan: string;
  references: number;
  rating: number;
  notes: string;
}

export default function ManageInternshipApplicationsPage() {
  const [selectedInternship, setSelectedInternship] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  // Mock data for posted internships
  const internshipPostings: InternshipPosting[] = [
    {
      id: "1",
      title: "Summer Legal Intern - Corporate Law",
      department: "Corporate Law",
      postedDate: "2024-01-10",
      applicationDeadline: "2024-03-15",
      totalInterested: 12,
      status: "active",
    },
    {
      id: "2",
      title: "Part-time Research Assistant",
      department: "Litigation",
      postedDate: "2024-01-05",
      applicationDeadline: "2024-02-28",
      totalInterested: 8,
      status: "active",
    },
    {
      id: "3",
      title: "IP Law Clinic Intern",
      department: "Intellectual Property",
      postedDate: "2023-12-20",
      applicationDeadline: "2024-02-01",
      totalInterested: 15,
      status: "closed",
    },
  ];

  // Mock data for interested candidates
  const [candidates, setCandidates] = useState<InterestedCandidate[]>([
    {
      id: "1",
      internshipId: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@lawschool.edu",
      phone: "+1 (555) 123-4567",
      university: "Harvard Law School",
      year: "2L",
      gpa: "3.8",
      location: "Cambridge, MA",
      avatar: "/placeholder.svg?height=100&width=100",
      appliedDate: "2024-01-15",
      status: "interested",
      resumeUrl: "/documents/sarah-resume.pdf",
      coverLetterUrl: "/documents/sarah-cover.pdf",
      writingSampleUrl: "/documents/sarah-writing.pdf",
      skills: [
        "Contract Analysis",
        "Legal Research",
        "Corporate Governance",
        "M&A",
      ],
      experience: [
        "Summer Associate at BigLaw",
        "Legal Clinic Volunteer",
        "Moot Court Competition",
      ],
      interests: ["Corporate Law", "Securities", "International Business"],
      availability: "Full-time (40 hours/week)",
      expectedGraduation: "May 2025",
      barExamPlan: "New York - July 2025",
      references: 3,
      rating: 4.8,
      notes: "",
    },
    {
      id: "2",
      internshipId: "1",
      name: "Michael Chen",
      email: "m.chen@stanford.edu",
      phone: "+1 (555) 987-6543",
      university: "Stanford Law School",
      year: "3L",
      gpa: "3.9",
      location: "Palo Alto, CA",
      avatar: "/placeholder.svg?height=100&width=100",
      appliedDate: "2024-01-18",
      status: "reviewed",
      resumeUrl: "/documents/michael-resume.pdf",
      coverLetterUrl: "/documents/michael-cover.pdf",
      skills: [
        "Due Diligence",
        "Contract Drafting",
        "Regulatory Compliance",
        "Tech Law",
      ],
      experience: [
        "Tech Startup Legal Intern",
        "Law Review Editor",
        "Pro Bono Clinic",
      ],
      interests: ["Corporate Law", "Technology", "Venture Capital"],
      availability: "Full-time (40 hours/week)",
      expectedGraduation: "May 2024",
      barExamPlan: "California - July 2024",
      references: 4,
      rating: 4.9,
      notes: "Strong tech background, excellent writing skills",
    },
    {
      id: "3",
      internshipId: "1",
      name: "Emily Rodriguez",
      email: "emily.r@yale.edu",
      phone: "+1 (555) 456-7890",
      university: "Yale Law School",
      year: "2L",
      gpa: "3.7",
      location: "New Haven, CT",
      avatar: "/placeholder.svg?height=100&width=100",
      appliedDate: "2024-01-20",
      status: "interviewed",
      resumeUrl: "/documents/emily-resume.pdf",
      coverLetterUrl: "/documents/emily-cover.pdf",
      writingSampleUrl: "/documents/emily-writing.pdf",
      skills: [
        "Legal Writing",
        "Client Relations",
        "Bilingual Communication",
        "Research",
      ],
      experience: [
        "Immigration Law Clinic",
        "Student Government",
        "Legal Aid Society",
      ],
      interests: ["Corporate Law", "International Law", "Social Justice"],
      availability: "Full-time (35 hours/week)",
      expectedGraduation: "May 2025",
      barExamPlan: "New York - July 2025",
      references: 3,
      rating: 4.6,
      notes:
        "Excellent interview, strong passion for corporate social responsibility",
    },
    {
      id: "4",
      internshipId: "1",
      name: "David Kim",
      email: "david.kim@columbia.edu",
      phone: "+1 (555) 321-0987",
      university: "Columbia Law School",
      year: "1L",
      gpa: "3.6",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=100&width=100",
      appliedDate: "2024-01-22",
      status: "interested",
      resumeUrl: "/documents/david-resume.pdf",
      coverLetterUrl: "/documents/david-cover.pdf",
      skills: [
        "Financial Analysis",
        "Business Strategy",
        "Legal Research",
        "Data Analysis",
      ],
      experience: [
        "Investment Banking Analyst",
        "Business Consulting",
        "Finance Club President",
      ],
      interests: ["Corporate Finance", "M&A", "Securities Law"],
      availability: "Part-time (25 hours/week)",
      expectedGraduation: "May 2026",
      barExamPlan: "New York - July 2026",
      references: 2,
      rating: 4.4,
      notes: "",
    },
    {
      id: "5",
      internshipId: "1",
      name: "Jessica Park",
      email: "j.park@nyu.edu",
      phone: "+1 (555) 654-3210",
      university: "NYU School of Law",
      year: "3L",
      gpa: "3.8",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=100&width=100",
      appliedDate: "2024-01-25",
      status: "selected",
      resumeUrl: "/documents/jessica-resume.pdf",
      coverLetterUrl: "/documents/jessica-cover.pdf",
      writingSampleUrl: "/documents/jessica-writing.pdf",
      skills: [
        "Contract Negotiation",
        "Corporate Transactions",
        "Legal Writing",
        "Client Management",
      ],
      experience: [
        "BigLaw Summer Associate",
        "Judicial Externship",
        "Law Journal Editor",
      ],
      interests: ["Corporate Law", "Private Equity", "Real Estate"],
      availability: "Full-time (40 hours/week)",
      expectedGraduation: "May 2024",
      barExamPlan: "New York - July 2024",
      references: 4,
      rating: 4.9,
      notes: "Top candidate - excellent credentials and interview performance",
    },
  ]);

  const updateCandidateStatus = (
    candidateId: string,
    newStatus: InterestedCandidate["status"]
  ) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );
  };

  const updateCandidateNotes = (candidateId: string, notes: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId ? { ...candidate, notes } : candidate
      )
    );
  };

  const filteredCandidates = candidates
    .filter((candidate) => candidate.internshipId === selectedInternship)
    .filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.university
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        );
      case "oldest":
        return (
          new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
        );
      case "gpa":
        return Number.parseFloat(b.gpa) - Number.parseFloat(a.gpa);
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: InterestedCandidate["status"]) => {
    switch (status) {
      case "interested":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "interviewed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "selected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: InterestedCandidate["status"]) => {
    switch (status) {
      case "interested":
        return <Users className="h-4 w-4" />;
      case "reviewed":
        return <Eye className="h-4 w-4" />;
      case "interviewed":
        return <MessageSquare className="h-4 w-4" />;
      case "selected":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const selectedInternshipData = internshipPostings.find(
    (posting) => posting.id === selectedInternship
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full p-6 rounded-2xl shadow-lg border-[1.5px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-[#3b82f6]" />
            Hire Interns
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and manage candidates who have expressed interest in your
            internship opportunities
          </p>
        </div>

        {/* Internship Selection */}
        <Card className="mb-8 bg-transparent border-0 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BriefcaseBusiness />
              Select Internship
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {internshipPostings.map((posting) => (
                <Card
                  key={posting.id}
                  className={`cursor-pointer border-2 border-transparent transition-all duration-200 ${
                    selectedInternship === posting.id
                      ? "border-[#3b82f6] bg-blue-50 dark:bg-blue-900/20"
                      : "hover:border-[#3b82f6]/50"
                  }`}
                  onClick={() => setSelectedInternship(posting.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{posting.title}</h3>
                      <Badge
                        className={
                          posting.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {posting.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {posting.department}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Posted:{" "}
                        {new Date(posting.postedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[#3b82f6]">
                        <Users className="h-3 w-3" />
                        {posting.totalInterested} interested
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedInternshipData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Candidates List */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl mb-5">
                      <Users className="h-5 w-5" />
                      Interested Candidates ({filteredCandidates.length})
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32 focus-visible:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="gpa">Highest GPA</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="name">Name A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search candidates by name, university, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 focus-visible:ring-0"
                      />
                    </div>

                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="selected">Selected</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {sortedCandidates.map((candidate, index) => (
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          selectedCandidate === candidate.id
                            ? "border-[#3b82f6] bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 hover:border-[#3b82f6]/50"
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={candidate.avatar || "/placeholder.svg"}
                                alt={candidate.name}
                              />
                              <AvatarFallback className="bg-[#3b82f6] text-white">
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {candidate.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {candidate.year} at {candidate.university}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  className={getStatusColor(candidate.status)}
                                  variant="secondary"
                                >
                                  {getStatusIcon(candidate.status)}
                                  <span className="ml-1 capitalize">
                                    {candidate.status}
                                  </span>
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium">
                                    {candidate.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              GPA: {candidate.gpa}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Applied:{" "}
                              {new Date(
                                candidate.appliedDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span>{candidate.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3 text-gray-500" />
                            <span>{candidate.expectedGraduation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span>{candidate.availability.split("(")[0]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-gray-500" />
                            <span>{candidate.references} refs</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {candidate.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Resume
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Contact
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            {candidate.status === "interested" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCandidateStatus(
                                    candidate.id,
                                    "reviewed"
                                  );
                                }}
                                className="text-xs"
                              >
                                Mark Reviewed
                              </Button>
                            )}
                            {candidate.status === "reviewed" && (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCandidateStatus(
                                    candidate.id,
                                    "interviewed"
                                  );
                                }}
                                className="text-xs bg-[#3b82f6] hover:bg-[#2563eb]"
                              >
                                Schedule Interview
                              </Button>
                            )}
                            {candidate.status === "interviewed" && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateCandidateStatus(
                                      candidate.id,
                                      "selected"
                                    );
                                  }}
                                  className="text-xs bg-green-600 hover:bg-green-700"
                                >
                                  Select
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateCandidateStatus(
                                      candidate.id,
                                      "rejected"
                                    );
                                  }}
                                  className="text-xs text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {sortedCandidates.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          No candidates found
                        </h3>
                        <p className="text-muted-foreground">
                          {searchQuery || statusFilter !== "all"
                            ? "Try adjusting your search criteria"
                            : "No one has expressed interest in this internship yet"}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Candidate Details Panel */}
            <div className="lg:col-span-1">
              {selectedCandidate ? (
                <CandidateDetailsPanel
                  candidate={
                    candidates.find((c) => c.id === selectedCandidate)!
                  }
                  onUpdateStatus={updateCandidateStatus}
                  onUpdateNotes={updateCandidateNotes}
                />
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Select a Candidate
                    </h3>
                    <p className="text-muted-foreground">
                      Click on a candidate from the list to view their detailed
                      profile and manage their application
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Candidate Details Panel Component
function CandidateDetailsPanel({
  candidate,
  onUpdateStatus,
  onUpdateNotes,
}: {
  candidate: InterestedCandidate;
  onUpdateStatus: (id: string, status: InterestedCandidate["status"]) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}) {
  const [notes, setNotes] = useState(candidate.notes);

  const handleSaveNotes = () => {
    onUpdateNotes(candidate.id, notes);
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={candidate.avatar || "/placeholder.svg"}
              alt={candidate.name}
            />
            <AvatarFallback className="bg-[#3b82f6] text-white text-lg">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{candidate.name}</CardTitle>
            <p className="text-muted-foreground">
              {candidate.year} at {candidate.university}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{candidate.rating}</span>
              </div>
              <Badge
                className={`${
                  candidate.status === "selected"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {candidate.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href={`mailto:${candidate.email}`}
                    className="text-[#3b82f6] hover:underline"
                  >
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a
                    href={`tel:${candidate.phone}`}
                    className="text-[#3b82f6] hover:underline"
                  >
                    {candidate.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Academic Information</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>GPA:</strong> {candidate.gpa}
                </p>
                <p>
                  <strong>Expected Graduation:</strong>{" "}
                  {candidate.expectedGraduation}
                </p>
                <p>
                  <strong>Bar Exam Plan:</strong> {candidate.barExamPlan}
                </p>
                <p>
                  <strong>Availability:</strong> {candidate.availability}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Experience</h4>
              <ul className="space-y-1 text-sm">
                {candidate.experience.map((exp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Briefcase className="h-3 w-3 text-gray-500 mt-1 flex-shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Interests</h4>
              <div className="flex flex-wrap gap-1">
                {candidate.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#3b82f6]" />
                  <span className="text-sm font-medium">Resume</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#3b82f6]" />
                  <span className="text-sm font-medium">Cover Letter</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>

              {candidate.writingSampleUrl && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#3b82f6]" />
                    <span className="text-sm font-medium">Writing Sample</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              )}

              <div className="p-3 border rounded-lg bg-muted">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">References</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {candidate.references} references available upon request
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Internal Notes</h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes about this candidate..."
                className="w-full h-32 p-3 border rounded-lg resize-none text-sm"
              />
              <Button onClick={handleSaveNotes} size="sm" className="mt-2">
                Save Notes
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Application Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span>
                    Applied:{" "}
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span>Status: {candidate.status}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t">
          {candidate.status === "interested" && (
            <Button
              onClick={() => onUpdateStatus(candidate.id, "reviewed")}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb]"
            >
              Mark as Reviewed
            </Button>
          )}

          {candidate.status === "reviewed" && (
            <Button
              onClick={() => onUpdateStatus(candidate.id, "interviewed")}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb]"
            >
              Schedule Interview
            </Button>
          )}

          {candidate.status === "interviewed" && (
            <div className="space-y-2">
              <Button
                onClick={() => onUpdateStatus(candidate.id, "selected")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Select Candidate
              </Button>
              <Button
                onClick={() => onUpdateStatus(candidate.id, "rejected")}
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Reject Candidate
              </Button>
            </div>
          )}

          {candidate.status === "selected" && (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Selected Candidate
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                This candidate has been selected for the position
              </p>
            </div>
          )}

          <Button variant="outline" className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
