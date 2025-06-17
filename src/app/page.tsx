import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <div className="container mt-20">
        Xegality Landing Page
      </div>
      <div className="flex gap-2">
        <Link href="/consumer">
          <Button>Visit Consumer homepage</Button>
        </Link>
        <Link href="/lawyer">
          <Button>Visit Lawyer homepage</Button>
        </Link>
        <Link href="/student">
          <Button>Visit Student homepage</Button>
        </Link>
      </div>
      <div className="flex gap-2 mt-4">
        <Link href="/consumer/dashboard">
          <Button>Visit Consumer dashboard</Button>
        </Link>
        <Link href="/lawyer/dashboard">
          <Button>Visit Lawyer dashboard</Button>
        </Link>
        <Link href="/student/dashboard">
          <Button>Visit Student dashboard</Button>
        </Link>
      </div>
    </>
  )
}

// "use client";

// import { useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Scale,
//   GraduationCap,
//   Users,
//   ArrowRight,
//   CheckCircle,
//   Star,
//   Shield,
//   Clock,
//   MessageCircle,
//   Award,
//   Sparkles,
//   Play,
//   Globe,
//   TrendingUp,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Link from "next/link";

// export default function LandingPage() {
//   const [activeUserType, setActiveUserType] = useState<string | null>(null);
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

//   const userTypes = [
//     {
//       id: "consumer",
//       title: "Individual Client",
//       description: "Get instant legal help and connect with verified lawyers",
//       icon: Users,
//       color: "from-blue-600 to-cyan-600",
//       bgColor: "from-blue-50 to-cyan-50",
//       features: [
//         "Find trusted lawyers instantly",
//         "Get personalized legal advice",
//         "Secure document sharing",
//         "24/7 consultation support",
//       ],
//       stats: { lawyers: "10,000+", cases: "50,000+", rating: "4.9" },
//       route: "/consumer",
//     },
//     {
//       id: "lawyer",
//       title: "Legal Professional",
//       description: "Streamline your practice with AI-powered tools",
//       icon: Scale,
//       color: "from-amber-600 to-orange-600",
//       bgColor: "from-amber-50 to-orange-50",
//       features: [
//         "AI-powered case management",
//         "Client communication tools",
//         "Document automation",
//         "Practice analytics",
//       ],
//       stats: { efficiency: "40%", clients: "500+", growth: "25%" },
//       route: "/lawyer",
//     },
//     {
//       id: "student",
//       title: "Law Student",
//       description: "Master legal concepts with AI-powered study tools",
//       icon: GraduationCap,
//       color: "from-emerald-600 to-green-600",
//       bgColor: "from-emerald-50 to-green-50",
//       features: [
//         "AI study planning",
//         "Legal writing assistant",
//         "Case brief generator",
//         "Exam preparation tools",
//       ],
//       stats: { students: "25,000+", success: "95%", resources: "1000+" },
//       route: "/student",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden py-20 lg:py-32">
//         {/* Animated Background */}
//         <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl animate-pulse"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//           <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
//         </motion.div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <motion.div
//             className="text-center max-w-5xl mx-auto"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Brand Header */}
//             <motion.div
//               className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-200 shadow-lg"
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
//                 <Scale className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Xegality
//               </span>
//               <div className="flex items-center space-x-1">
//                 <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                 <span className="text-sm font-medium text-gray-700">4.9</span>
//               </div>
//             </motion.div>

//             {/* Main Headline */}
//             <motion.h1
//               className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
//               variants={itemVariants}
//             >
//               Your AI-Powered{" "}
//               <motion.span
//                 className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
//                 animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
//                 transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//               >
//                 Legal Assistant
//               </motion.span>
//             </motion.h1>

//             <motion.p
//               className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto"
//               variants={itemVariants}
//             >
//               Whether you're seeking legal help, managing a practice, or
//               studying law - Xegality provides intelligent solutions tailored to
//               your needs.
//             </motion.p>

//             {/* User Type Selection */}
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
//               variants={containerVariants}
//             >
//               {userTypes.map((userType, index) => (
//                 <motion.div
//                   key={userType.id}
//                   variants={itemVariants}
//                   whileHover={{ y: -10, scale: 1.02 }}
//                   onHoverStart={() => setActiveUserType(userType.id)}
//                   onHoverEnd={() => setActiveUserType(null)}
//                   className="group cursor-pointer"
//                 >
//                   <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${userType.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//                     ></div>

//                     <CardContent className="relative p-8 h-full flex flex-col">
//                       {/* Icon */}
//                       <motion.div
//                         className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${userType.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
//                         whileHover={{ rotate: 360 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         <userType.icon className="w-8 h-8 text-white" />
//                       </motion.div>

//                       {/* Content */}
//                       <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                         {userType.title}
//                       </h3>
//                       <p className="text-gray-600 mb-6 flex-grow">
//                         {userType.description}
//                       </p>

//                       {/* Features */}
//                       <ul className="space-y-2 mb-6">
//                         {userType.features.map((feature, featureIndex) => (
//                           <motion.li
//                             key={feature}
//                             className="flex items-center text-sm text-gray-600"
//                             initial={{ opacity: 0, x: -20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{
//                               duration: 0.5,
//                               delay: featureIndex * 0.1,
//                             }}
//                             viewport={{ once: true }}
//                           >
//                             <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
//                             {feature}
//                           </motion.li>
//                         ))}
//                       </ul>

