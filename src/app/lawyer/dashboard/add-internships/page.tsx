"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  X,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  GraduationCap,
  Building,
  FileText,
  Eye,
  Save,
  Send,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface InternshipFormData {
  // Basic Information
  title: string;
  firmName: string;
  location: string;
  department: string;

  // Position Details
  positionType: string;
  duration: string;
  startDate: string;
  endDate: string;
  workSchedule: string;

  // Compensation
  compensationType: string;
  salaryAmount: string;
  benefits: string[];

  // Requirements
  educationLevel: string;
  gpaRequirement: string;
  lawSchoolYear: string;
  requiredSkills: string[];
  preferredSkills: string[];

  // Application Details
  applicationDeadline: string;
  requiredDocuments: string[];
  applicationProcess: string;

  // Description
  jobDescription: string;
  responsibilities: string[];
  learningObjectives: string[];

  // Contact Information
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;

  // Settings
  isRemote: boolean;
  isPublished: boolean;
  acceptsInternational: boolean;
  providesHousing: boolean;
}

export default function PostInternshipPage() {
  const [formData, setFormData] = useState<InternshipFormData>({
    title: "",
    firmName: "",
    location: "",
    department: "",
    positionType: "",
    duration: "",
    startDate: "",
    endDate: "",
    workSchedule: "",
    compensationType: "",
    salaryAmount: "",
    benefits: [],
    educationLevel: "",
    gpaRequirement: "",
    lawSchoolYear: "",
    requiredSkills: [],
    preferredSkills: [],
    applicationDeadline: "",
    requiredDocuments: [],
    applicationProcess: "",
    jobDescription: "",
    responsibilities: [],
    learningObjectives: [],
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    isRemote: false,
    isPublished: false,
    acceptsInternational: false,
    providesHousing: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newObjective, setNewObjective] = useState("");

  const steps = [
    { id: 1, title: "Basic Information", icon: Building },
    { id: 2, title: "Position Details", icon: FileText },
    { id: 3, title: "Requirements", icon: GraduationCap },
    { id: 4, title: "Application Process", icon: Users },
    { id: 5, title: "Review & Publish", icon: Eye },
  ];

  const benefitOptions = [
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "Paid Time Off",
    "Professional Development",
    "Mentorship Program",
    "Networking Opportunities",
    "Bar Exam Prep",
    "Transportation Allowance",
    "Meal Allowance",
    "Technology Stipend",
    "Conference Attendance",
  ];

  const documentOptions = [
    "Resume/CV",
    "Cover Letter",
    "Law School Transcript",
    "Writing Sample",
    "Letters of Recommendation",
    "Personal Statement",
    "Portfolio",
    "References List",
    "Work Authorization",
    "Background Check",
  ];

  const handleInputChange = (field: keyof InternshipFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: keyof InternshipFormData, value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
    }
  };

  const removeFromArray = (field: keyof InternshipFormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const toggleArrayItem = (field: keyof InternshipFormData, item: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(item)) {
      setFormData((prev) => ({
        ...prev,
        [field]: currentArray.filter((i) => i !== item),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentArray, item],
      }));
    }
  };

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    if (!isDraft) {
      setFormData((prev) => ({ ...prev, isPublished: true }));
    }

    // Show success message or redirect
    alert(
      isDraft ? "Internship saved as draft!" : "Internship posted successfully!"
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Internship Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Summer Legal Intern - Corporate Law"
                  className="mt-1 focus-visible:ring-0"
                />
              </div>
              <div>
                <Label htmlFor="firmName">Law Firm/Organization Name *</Label>
                <Input
                  id="firmName"
                  value={formData.firmName}
                  onChange={(e) =>
                    handleInputChange("firmName", e.target.value)
                  }
                  placeholder="e.g., Smith & Associates Law Firm"
                  className="mt-1 focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="e.g., New York, NY"
                  className="mt-1 focus-visible:ring-0"
                />
              </div>
              <div>
                <Label htmlFor="department">Department/Practice Area *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value: any) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
                    <SelectItem value="litigation">Litigation</SelectItem>
                    <SelectItem value="intellectual-property">
                      Intellectual Property
                    </SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="employment">Employment Law</SelectItem>
                    <SelectItem value="tax">Tax Law</SelectItem>
                    <SelectItem value="environmental">
                      Environmental Law
                    </SelectItem>
                    <SelectItem value="immigration">Immigration Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="jobDescription">Job Description *</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) =>
                  handleInputChange("jobDescription", e.target.value)
                }
                placeholder="Provide a comprehensive description of the internship position..."
                rows={6}
                className="mt-1 focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRemote"
                  checked={formData.isRemote}
                  onCheckedChange={(checked) =>
                    handleInputChange("isRemote", checked)
                  }
                  className="data-[state=checked]:bg-[#3b82f6] "
                />
                <Label htmlFor="isRemote">Remote Work Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="acceptsInternational"
                  checked={formData.acceptsInternational}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptsInternational", checked)
                  }
                  className="data-[state=checked]:bg-[#3b82f6] "
                />
                <Label htmlFor="acceptsInternational">
                  Accepts International Students
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="providesHousing"
                  checked={formData.providesHousing}
                  onCheckedChange={(checked) =>
                    handleInputChange("providesHousing", checked)
                  }
                  className="data-[state=checked]:bg-[#3b82f6] "
                />
                <Label htmlFor="providesHousing">
                  Provides Housing Assistance
                </Label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="positionType">Position Type *</Label>
                <Select
                  value={formData.positionType}
                  onValueChange={(value: any) =>
                    handleInputChange("positionType", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select position type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">Summer Internship</SelectItem>
                    <SelectItem value="semester">
                      Semester Internship
                    </SelectItem>
                    <SelectItem value="part-time">
                      Part-time Internship
                    </SelectItem>
                    <SelectItem value="full-time">
                      Full-time Internship
                    </SelectItem>
                    <SelectItem value="externship">Externship</SelectItem>
                    <SelectItem value="clerkship">
                      Judicial Clerkship
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value: any) =>
                    handleInputChange("duration", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8-weeks">8 Weeks</SelectItem>
                    <SelectItem value="10-weeks">10 Weeks</SelectItem>
                    <SelectItem value="12-weeks">12 Weeks</SelectItem>
                    <SelectItem value="1-semester">1 Semester</SelectItem>
                    <SelectItem value="2-semesters">2 Semesters</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="mt-1 focus-visible:ring-0"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="mt-1 focus-visible:ring-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="workSchedule">Work Schedule *</Label>
              <Select
                value={formData.workSchedule}
                onValueChange={(value: any) =>
                  handleInputChange("workSchedule", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select work schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time-40">
                    Full-time (40 hours/week)
                  </SelectItem>
                  <SelectItem value="full-time-35">
                    Full-time (35 hours/week)
                  </SelectItem>
                  <SelectItem value="part-time-25">
                    Part-time (25 hours/week)
                  </SelectItem>
                  <SelectItem value="part-time-20">
                    Part-time (20 hours/week)
                  </SelectItem>
                  <SelectItem value="part-time-15">
                    Part-time (15 hours/week)
                  </SelectItem>
                  <SelectItem value="flexible">Flexible Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Compensation & Benefits
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="compensationType">Compensation Type *</Label>
                  <Select
                    value={formData.compensationType}
                    onValueChange={(value: any) =>
                      handleInputChange("compensationType", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select compensation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="stipend">Stipend</SelectItem>
                      <SelectItem value="academic-credit">
                        Academic Credit Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.compensationType === "paid" && (
                  <div>
                    <Label htmlFor="salaryAmount">Salary/Hourly Rate *</Label>
                    <Input
                      id="salaryAmount"
                      value={formData.salaryAmount}
                      onChange={(e) =>
                        handleInputChange("salaryAmount", e.target.value)
                      }
                      placeholder="e.g., $20/hour or $5000/month"
                      className="mt-1 focus-visible:ring-0"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label>Benefits & Perks</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {benefitOptions.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={benefit}
                        checked={formData.benefits.includes(benefit)}
                        onChange={() => toggleArrayItem("benefits", benefit)}
                        className="rounded"
                      />
                      <Label htmlFor={benefit} className="text-sm">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Responsibilities
              </Label>

              <div className="mt-3 space-y-3">
                {/* Input + Add Button */}
                <div className="flex">
                  <Input
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    placeholder="Add a responsibility..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newResponsibility.trim()) {
                        addToArray(
                          "responsibilities",
                          newResponsibility.trim()
                        );
                        setNewResponsibility("");
                      }
                    }}
                    className="rounded-l-md border border-gray-300 focus:border-blue-500 focus-visible:ring-0 text-sm h-9 w-full rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newResponsibility.trim()) {
                        addToArray(
                          "responsibilities",
                          newResponsibility.trim()
                        );
                        setNewResponsibility("");
                      }
                    }}
                    size="sm"
                    className="rounded-r-md border border-l-0 border-gray-300 bg-[#3b82f6]/80 hover:bg-[#3b82f6] text-white px-3 h-[36px] rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Displayed Responsibilities */}
                <div className="flex flex-wrap gap-2">
                  {formData.responsibilities.map((responsibility, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded-md flex items-center gap-2"
                    >
                      {responsibility}
                      <X
                        className="h-3.5 w-3.5 text-gray-500 hover:text-red-600 cursor-pointer"
                        onClick={() =>
                          removeFromArray("responsibilities", index)
                        }
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Objectives
              </Label>

              <div className="mt-3 space-y-3">
                {/* Input + Add Button */}
                <div className="flex">
                  <Input
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    placeholder="Add an objective..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newObjective.trim()) {
                        addToArray("learningObjectives", newObjective.trim());
                        setNewObjective("");
                      }
                    }}
                    className="rounded-l-md border border-gray-300 focus:border-blue-500 focus-visible:ring-0 text-sm h-9 w-full rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newObjective.trim()) {
                        addToArray("learningObjectives", newObjective.trim());
                        setNewObjective("");
                      }
                    }}
                    size="sm"
                    className="rounded-r-md border border-l-0 border-gray-300 bg-[#3b82f6]/80 hover:bg-[#3b82f6] text-white px-3 h-[36px] rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Displayed Objectives */}
                <div className="flex flex-wrap gap-2">
                  {formData.learningObjectives.map((objective, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded-md flex items-center gap-2"
                    >
                      {objective}
                      <X
                        className="h-3.5 w-3.5 text-gray-500 hover:text-red-600 cursor-pointer"
                        onClick={() =>
                          removeFromArray("learningObjectives", index)
                        }
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="educationLevel">Education Level *</Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value: any) =>
                    handleInputChange("educationLevel", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="law-student">
                      Current Law Student
                    </SelectItem>
                    <SelectItem value="jd-graduate">JD Graduate</SelectItem>
                    <SelectItem value="undergraduate">
                      Undergraduate Student
                    </SelectItem>
                    <SelectItem value="paralegal">
                      Paralegal Certificate
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lawSchoolYear">Law School Year</Label>
                <Select
                  value={formData.lawSchoolYear}
                  onValueChange={(value: any) =>
                    handleInputChange("lawSchoolYear", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1L">1L (First Year)</SelectItem>
                    <SelectItem value="2L">2L (Second Year)</SelectItem>
                    <SelectItem value="3L">3L (Third Year)</SelectItem>
                    <SelectItem value="LLM">LLM Student</SelectItem>
                    <SelectItem value="any">Any Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="gpaRequirement">Minimum GPA Requirement</Label>
              <Input
                id="gpaRequirement"
                value={formData.gpaRequirement}
                onChange={(e) =>
                  handleInputChange("gpaRequirement", e.target.value)
                }
                placeholder="e.g., 3.0, 3.5, or leave blank for no requirement"
                className="mt-1 focus-visible:ring-0"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Required Skills
              </Label>

              <div className="mt-3 space-y-3">
                {/* Input + Add Button */}
                <div className="flex">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a required skill..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newSkill.trim()) {
                        addToArray("requiredSkills", newSkill.trim());
                        setNewSkill("");
                      }
                    }}
                    className="rounded-l-md border border-gray-300 focus:border-blue-500 focus-visible:ring-0 text-sm h-9 w-full rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newSkill.trim()) {
                        addToArray("preferredSkills", newSkill.trim());
                        setNewSkill("");
                      }
                    }}
                    size="sm"
                    className="rounded-r-md border border-l-0 border-gray-300 bg-[#3b82f6]/80 hover:bg-[#3b82f6] text-white px-3 h-[36px] rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Displayed Required Skills */}
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded-md flex items-center gap-2"
                    >
                      {skill}
                      <X
                        className="h-3.5 w-3.5 text-gray-500 hover:text-red-600 cursor-pointer"
                        onClick={() => removeFromArray("requiredSkills", index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Preferred Skills (Optional)
              </Label>

              <div className="mt-3 space-y-3">
                {/* Input + Add Button */}
                <div className="flex">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a preferred skill..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newSkill.trim()) {
                        addToArray("preferredSkills", newSkill.trim());
                        setNewSkill("");
                      }
                    }}
                    className="rounded-l-md border border-gray-300 focus:border-blue-500 focus-visible:ring-0 text-sm h-9 w-full rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newSkill.trim()) {
                        addToArray("preferredSkills", newSkill.trim());
                        setNewSkill("");
                      }
                    }}
                    size="sm"
                    className="rounded-r-md border border-l-0 border-gray-300 bg-[#3b82f6]/80 hover:bg-[#3b82f6] text-white px-3 h-[36px] rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Displayed Preferred Skills */}
                <div className="flex flex-wrap gap-2">
                  {formData.preferredSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded-md flex items-center gap-2"
                    >
                      {skill}
                      <X
                        className="h-3.5 w-3.5 text-gray-500 hover:text-red-600 cursor-pointer"
                        onClick={() =>
                          removeFromArray("preferredSkills", index)
                        }
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="applicationDeadline">
                Application Deadline *
              </Label>
              <Input
                id="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) =>
                  handleInputChange("applicationDeadline", e.target.value)
                }
                className="mt-1 focus-visible:ring-0"
              />
            </div>

            <div>
              <Label>Required Documents</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {documentOptions.map((document) => (
                  <div key={document} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={document}
                      checked={formData.requiredDocuments.includes(document)}
                      onChange={() =>
                        toggleArrayItem("requiredDocuments", document)
                      }
                      className="rounded"
                    />
                    <Label htmlFor={document} className="text-sm">
                      {document}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="applicationProcess">Application Process *</Label>
              <Textarea
                id="applicationProcess"
                value={formData.applicationProcess}
                onChange={(e) =>
                  handleInputChange("applicationProcess", e.target.value)
                }
                placeholder="Describe the application process, interview stages, timeline, etc."
                rows={6}
                className="mt-1 focus-visible:ring-0"
              />
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    placeholder="e.g., Jane Smith, HR Manager"
                    className="mt-1 focus-visible:ring-0"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    placeholder="e.g., internships@lawfirm.com"
                    className="mt-1 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    handleInputChange("contactPhone", e.target.value)
                  }
                  placeholder="e.g., +1 (555) 123-4567"
                  className="mt-1 focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {isPreview ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Hide Internship Posting
                    </h3>
                    <Button
                      variant="outline"
                      onClick={() => setIsPreview(false)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Hide Preview
                    </Button>
                  </div>
                </div>
                <InternshipPreview formData={formData} />
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Review Your Internship Posting
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setIsPreview(true)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Basic Information
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <p>
                            <strong>Title:</strong>{" "}
                            {formData.title || "Not specified"}
                          </p>
                          <p>
                            <strong>Firm:</strong>{" "}
                            {formData.firmName || "Not specified"}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {formData.location || "Not specified"}
                          </p>
                          <p>
                            <strong>Department:</strong>{" "}
                            {formData.department || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Position Details
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <p>
                            <strong>Type:</strong>{" "}
                            {formData.positionType || "Not specified"}
                          </p>
                          <p>
                            <strong>Duration:</strong>{" "}
                            {formData.duration || "Not specified"}
                          </p>
                          <p>
                            <strong>Schedule:</strong>{" "}
                            {formData.workSchedule || "Not specified"}
                          </p>
                          <p>
                            <strong>Compensation:</strong>{" "}
                            {formData.compensationType || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Requirements
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <p>
                            <strong>Education:</strong>{" "}
                            {formData.educationLevel || "Not specified"}
                          </p>
                          <p>
                            <strong>Year:</strong>{" "}
                            {formData.lawSchoolYear || "Not specified"}
                          </p>
                          <p>
                            <strong>GPA:</strong>{" "}
                            {formData.gpaRequirement || "No requirement"}
                          </p>
                          <p>
                            <strong>Skills:</strong>{" "}
                            {formData.requiredSkills.length} required,{" "}
                            {formData.preferredSkills.length} preferred
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Application
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <p>
                            <strong>Deadline:</strong>{" "}
                            {formData.applicationDeadline || "Not specified"}
                          </p>
                          <p>
                            <strong>Documents:</strong>{" "}
                            {formData.requiredDocuments.length} required
                          </p>
                          <p>
                            <strong>Contact:</strong>{" "}
                            {formData.contactPerson || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      Ready to publish?
                    </p>
                    <p className="text-blue-700 dark:text-blue-200">
                      Once published, your internship will be visible to all law
                      practioners. You can edit or unpublish it later.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 border-[1.5px] shadow-md rounded-2xl p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-[#3b82f6]" />
            Add Internship Opportunity
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a comprehensive internship listing to attract qualified law
            students and junior lawyers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id
                        ? "text-[#3b82f6]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-[#3b82f6]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader>
            <CardTitle>
              Step {currentStep}:{" "}
              {steps.find((s) => s.id === currentStep)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 px-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-5 py-2 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
            Previous
          </Button>

          <div className="flex gap-4">
            {currentStep === 5 ? (
              <>
                {/* Save as Draft */}
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>

                {/* Publish */}
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Publish Internship
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                Next
                <ChevronRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Preview Component
function InternshipPreview({ formData }: { formData: InternshipFormData }) {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-[#3b82f6]">
                {formData.title}
              </CardTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {formData.firmName}
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {formData.positionType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.compensationType}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600 dark:text-gray-300">
              {formData.jobDescription}
            </p>
          </div>

          {formData.responsibilities.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Key Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1">
                {formData.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formData.requiredSkills.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {formData.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="destructive">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">
              Application Deadline: {formData.applicationDeadline}
            </div>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb]">
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
