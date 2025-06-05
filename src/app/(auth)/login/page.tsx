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
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type UserType = "lawyer" | "consumer" | "student";

// 🎨 CHANGE ALL COLORS FROM HERE - Single source of truth
const THEME_COLORS = {
  lawyer: {
    name: "Legal Professional",
    description: "Attorneys and advocates offering services",
    primary: "bg-amber-600",
    primaryHover: "hover:bg-amber-700",
    background: "bg-amber-700/10",
    border: "border-amber-600",
    text: "text-amber-700",
    icon: "text-amber-600",
    gradient: "from-amber-600 to-amber-800",
    checkboxChecked: "data-[state=checked]:bg-amber-600",
  },
  consumer: {
    name: "Individual Litigant",
    description: "People in need of legal help or legal advice",
    primary: "bg-emerald-600",
    primaryHover: "hover:bg-emerald-700",
    background: "bg-emerald-700/10",
    border: "border-emerald-600",
    text: "text-emerald-700",
    icon: "text-emerald-600",
    gradient: "from-emerald-600 to-emerald-800",
    checkboxChecked: "data-[state=checked]:bg-emerald-600",
  },
  student: {
    name: "Law Student",
    description: "Undergraduates pursuing legal education and careers",
    primary: "bg-violet-600",
    primaryHover: "hover:bg-violet-700",
    background: "bg-violet-700/10",
    border: "border-violet-600",
    text: "text-violet-700",
    icon: "text-violet-600",
    gradient: "from-violet-600 to-violet-800",
    checkboxChecked: "data-[state=checked]:bg-violet-600",
  },
};

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  userType: UserType | "";
  firmName: string;
  barNumber: string;
  practiceAreas: string[];
  yearsExperience: string;
  jurisdiction: string;
  university: string;
  year: string;
  expectedGraduation: string;
  gpa: string;
  lawSchoolType: string;
  occupation: string;
  legalNeeds: string[];
}