//                       {/* Stats */}
//                       <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
//                         {Object.entries(userType.stats).map(([key, value]) => (
//                           <div key={key} className="text-center">
//                             <div className="font-bold text-gray-900">
//                               {value}
//                             </div>
//                             <div className="text-xs text-gray-600 capitalize">
//                               {key}
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* CTA Button */}
//                       <Link href={userType.route}>
//                         <Button
//                           className={`w-full bg-gradient-to-r ${userType.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
//                         >
//                           Get Started
//                           <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                       </Link>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Statistics Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="grid grid-cols-2 md:grid-cols-4 gap-8"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             {[
//               { number: "35,000+", label: "Active Users", icon: Users },
//               { number: "50,000+", label: "Cases Resolved", icon: CheckCircle },
//               { number: "98%", label: "Success Rate", icon: TrendingUp },
//               { number: "24/7", label: "AI Support", icon: Clock },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 className="text-center"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <motion.div
//                   className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <stat.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <motion.h3
//                   className="text-3xl font-bold text-gray-900 mb-2"
//                   initial={{ scale: 0 }}
//                   whileInView={{ scale: 1 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   {stat.number}
//                 </motion.h3>
//                 <p className="text-gray-600">{stat.label}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose Xegality?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Experience the future of legal services with our AI-powered
//               platform
//             </p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {[
//               {
//                 icon: Sparkles,
//                 title: "AI-Powered Intelligence",
//                 description:
//                   "Advanced AI algorithms provide personalized legal insights and recommendations",
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 icon: Shield,
//                 title: "Secure & Confidential",
//                 description:
//                   "Bank-level security ensures your legal matters remain completely private",
//                 color: "from-green-500 to-emerald-500",
//               },
//               {
//                 icon: Clock,
//                 title: "24/7 Availability",
//                 description:
//                   "Get legal help whenever you need it, day or night, with instant responses",
//                 color: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: Award,
//                 title: "Expert Network",
//                 description:
//                   "Access to verified legal professionals across all practice areas",
//                 color: "from-amber-500 to-orange-500",
//               },
//               {
//                 icon: MessageCircle,
//                 title: "Multi-Channel Support",
//                 description:
//                   "Chat, voice, video, or in-person consultations - choose what works for you",
//                 color: "from-indigo-500 to-purple-500",
//               },
//               {
//                 icon: Globe,
//                 title: "Global Reach",
//                 description:
//                   "Legal expertise available across multiple jurisdictions and languages",
//                 color: "from-teal-500 to-green-500",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-500 group"
//                 variants={itemVariants}
//                 whileHover={{ y: -10, scale: 1.02 }}
//               >
//                 <motion.div
//                   className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Trusted by Thousands
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               See what our users say about their Xegality experience
//             </p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Small Business Owner",
//                 type: "Consumer",
//                 rating: 5,
//                 review:
//                   "Xegality helped me resolve my contract dispute quickly and affordably. The AI recommendations were spot-on!",
//                 image: "/placeholder.svg?height=60&width=60",
//               },
//               {
//                 name: "Michael Chen",
//                 role: "Partner at Chen & Associates",
//                 type: "Lawyer",
//                 rating: 5,
//                 review:
//                   "The practice management tools have transformed our firm's efficiency. We've increased productivity by 40%.",
//                 image: "/placeholder.svg?height=60&width=60",
//               },
//               {
//                 name: "Emily Rodriguez",
//                 role: "3L Law Student",
//                 type: "Student",
//                 rating: 5,
//                 review:
//                   "The study tools and case brief generator helped me ace my constitutional law exam. Incredible AI assistance!",
//                 image: "/placeholder.svg?height=60&width=60",
//               },
//             ].map((review, index) => (
//               <motion.div
//                 key={review.name}
//                 variants={itemVariants}
//                 whileHover={{ y: -5, scale: 1.02 }}
//               >
//                 <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
//                   <CardContent className="p-8">
//                     <div className="flex items-center mb-4">
//                       {[...Array(review.rating)].map((_, i) => (
//                         <motion.div
//                           key={i}
//                           initial={{ opacity: 0, scale: 0 }}
//                           whileInView={{ opacity: 1, scale: 1 }}
//                           transition={{ duration: 0.3, delay: i * 0.1 }}
//                           viewport={{ once: true }}
//                         >
//                           <Star className="w-5 h-5 text-yellow-500 fill-current" />
//                         </motion.div>
//                       ))}
//                     </div>
//                     <p className="text-gray-700 mb-6 italic">
//                       "{review.review}"
//                     </p>
//                     <div className="flex items-center">
//                       <motion.div whileHover={{ scale: 1.1 }}>
//                         <Avatar className="w-12 h-12 mr-4">
//                           <AvatarImage
//                             src={review.image || "/placeholder.svg"}
//                             alt={review.name}
//                           />
//                           <AvatarFallback>
//                             {review.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                       </motion.div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">
//                           {review.name}
//                         </h4>
//                         <p className="text-sm text-gray-600">{review.role}</p>
//                         <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
//                           {review.type}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 relative overflow-hidden">
//         <motion.div
//           className="absolute inset-0 bg-black/20"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//         />
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             className="text-center max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Ready to Transform Your Legal Experience?
//             </h2>
//             <p className="text-xl text-blue-100 mb-8">
//               Join thousands who have already discovered the power of
//               AI-assisted legal services
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   size="lg"
//                   className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4"
//                 >
//                   <Play className="w-5 h-5 mr-2" />
//                   Watch Demo
//                 </Button>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4"
//                 >
//                   Start Free Trial
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
