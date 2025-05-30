"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Scale,
  GraduationCap,
  Users,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Building,
  Calendar,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiriWave from "@/components/ui/ai";

type UserType = "lawyer" | "consumer" | "student";

interface FormData {
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  userType: UserType | "";

  // Lawyer specific
  firmName: string;
  barNumber: string;
  practiceAreas: string[];
  yearsExperience: string;
  jurisdiction: string;

  // Student specific
  university: string;
  year: string;
  expectedGraduation: string;
  gpa: string;
  lawSchoolType: string;

  // Consumer specific
  occupation: string;
  legalNeeds: string[];
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType | "">("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    userType: "",
    firmName: "",
    barNumber: "",
    practiceAreas: [],
    yearsExperience: "",
    jurisdiction: "",
    university: "",
    year: "",
    expectedGraduation: "",
    gpa: "",
    lawSchoolType: "",
    occupation: "",
    legalNeeds: [],
  });

  const userTypes = [
    {
      type: "lawyer" as UserType,
      title: "Legal Professional",
      description: "Licensed attorneys and legal practitioners",
      icon: Scale,
      features: [
        "Manage cases",
        "Find clients",
        "Post internships",
        "AI legal research",
      ],
      color: "bg-blue-50 border-blue-200 text-blue-700",
      iconColor: "text-blue-600",
    },
    {
      type: "consumer" as UserType,
      title: "Legal Consumer",
      description: "Individuals seeking legal assistance",
      icon: Users,
      features: [
        "Find lawyers",
        "Get legal advice",
        "Document review",
        "Legal consultation",
      ],
      color: "bg-green-50 border-green-200 text-green-700",
      iconColor: "text-green-600",
    },
    {
      type: "student" as UserType,
      title: "Law Student",
      description: "Current law school students and recent graduates",
      icon: GraduationCap,
      features: [
        "Find internships",
        "Legal resources",
        "Career guidance",
        "Study materials",
      ],
      color: "bg-purple-50 border-purple-200 text-purple-700",
      iconColor: "text-purple-600",
    },
  ];

  const practiceAreaOptions = [
    "Corporate Law",
    "Criminal Law",
    "Family Law",
    "Personal Injury",
    "Real Estate",
    "Immigration",
    "Employment Law",
    "Intellectual Property",
    "Tax Law",
    "Environmental Law",
    "Healthcare Law",
    "Bankruptcy",
  ];

  const legalNeedsOptions = [
    "Personal Injury",
    "Family Law",
    "Criminal Defense",
    "Real Estate",
    "Employment Issues",
    "Business Law",
    "Estate Planning",
    "Immigration",
    "Bankruptcy",
    "Contract Review",
    "Intellectual Property",
    "Other",
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    // Redirect based on user type
    if (formData.userType === "lawyer") {
      window.location.href = "/lawyer/dashboard";
    } else if (formData.userType === "student") {
      window.location.href = "/student/dashboard";
    } else {
      window.location.href = "/consumer/dashboard";
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Choose Your Account Type
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Select the option that best describes you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((userType, index) => (
          <motion.div
            key={userType.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-6 rounded-4xl border-2 cursor-pointer transition-all transform-gpu duration-300 ease-out ${
              selectedUserType === userType.type
                ? "border-[#3b82f6] bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105 -translate-y-2"
                : `${
                    userType.type === "lawyer"
                      ? "border-blue-600"
                      : userType.type === "student"
                      ? "border-purple-600"
                      : userType.type === "consumer"
                      ? "border-green-600"
                      : "border-transparent"
                  } hover:shadow-md hover:scale-105 hover:-translate-y-2`
            }`}
            onClick={() => {
              setSelectedUserType(userType.type);
              handleInputChange("userType", userType.type);
            }}
          >
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full border-2 backdrop-blur-2xl ${
                  userType.type === "lawyer"
                    ? "border-blue-600 bg-blue-600"
                    : userType.type === "student"
                    ? "border-purple-600 bg-purple-600"
                    : userType.type === "consumer"
                    ? "border-green-600 bg-green-600"
                    : "border-transparent"
                } flex items-center justify-center ${
                  selectedUserType === userType.type
                    ? "bg-[#3b82f6]"
                    : " dark:bg-gray-800"
                }`}
              >
                <userType.icon className={`text-white`} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {userType.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {userType.description}
              </p>
              <ul className="space-y-1">
                {userType.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBasicFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="John"
            className="mt-1 focus-visible:ring-0 border-black/20"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Doe"
            className="mt-1 focus-visible:ring-0 border-black/20"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="john@example.com"
            className="pl-10 focus-visible:ring-0 border-black/20"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password *</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="••••••••"
            className="pl-10 pr-10 focus-visible:ring-0 border-black/20"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              placeholder="••••••••"
              className="pl-10 pr-10 focus-visible:ring-0 border-black/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="pl-10 focus-visible:ring-0 border-black/20"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="New York, NY"
              className="pl-10 focus-visible:ring-0 border-black/20"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLawyerFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firmName">Law Firm/Organization *</Label>
          <div className="relative mt-1">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="firmName"
              value={formData.firmName}
              onChange={(e) => handleInputChange("firmName", e.target.value)}
              placeholder="Smith & Associates"
              className="pl-10 focus-visible:ring-0 border-black/20"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="barNumber">Bar Number *</Label>
          <Input
            id="barNumber"
            value={formData.barNumber}
            onChange={(e) => handleInputChange("barNumber", e.target.value)}
            placeholder="123456"
            className="focus-visible:ring-0 border-black/20 mt-1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="yearsExperience">Years of Experience *</Label>
          <Select
            value={formData.yearsExperience}
            onValueChange={(value) =>
              handleInputChange("yearsExperience", value)
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11-15">11-15 years</SelectItem>
              <SelectItem value="16-20">16-20 years</SelectItem>
              <SelectItem value="20+">20+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="jurisdiction">Primary Jurisdiction *</Label>
          <Select
            value={formData.jurisdiction}
            onValueChange={(value) => handleInputChange("jurisdiction", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="federal">Federal</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="fl">Florida</SelectItem>
              <SelectItem value="il">Illinois</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Practice Areas *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {practiceAreaOptions.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={area}
                checked={formData.practiceAreas.includes(area)}
                onCheckedChange={() => toggleArrayItem("practiceAreas", area)}
                className="border-black focus-visible:ring-0 data-[state=checked]:bg-blue-600 data-[state=checked]:border-0"
              />
              <Label htmlFor={area} className="text-sm">
                {area}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudentFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="university">Law School *</Label>
          <div className="relative mt-1">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => handleInputChange("university", e.target.value)}
              placeholder="Harvard Law School"
              className="pl-10 focus-visible:ring-0 border-black/20"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="year">Current Year *</Label>
          <Select
            value={formData.year}
            onValueChange={(value) => handleInputChange("year", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1L">1L (First Year)</SelectItem>
              <SelectItem value="2L">2L (Second Year)</SelectItem>
              <SelectItem value="3L">3L (Third Year)</SelectItem>
              <SelectItem value="LLM">LLM Student</SelectItem>
              <SelectItem value="JSD">JSD Student</SelectItem>
              <SelectItem value="graduate">Recent Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expectedGraduation">Expected Graduation *</Label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="expectedGraduation"
              value={formData.expectedGraduation}
              onChange={(e) =>
                handleInputChange("expectedGraduation", e.target.value)
              }
              placeholder="May 2025"
              className="pl-10 focus-visible:ring-0 border-black/20"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="gpa">Current GPA</Label>
          <Input
            id="gpa"
            value={formData.gpa}
            onChange={(e) => handleInputChange("gpa", e.target.value)}
            placeholder="3.5"
            className="mt-1 focus-visible:ring-0 border-black/20"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="lawSchoolType">Law School Type *</Label>
        <Select
          value={formData.lawSchoolType}
          onValueChange={(value) => handleInputChange("lawSchoolType", value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aba-accredited">ABA Accredited</SelectItem>
            <SelectItem value="state-accredited">State Accredited</SelectItem>
            <SelectItem value="international">International</SelectItem>
            <SelectItem value="online">Online Program</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderConsumerFields = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="occupation">Occupation</Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
            placeholder="Software Engineer"
            className="pl-10 focus-visible:ring-0 border-black/20"
          />
        </div>
      </div>

      <div>
        <Label>Legal Needs (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {legalNeedsOptions.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox
                id={need}
                checked={formData.legalNeeds.includes(need)}
                onCheckedChange={() => toggleArrayItem("legalNeeds", need)}
                className="border-black focus-visible:ring-0 data-[state=checked]:bg-blue-600 data-[state=checked]:border-0"
              />
              <Label htmlFor={need} className="text-sm">
                {need}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-fit flex items-center justify-center">
          <SiriWave opacity={0.6} isWaveMode={true} />
        </div>
      </div>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isLogin ? (
              <>Welcome Back</>
            ) : (
              <>
                Join{" "}
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Xegality
                </span>
              </>
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isLogin
              ? "Sign in to access your legal AI assistant"
              : "Create your account and start your legal journey"}
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/20 dark:bg-gray-900/80 backdrop-blur-lg rounded-4xl">
            {" "}
            <CardHeader>
              <Tabs value={isLogin ? "login" : "signup"} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 h-11 bg-transparent">
                  <TabsTrigger
                    value="login"
                    onClick={() => setIsLogin(true)}
                    className="rounded-full  cursor-pointer"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    onClick={() => setIsLogin(false)}
                    className="rounded-full cursor-pointer"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection (Signup Only) */}

                {!isLogin && !selectedUserType && renderUserTypeSelection()}

                {/* Login Form */}
                {isLogin && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loginEmail">Email Address</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="loginEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="john@example.com"
                          className="pl-10 focus-visible:ring-0 border-black/20"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="loginPassword">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="loginPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="••••••••"
                          className="pl-10 pr-10 focus-visible:ring-0 border-black/20"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          className="border-black focus-visible:ring-0 data-[state=checked]:bg-blue-600 data-[state=checked]:border-0"
                        />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Button
                        className="bg-transparent text-black shadow-none hover:bg-transparent hover:text-blue-600 cursor-pointer"
                        asChild
                      >
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-[#3b82f6]"
                        >
                          Forgot password..?
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Signup Form */}
                {!isLogin && selectedUserType && (
                  <div className="space-y-6">
                    {/* User Type Display */}
                    <div
                      className={`flex items-center justify-between p-4 ${
                        selectedUserType === "lawyer"
                          ? "bg-blue-600/20"
                          : selectedUserType === "student"
                          ? "bg-purple-600/20"
                          : selectedUserType === "consumer"
                          ? "bg-green-600/20"
                          : "bg-transparent"
                      } dark:bg-blue-900/20 rounded-lg`}
                    >
                      <div className="flex items-center gap-3">
                        {selectedUserType === "lawyer" && (
                          <Scale className="h-5 w-5 text-blue-600" />
                        )}
                        {selectedUserType === "consumer" && (
                          <Users className="h-5 w-5 text-green-600" />
                        )}
                        {selectedUserType === "student" && (
                          <GraduationCap className="h-5 w-5 text-purple-600" />
                        )}
                        <span className="font-medium">
                          {
                            userTypes.find((t) => t.type === selectedUserType)
                              ?.title
                          }
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUserType("");
                          handleInputChange("userType", "");
                        }}
                        className={`cursor-pointer ${
                          selectedUserType === "lawyer"
                            ? "hover:bg-blue-600 hover:text-white"
                            : selectedUserType === "student"
                            ? "hover:bg-purple-600 hover:text-white"
                            : selectedUserType === "consumer"
                            ? "hover:bg-green-600 hover:text-white"
                            : "bg-transparent"
                        }`}
                      >
                        Change
                      </Button>
                    </div>

                    {/* Basic Fields */}
                    {renderBasicFields()}

                    {/* User Type Specific Fields */}
                    {selectedUserType === "lawyer" && renderLawyerFields()}
                    {selectedUserType === "student" && renderStudentFields()}
                    {selectedUserType === "consumer" && renderConsumerFields()}

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        required
                        className="border-black focus-visible:ring-0 data-[state=checked]:bg-blue-600 data-[state=checked]:border-0"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-[#3b82f6] hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-[#3b82f6] hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                {(isLogin || (!isLogin && selectedUserType)) && (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 text-lg cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isLogin ? "Signing In..." : "Creating Account..."}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                )}

                {/* Social Login */}
                {isLogin && (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-900 text-gray-500"></span>
                      </div>
                    </div>

                    <div className="w-full p-[2px] rounded-md bg-gradient-to-tr from-[#4285F4]  via-transparent to-[#EA4335]">
                      <div className="rounded-md bg-white/50 dark:bg-gray-900">
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-gray-800 dark:text-white transition duration-200 hover:shadow-md"
                        >
                          <svg
                            className="w-5 h-5 transition-transform duration-200 hover:scale-110"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#EA4335"
                              d="M12 11.6v2.8h5.64c-.24 1.44-1.08 2.66-2.28 3.48v2.88h3.68c2.16-2 3.36-4.96 3.36-8.48 0-.56-.04-1.12-.12-1.68H12z"
                            />
                            <path
                              fill="#34A853"
                              d="M5.84 14.16a6.9 6.9 0 0 1 0-4.32v-2.8H2.12a11.96 11.96 0 0 0 0 9.92z"
                            />
                            <path
                              fill="#4285F4"
                              d="M12 5.2a6.84 6.84 0 0 1 4.8 1.84l3.44-3.44C17.8 1.44 15.04.4 12 .4c-4.3 0-8 2.48-9.88 6.08l3.72 2.88C7.72 6.88 9.68 5.2 12 5.2z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M2.12 7.28a11.96 11.96 0 0 0 0 9.92l3.72-2.88a6.91 6.91 0 0 1 0-4.32z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            Continue with Google
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Switch Auth Mode */}
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    <Button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setSelectedUserType("");
                        setFormData({
                          email: "",
                          password: "",
                          confirmPassword: "",
                          firstName: "",
                          lastName: "",
                          phone: "",
                          location: "",
                          userType: "",
                          firmName: "",
                          barNumber: "",
                          practiceAreas: [],
                          yearsExperience: "",
                          jurisdiction: "",
                          university: "",
                          year: "",
                          expectedGraduation: "",
                          gpa: "",
                          lawSchoolType: "",
                          occupation: "",
                          legalNeeds: [],
                        });
                      }}
                      className="bg-transparent text-black shadow-none hover:bg-transparent hover:text-blue-600 cursor-pointer"
                    >
                      {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span>Trusted by 10,000+ Users</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
