"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Loader2,
  ShieldQuestion,
} from "lucide-react";
import { toast } from "sonner";
import {
  isEmail,
  isPhone,
  formatPhoneNumber,
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
} from "@/lib/helper";
import { apiClient } from "@/lib/api";
import { OTPInput } from "@/components/shared/otp-input";
import { fetchRoleFromToken } from "@/lib/authenticate";

type UserType = "student" | "lawyer" | "consumer";
type LoginMethod = "otp" | "password";
type AuthStep = "initial" | "method-selection" | "form" | "otp-verification";

interface LoginData {
  emailOrPhone: string;
  loginMethod: LoginMethod;
  password: string;
  otp: string;
}

interface SignupData {
  name: string;
  emailOrPhone: string;
  password: string;
  role: UserType;
  otp: string;
}

const USER_TYPES = [
  {
    type: "student" as UserType,
    title: "Law Student",
    description: "Pursuing legal education",
    icon: GraduationCap,
    color: "bg-violet-600 hover:bg-violet-700",
    borderColor: "border-violet-600",
    textColor: "text-violet-600",
    bgLight: "bg-violet-50",
  },
  {
    type: "lawyer" as UserType,
    title: "Legal Professional",
    description: "Practicing attorney or advocate",
    icon: Scale,
    color: "bg-amber-600 hover:bg-amber-700",
    borderColor: "border-amber-600",
    textColor: "text-amber-600",
    bgLight: "bg-amber-50",
  },
  {
    type: "consumer" as UserType,
    title: "Individual Client",
    description: "Seeking legal assistance",
    icon: Users,
    color: "bg-emerald-600 hover:bg-emerald-700",
    borderColor: "border-emerald-600",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50",
  },
];