export default function AuthPageSingle() {
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
      title: THEME_COLORS.lawyer.name,
      description: THEME_COLORS.lawyer.description,
      icon: Scale,
      features: [
        "Streamline case management",
        "Connect with clients",
        "Post internships & jobs",
        "Access AI-powered legal research",
      ],
    },
    {
      type: "consumer" as UserType,
      title: THEME_COLORS.consumer.name,
      description: THEME_COLORS.consumer.description,
      icon: Users,
      features: [
        "Find trusted lawyers",
        "Get personalized legal advice",
        "Upload & review documents",
        "Book legal consultations",
      ],
    },
    {
      type: "student" as UserType,
      title: THEME_COLORS.student.name,
      description: THEME_COLORS.student.description,
      icon: GraduationCap,
      features: [
        "Discover internships & clerkships",
        "Access legal databases & tools",
        "Receive mentorship",
        "Download case briefs & resources",
      ],
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

  const currentTheme = selectedUserType ? THEME_COLORS[selectedUserType] : null;

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

  const handleUserTypeSelect = (userType: UserType) => {
    setSelectedUserType(userType);
    handleInputChange("userType", userType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    if (formData.userType === "lawyer") {
      window.location.href = "/lawyer/dashboard";
    } else if (formData.userType === "student") {
      window.location.href = "/student/dashboard";
    } else {
      window.location.href = "/consumer/dashboard";
    }
  };

  const ThemedButton = ({
    variant = "primary",
    children,
    className = "",
    ...props
  }: any) => {
    if (!currentTheme) {
      return (
        <Button className={className} {...props}>
          {children}
        </Button>
      );
    }

    const variantClasses: any = {
      primary: `${currentTheme.primary} ${currentTheme.primaryHover} text-white`,
      secondary: `border-2 ${currentTheme.border} ${currentTheme.text} bg-transparent hover:${currentTheme.primary} hover:text-white`,
      ghost: `${currentTheme.text} hover:${currentTheme.background}`,
    };

    return (
      <Button className={`${variantClasses[variant]} ${className}`} {...props}>
        {children}
      </Button>
    );
  };

  const ThemedCheckbox = ({ ...props }) => {
    const checkboxClass = currentTheme
      ? `border-gray-300 focus-visible:ring-0 ${currentTheme.checkboxChecked} data-[state=checked]:border-0`
      : "border-gray-300 focus-visible:ring-0 data-[state=checked]:bg-blue-600 data-[state=checked]:border-0";

    return <Checkbox className={checkboxClass} {...props} />;
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">
          Choose Your Account Type
        </h3>
        <p className="text-gray-600 text-lg">
          Select the option that best describes you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((userType, index) => {
          const theme = THEME_COLORS[userType.type];
          const isSelected = selectedUserType === userType.type;

          return (
            <motion.div
              key={userType.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all transform-gpu duration-300 ease-out ${
                isSelected
                  ? `${theme.border} ${theme.background} shadow-lg scale-105 -translate-y-2`
                  : `${theme.border} hover:shadow-md hover:scale-105 hover:-translate-y-2 hover:${theme.background}`
              }`}
              onClick={() => handleUserTypeSelect(userType.type)}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full border-2 ${
                    theme.border
                  } ${
                    isSelected ? theme.primary : theme.background
                  } flex items-center justify-center`}
                >
                  <userType.icon
                    className={`${isSelected ? "text-white" : theme.icon}`}
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {userType.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {userType.description}
                </p>
                <ul className="space-y-1">
                  {userType.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs text-gray-500 flex items-center gap-1"
                    >
                      <CheckCircle className={`h-3 w-3 ${theme.icon}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
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
            className="mt-1 focus-visible:ring-0 border-gray-300"
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
            className="mt-1 focus-visible:ring-0 border-gray-300"
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
            className="pl-10 focus-visible:ring-0 border-gray-300"
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
            className="pl-10 pr-10 focus-visible:ring-0 border-gray-300"
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
              className="pl-10 pr-10 focus-visible:ring-0 border-gray-300"
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
              className="pl-10 focus-visible:ring-0 border-gray-300"
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
              className="pl-10 focus-visible:ring-0 border-gray-300"
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
              className="pl-10 focus-visible:ring-0 border-gray-300"
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
            className="focus-visible:ring-0 border-gray-300 mt-1"
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
              <ThemedCheckbox
                id={area}
                checked={formData.practiceAreas.includes(area)}
                onCheckedChange={() => toggleArrayItem("practiceAreas", area)}
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
              className="pl-10 focus-visible:ring-0 border-gray-300"
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
              className="pl-10 focus-visible:ring-0 border-gray-300"
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
            className="mt-1 focus-visible:ring-0 border-gray-300"
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
            className="pl-10 focus-visible:ring-0 border-gray-300"
          />
        </div>
      </div>

      <div>
        <Label>Legal Needs (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {legalNeedsOptions.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <ThemedCheckbox
                id={need}
                checked={formData.legalNeeds.includes(need)}
                onCheckedChange={() => toggleArrayItem("legalNeeds", need)}
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
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Dynamic background overlay based on theme */}
      {currentTheme && (
        <div
          className={`fixed inset-0 ${currentTheme.background} opacity-30 pointer-events-none`}
        />
      )}

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? (
              <>
                Welcome to{" "}
                <span
                  className={`text-4xl font-bold bg-gradient-to-r ${
                    currentTheme ? currentTheme.gradient : "from-black to-black"
                  } bg-clip-text text-transparent`}
                >
                  Xegality
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Your trusted legal assistant, ready to help.
                </p>
              </>
            ) : (
              <>
                <span
                  className={`text-4xl font-bold bg-gradient-to-r ${
                    currentTheme ? currentTheme.gradient : "from-black to-black"
                  } bg-clip-text text-transparent`}
                >
                  Xegality
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Empowering your legal journey with AI precision.
                </p>
              </>
            )}
          </h1>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl bg-gray-50/90 rounded-4xl border-0">
            <CardHeader>
              <Tabs value={isLogin ? "login" : "signup"} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 h-11 bg-gray-100 shadow-inner rounded-3xl">
                  <TabsTrigger
                    value="login"
                    onClick={() => setIsLogin(true)}
                    className="rounded-full cursor-pointer"
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
                          className="pl-10 focus-visible:ring-0 border-gray-300"
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
                          className="pl-10 pr-10 focus-visible:ring-0 border-gray-300"
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
                        <ThemedCheckbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Button
                        className="bg-transparent text-blue-600 shadow-none hover:bg-transparent hover:text-blue-700 cursor-pointer"
                        asChild
                      >
                        <Link href="/auth/forgot-password" className="text-sm">
                          Forgot password?
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
                      className={`flex items-center justify-between p-4 ${currentTheme?.background} rounded-lg`}
                    >
                      <div className="flex items-center gap-3">
                        {selectedUserType === "lawyer" && (
                          <Scale className={`h-5 w-5 ${currentTheme?.icon}`} />
                        )}
                        {selectedUserType === "consumer" && (
                          <Users className={`h-5 w-5 ${currentTheme?.icon}`} />
                        )}
                        {selectedUserType === "student" && (
                          <GraduationCap
                            className={`h-5 w-5 ${currentTheme?.icon}`}
                          />
                        )}
                        <span className="font-medium">
                          {currentTheme?.name}
                        </span>
                      </div>
                      <ThemedButton
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setSelectedUserType("");
                          handleInputChange("userType", "");
                        }}
                        className={`${currentTheme?.background} cursor-pointer shadow-none ${currentTheme?.primaryHover} hover:text-white rounded-xl`}
                      >
                        Change
                      </ThemedButton>
                    </div>

                    {/* Basic Fields */}
                    {renderBasicFields()}

                    {/* User Type Specific Fields */}
                    {selectedUserType === "lawyer" && renderLawyerFields()}
                    {selectedUserType === "student" && renderStudentFields()}
                    {selectedUserType === "consumer" && renderConsumerFields()}

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                      <ThemedCheckbox id="terms" required />
                      <Label
                        htmlFor="terms"
                        className="text-sm leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className={`${
                            currentTheme?.text || "text-blue-600"
                          } hover:underline`}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className={`${
                            currentTheme?.text || "text-blue-600"
                          } hover:underline`}
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                {(isLogin || (!isLogin && selectedUserType)) && (
                  <ThemedButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-medium py-3 text-lg cursor-pointer"
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
                  </ThemedButton>
                )}

                {/* Social Login */}
                {isLogin && (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">
                          or
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 rounded-md p-[1.5px] bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#EA4335]">
                        <div className="rounded-md bg-white">
                          <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-200 bg-white py-2.5 px-4 shadow-sm transition duration-200 hover:shadow-md hover:bg-gray-50"
                          >
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
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
                            <span className="text-sm font-medium text-gray-700 select-none">
                              Continue with Google
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 rounded-md p-[1.5px] bg-gradient-to-r from-[#1877F2] via-[#3b5998] to-[#4267B2]">
                        <div className="rounded-md bg-white">
                          <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-200 bg-white py-2.5 px-4 shadow-sm transition duration-200 hover:shadow-md hover:bg-gray-50"
                          >
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="#1877F2"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700 select-none">
                              Continue with Facebook
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Switch Auth Mode */}
                <div className="text-center">
                  <p className="text-gray-600">
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
                      className={`bg-transparent text-gray-700 shadow-none hover:bg-transparent ${
                        currentTheme
                          ? `hover:${currentTheme.text}`
                          : "hover:text-blue-600"
                      } cursor-pointer`}
                    >
                      {isLogin
                        ? "Don't have an account ?"
                        : "Already have an account ?"}
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
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
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