export default function EnhancedAuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login states
  const [loginStep, setLoginStep] = useState<AuthStep>("initial");
  const [loginData, setLoginData] = useState<LoginData>({
    emailOrPhone: "",
    loginMethod: "password",
    password: "",
    otp: "",
  });

  // Signup states
  const [signupStep, setSignupStep] = useState<AuthStep>("initial");
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    emailOrPhone: "",
    password: "",
    role: "student",
    otp: "",
  });

  // Check for existing authentication on mount
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await apiClient.refreshTokens();
  //       console.log("1");
  //       console.log(response);

  //       return response.data;
  //     } catch (error) {
  //       // console.error("Exception while calling refreshTokens:", error);
  //       return {
  //         success: false,
  //         message: "Unexpected error occurred.",
  //         code: 500,
  //       };
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // API Functions
  const sendOTP = async (emailOrPhone: string, isSignup = false) => {
    const loadingToast = showLoadingToast("Sending OTP...");

    try {
      setIsLoading(true);
      const payload: { phone?: number; email?: string } = {};

      if (isEmail(emailOrPhone)) {
        payload.email = emailOrPhone;
      } else if (isPhone(emailOrPhone)) {
        payload.phone = formatPhoneNumber(emailOrPhone);
      } else {
        showErrorToast(
          "Invalid Input",
          "Please enter a valid email or phone number"
        );
        return false;
      }

      const response = await apiClient.generateOTP(payload);

      if (response.success) {
        showSuccessToast(
          "OTP Sent Successfully",
          `Verification code sent to ${emailOrPhone}`
        );
        return true;
      } else {
        showErrorToast(
          "Failed to Send OTP",
          response.message || "Please try again"
        );
        return false;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      showErrorToast(
        "Network Error",
        "Failed to send OTP. Please check your connection."
      );
      return false;
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const loginWithPassword = async (emailOrPhone: string, password: string) => {
    const loadingToast = showLoadingToast("Logging in...");

    try {
      setIsLoading(true);
      const payload: { phone?: number; email?: string; password: string } = {
        password: password,
      };

      if (isEmail(emailOrPhone)) {
        payload.email = emailOrPhone;
      } else if (isPhone(emailOrPhone)) {
        payload.phone = formatPhoneNumber(emailOrPhone);
      } else {
        showErrorToast(
          "Invalid Input",
          "Please enter a valid email or phone number"
        );
        return false;
      }

      const response = await apiClient.login(payload);

      if (response.success) {
        if (response.code == 200 && response.data && response.data.role) {
          showSuccessToast("Login Successful", "Welcome back!");
          router.push(`/${response.data.role}`);
          return true;
        } else if (
          response.code == 2001 &&
          response.data &&
          response.data.role
        ) {
          showSuccessToast("Already Logged In", "Welcome!");
          router.push(`/${response.data.role}`);
          return true;
        }
      } else {
        showErrorToast(
          "Login Failed",
          response.message || "Invalid credentials"
        );
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showErrorToast(
        "Login Error",
        "Please check your credentials and try again."
      );
      return false;
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const loginWithOTP = async (emailOrPhone: string, otp: string) => {
    const loadingToast = showLoadingToast("Verifying OTP...");

    try {
      setIsLoading(true);
      const payload: {
        phone?: number;
        email?: string;
        otp: number;
        name: string;
        role: string;
      } = {
        name: "",
        role: "",
        otp: Number(otp),
      };

      if (isEmail(emailOrPhone)) {
        payload.email = emailOrPhone;
      } else if (isPhone(emailOrPhone)) {
        payload.phone = formatPhoneNumber(emailOrPhone);
      } else {
        showErrorToast(
          "Invalid Input",
          "Please enter a valid email or phone number"
        );
        return false;
      }

      const response = await apiClient.verifyUser(payload);

      if (response.success) {
        showSuccessToast("Login Successful", "Welcome back!");
        setTimeout(
          () => router.push(`/${response.data?.user.role}/dashboard`),
          1000
        );
        return true;
        // if (response.success) {
        //   if (response.code == 200 && response.data && response.data.role) {
        //     showSuccessToast("Login Successful", "Welcome back!");
        //     router.push(`/${response.data.role}`);
        //     return true;
        //   }
        //   else if(response.code == 2001 && response.data && response.data.role) {
        //     showSuccessToast("Already Logged In", "Welcome!");
        //     router.push(`/${response.data.role}`);
        //     return true;
        //   }
      } else {
        showErrorToast(
          "Verification Failed",
          response.message || "Invalid OTP"
        );
        return false;
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showErrorToast(
        "Verification Error",
        "Please check your OTP and try again."
      );
      return false;
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const completeSignup = async (completeData: SignupData) => {
    const loadingToast = showLoadingToast("Creating account...");

    try {
      setIsLoading(true);
      const payload: {
        phone?: number;
        email?: string;
        otp: number;
        name: string;
        role: string;
        password: string;
      } = {
        name: completeData.name,
        role: completeData.role,
        password: completeData.password,
        otp: Number(completeData.otp),
      };

      if (isEmail(completeData.emailOrPhone)) {
        payload.email = completeData.emailOrPhone;
      } else if (isPhone(completeData.emailOrPhone)) {
        payload.phone = formatPhoneNumber(completeData.emailOrPhone);
      } else {
        showErrorToast(
          "Invalid Input",
          "Please enter a valid email or phone number"
        );
        return false;
      }

      const response = await apiClient.verifyUser(payload);

      if (response.success) {
        showSuccessToast("Account Created", "Welcome to Xegality!");
        router.push(`/${payload.role}`);
        return true;
      } else {
        showErrorToast(
          "Signup Failed",
          response.message || "Failed to create account"
        );
        return false;
      }
    } catch (error) {
      console.error("Error completing signup:", error);
      showErrorToast(
        "Signup Error",
        "Account creation failed. Please try again."
      );
      return false;
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const handleGoogleLogin = async () => {
    const loadingToast = showLoadingToast("Redirecting to Google...");

    try {
      setIsLoading(true);
      const role = selectedUserType || "consumer";
      const response = await fetch(
        "http:localhost:4000/auth/google-login?role=" + role
      );
      console.log("response", response.body);

      // if (response.data?.link) {
      //   window.location.href = response.data.link;
      // } else {
      //   showErrorToast("Google Login Error", "Failed to get Google login URL");
      // }
    } catch (error) {
      console.error("Error with Google login:", error);
      showErrorToast("Google Login Failed", "Please try again later.");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  // Event Handlers
  const handleLoginInitial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.emailOrPhone.trim()) {
      showErrorToast(
        "Required Field",
        "Please enter your email or phone number"
      );
      return;
    }
    setLoginStep("method-selection");
  };

  const handleLoginMethodSelect = async (method: LoginMethod) => {
    setLoginData((prev) => ({ ...prev, loginMethod: method }));

    if (method === "otp") {
      const success = await sendOTP(loginData.emailOrPhone);
      if (success) {
        setLoginStep("otp-verification");
      }
    } else {
      setLoginStep("form");
    }
  };

  const handleLoginComplete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginData.loginMethod === "password") {
      if (!loginData.password.trim()) {
        showErrorToast("Required Field", "Please enter your password");
        return;
      }
      await loginWithPassword(loginData.emailOrPhone, loginData.password);
    } else {
      if (!loginData.otp.trim() || loginData.otp.length !== 6) {
        showErrorToast("Invalid OTP", "Please enter a valid 6-digit OTP");
        return;
      }
      await loginWithOTP(loginData.emailOrPhone, loginData.otp);
    }
  };

  const handleUserTypeSelect = (userType: UserType) => {
    setSelectedUserType(userType);
    setSignupData((prev) => ({ ...prev, role: userType }));
    setSignupStep("form");
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.name.trim()) {
      showErrorToast("Required Field", "Please enter your full name");
      return;
    }
    if (!signupData.emailOrPhone.trim()) {
      showErrorToast(
        "Required Field",
        "Please enter your email or phone number"
      );
      return;
    }
    if (!signupData.password.trim() || signupData.password.length < 6) {
      showErrorToast(
        "Invalid Password",
        "Password must be at least 6 characters long"
      );
      return;
    }

    const success = await sendOTP(signupData.emailOrPhone, true);
    if (success) {
      setSignupStep("otp-verification");
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.otp.trim() || signupData.otp.length !== 6) {
      showErrorToast("Invalid OTP", "Please enter a valid 6-digit OTP");
      return;
    }

    await completeSignup(signupData);
  };

  const resetStates = () => {
    setLoginStep("initial");
    setSignupStep("initial");
    setSelectedUserType(null);
    setLoginData({
      emailOrPhone: "",
      loginMethod: "password",
      password: "",
      otp: "",
    });
    setSignupData({
      name: "",
      emailOrPhone: "",
      password: "",
      role: "student",
      otp: "",
    });
  };

  const goBack = () => {
    if (isLogin) {
      if (loginStep === "method-selection" || loginStep === "form") {
        setLoginStep("initial");
      } else if (loginStep === "otp-verification") {
        setLoginStep("method-selection");
      }
    } else {
      if (signupStep === "form") {
        setSignupStep("initial");
        setSelectedUserType(null);
      } else if (signupStep === "otp-verification") {
        setSignupStep("form");
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Xegality
            </span>
          </h1>
          <p className="text-slate-600 text-lg">Your trusted legal assistant</p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-4xl shadow-slate-200/50 border border-white/20 overflow-hidden animate-fade-in-up delay-200">
          {/* Tabs Header */}
          <div className="p-6 pt-2 pb-0">
            <div className="bg-gray-400/10 rounded-2xl p-1.5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    resetStates();
                  }}
                  className={`px-4 py-3 rounded-[14px] font-medium transition-all duration-300 text-sm sm:text-base ${
                    isLogin
                      ? "bg-white text-slate-900 shadow-lg shadow-slate-200/50 transform scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 cursor-pointer"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    resetStates();
                  }}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    !isLogin
                      ? "bg-white text-slate-900 shadow-lg shadow-slate-200/50 transform scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 cursor-pointer"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent>
            {isLogin ? (
              // LOGIN FLOW
              <div className="space-y-6">
                {loginStep === "initial" && (
                  <div className="space-y-6 animate-slide-in-right">
                    <form onSubmit={handleLoginInitial} className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="emailOrPhone"
                            value={loginData.emailOrPhone}
                            onChange={(e) =>
                              setLoginData((prev) => ({
                                ...prev,
                                emailOrPhone: e.target.value,
                              }))
                            }
                            placeholder="Enter email or phone"
                            className="pl-12 h-12 focus-visible:ring-0 focus-visible:border-blue-500/50 rounded-xl transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600  text-white font-semibold rounded-xl shadow-none hover:shadow-xl transform hover:scale-105 transition-all duration-400"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-12 border-0 shadow-none hover:bg-blue-600/10 bg-transparent rounded-xl transition-all duration-200 disabled:transform-none"
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="font-medium">
                          Continue with Google
                        </span>
                      </Button>
                    </form>
                  </div>
                )}

                {loginStep === "method-selection" && (
                  <div className="space-y-6 animate-slide-in-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleLoginMethodSelect("otp")}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 p-4 border-0 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Phone className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                        <span className="font-medium text-slate-700 group-hover:text-blue-700">
                          OTP
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoginMethodSelect("password")}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <Lock className="h-5 w-5" />
                        <span className="font-medium">Password</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        className="w-full h-12 text-sky-600 hover:text-sky-600 hover:bg-sky-600/10 rounded-xl transition-all duration-200"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    </div>
                  </div>
                )}

                {loginStep === "form" && (
                  <div className="space-y-6 animate-slide-in-right">
                    <form onSubmit={handleLoginComplete} className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            placeholder="Enter your password"
                            className="pl-12 pr-12 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:shadow-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Logging in...
                          </div>
                        ) : (
                          "Login"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        className="w-full h-12 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    </form>
                  </div>
                )}

                {loginStep === "otp-verification" && (
                  <div className="space-y-6 animate-slide-in-left">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25">
                        <ShieldQuestion className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        Enter Verification Code
                      </h2>
                      <div className="inline-flex items-center px-3 py-1 bg-slate-100 rounded-full">
                        <span className="text-sm text-slate-600">
                          OTP sent to:{" "}
                        </span>
                        <span className="ml-1 font-medium text-slate-900 truncate max-w-[150px]">
                          {loginData.emailOrPhone}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleLoginComplete} className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-slate-700 font-medium text-center block">
                          Enter 6-digit OTP
                        </Label>
                        <OTPInput
                          value={loginData.otp}
                          onChange={(value) =>
                            setLoginData((prev) => ({ ...prev, otp: value }))
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || loginData.otp.length !== 6}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:shadow-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying...
                          </div>
                        ) : (
                          "Verify & Login"
                        )}
                      </Button>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={goBack}
                          className="flex-1 h-12 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => sendOTP(loginData.emailOrPhone)}
                          disabled={isLoading}
                          className="flex-1 h-12 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200"
                        >
                          Resend OTP
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              // SIGNUP FLOW
              <div className="space-y-6">
                {signupStep === "initial" && (
                  <div className="space-y-6 animate-slide-in-right">
                    <div className="space-y-3">
                      {USER_TYPES.map((userType, index) => (
                        <button
                          key={userType.type}
                          type="button"
                          onClick={() => handleUserTypeSelect(userType.type)}
                          className="w-full p-4 pr-5 cursor-pointer rounded-4xl border-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group animate-fade-in-up bg-white/50 hover:bg-white"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${userType.color} flex items-center justify-center group-hover:rounded-4xl transition-all duration-500 shadow-lg`}
                            >
                              <userType.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-semibold text-slate-900 text-lg">
                                {userType.title}
                              </div>
                              <div className="text-slate-600 text-sm">
                                {userType.description}
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {signupStep === "form" && (
                  <div className="space-y-6 animate-slide-in-left">
                    <div className="text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full">
                        <span className="text-sm text-slate-600">
                          Signing up as:{" "}
                        </span>
                        <span className="ml-1 font-semibold text-slate-900">
                          {
                            USER_TYPES.find((t) => t.type === selectedUserType)
                              ?.title
                          }
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="name"
                            value={signupData.name}
                            onChange={(e) =>
                              setSignupData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Enter your full name"
                            className="pl-12 h-12 focus-visible:ring-0 focus-visible:border-blue-500/50 rounded-xl transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="signupEmailOrPhone"
                            value={signupData.emailOrPhone}
                            onChange={(e) =>
                              setSignupData((prev) => ({
                                ...prev,
                                emailOrPhone: e.target.value,
                              }))
                            }
                            placeholder="Enter email or phone"
                            className="pl-12 h-12 focus-visible:ring-0 focus-visible:border-blue-500/50 rounded-xl transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="signupPassword"
                            type={showPassword ? "text" : "password"}
                            value={signupData.password}
                            onChange={(e) =>
                              setSignupData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            placeholder="Create a password (min. 6 characters)"
                            className="pl-12 h-12 focus-visible:ring-0 focus-visible:border-blue-500/50 rounded-xl transition-all duration-200"
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600  text-white font-semibold rounded-xl shadow-none hover:shadow-xl transform hover:scale-105 transition-all duration-400"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending OTP...
                            </div>
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleGoogleLogin}
                          disabled={isLoading}
                          className="w-full h-12 border-0 shadow-none hover:bg-blue-600/10 bg-transparent rounded-xl transition-all duration-200 disabled:transform-none"
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          <span className="font-medium">
                            Continue with Google
                          </span>
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        className="w-full h-12 text-sky-600 hover:text-sky-600 hover:bg-sky-600/10 rounded-xl transition-all duration-200"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    </form>
                  </div>
                )}

                {signupStep === "otp-verification" && (
                  <div className="space-y-6 animate-slide-in-right">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        Verify Your Account
                      </h2>
                      <div className="inline-flex items-center px-3 py-1 bg-slate-100 rounded-full">
                        <span className="text-sm text-slate-600">
                          OTP sent to:{" "}
                        </span>
                        <span className="ml-1 font-medium text-slate-900 truncate max-w-[150px]">
                          {signupData.emailOrPhone}
                        </span>
                      </div>
                    </div>

                    <form
                      onSubmit={handleOtpVerification}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <Label className="text-slate-700 font-medium text-center block">
                          Enter 6-digit OTP
                        </Label>
                        <OTPInput
                          value={signupData.otp}
                          onChange={(value) =>
                            setSignupData((prev) => ({ ...prev, otp: value }))
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || signupData.otp.length !== 6}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:shadow-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating Account...
                          </div>
                        ) : (
                          "Verify & Create Account"
                        )}
                      </Button>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={goBack}
                          className="flex-1 h-12 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => sendOTP(signupData.emailOrPhone, true)}
                          disabled={isLoading}
                          className="flex-1 h-12 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200"
                        >
                          Resend OTP
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
