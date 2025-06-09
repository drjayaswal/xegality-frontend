"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Star,
  Filter,
  Clock,
  Award,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Play,
  Quote,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export default function FindLawyers() {
  const [searchRange, setSearchRange] = useState("")
  const [concern, setConcern] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("quick-connect")
  const [filters, setFilters] = useState({
    specialization: "",
    city: "",
    gender: "",
    experience: [0, 20],
    language: "",
    feeRange: [0, 10000],
    consultationMode: [],
  })

  const handleQuickConnect = async () => {
    setIsSearching(true)
    setTimeout(() => {
      setSearchResults(mockLawyers.slice(0, 5))
      setIsSearching(false)
    }, 2000)
  }

  const handleSpecializedSearch = () => {
    setSearchResults(mockLawyers)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              India's Most Advanced Lawyer Search Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Expert <span className="text-yellow-300">Lawyers</span>
              <br />
              In Seconds
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connect with verified lawyers across India using our revolutionary Quick Connect feature or browse through
              our comprehensive directory
            </p>

            {/* Quick Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Describe your legal issue (e.g., property dispute, divorce, business contract)"
                  className="pl-12 pr-32 h-14 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl"
                />
                <Button className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold">
                  Quick Connect
                </Button>
              </div>

              {/* Quick Categories */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {quickCategories.map((category) => (
                  <Badge
                    key={category}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 cursor-pointer transition-all"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Legal Match</h2>
              <p className="text-gray-600">Choose your preferred search method</p>
            </div>
            <TabsList className="grid w-full lg:w-auto grid-cols-2 bg-gray-100 p-1 mt-4 lg:mt-0 h-14">
              <TabsTrigger
                value="quick-connect"
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white px-6 py-3"
              >
                <Zap className="h-4 w-4" />
                <span>Quick Connect</span>
                <Badge className="bg-yellow-400 text-yellow-900 text-xs ml-2">NEW</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="specialized-search"
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white px-6 py-3"
              >
                <Target className="h-4 w-4" />
                <span>Advanced Search</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Quick Connect Tab */}
          <TabsContent value="quick-connect">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Quick Connect Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden pt-0">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Quick Connect</h3>
                        <p className="text-orange-100">Get matched with lawyers instantly</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Search Range</label>
                        <Select value={searchRange} onValueChange={setSearchRange}>
                          <SelectTrigger className="w-full h-12 bg-white border-gray-200 shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="district">Within District</SelectItem>
                            <SelectItem value="city">Within City</SelectItem>
                            <SelectItem value="state">Within State</SelectItem>
                            <SelectItem value="country">Across Country</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Describe Your Legal Concern
                        </label>
                        <Textarea
                          placeholder="Tell us about your legal issue in detail. For example: 'I need help with a property dispute with my neighbor regarding boundary issues' or 'Looking for assistance with divorce proceedings and child custody matters'"
                          value={concern}
                          onChange={(e) => setConcern(e.target.value)}
                          className="min-h-[140px] bg-white border-gray-200 shadow-sm resize-none text-base"
                        />
                        <div className="text-xs text-gray-500 mt-2">
                          Be specific about your situation for better lawyer matching
                        </div>
                      </div>

                      <Button
                        onClick={handleQuickConnect}
                        disabled={!concern.trim() || isSearching}
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg shadow-lg"
                      >
                        {isSearching ? (
                          <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Connecting with lawyers...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <Zap className="h-5 w-5" />
                            <span>Start Quick Connect</span>
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Connect Benefits */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 text-orange-500 mr-2" />
                      Why Quick Connect?
                    </h4>
                    <div className="space-y-4">
                      {quickConnectBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">{benefit.title}</div>
                            <div className="text-sm text-gray-600">{benefit.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">How It Works</h4>
                      <p className="text-sm text-gray-600 mb-4">Watch our 2-minute guide to Quick Connect</p>
                      <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Connect Results */}
            {searchResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Available Lawyers</h3>
                    <p className="text-gray-600">Top {searchResults.length} lawyers ready to help you now</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Instant Response
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((lawyer) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} isQuickConnect={true} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Specialized Search Tab */}
          <TabsContent value="specialized-search">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg sticky top-4 pt-0 rounded-lg overflow-y-scroll">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <div className="flex items-center space-x-2 text-white">
                      <Filter className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Filters</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Specialization */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                        <Select
                          value={filters.specialization}
                          onValueChange={(value) => setFilters({ ...filters, specialization: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="criminal">Criminal Law</SelectItem>
                            <SelectItem value="corporate">Corporate Law</SelectItem>
                            <SelectItem value="family">Family Law</SelectItem>
                            <SelectItem value="property">Property Law</SelectItem>
                            <SelectItem value="civil">Civil Law</SelectItem>
                            <SelectItem value="tax">Tax Law</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <Input placeholder="Enter city name" className="w-full" />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                        <Select
                          value={filters.gender}
                          onValueChange={(value) => setFilters({ ...filters, gender: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="any">Any</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Experience */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Experience: {filters.experience[0]} - {filters.experience[1]} years
                        </label>
                        <Slider
                          value={filters.experience}
                          onValueChange={(value) => setFilters({ ...filters, experience: value })}
                          max={30}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Language */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                        <Select
                          value={filters.language}
                          onValueChange={(value) => setFilters({ ...filters, language: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="bengali">Bengali</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                            <SelectItem value="telugu">Telugu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Fee Range */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Fee Range: ₹{filters.feeRange[0]} - ₹{filters.feeRange[1]}
                        </label>
                        <Slider
                          value={filters.feeRange}
                          onValueChange={(value) => setFilters({ ...filters, feeRange: value })}
                          max={20000}
                          step={500}
                          className="w-full"
                        />
                      </div>

                      {/* Consultation Mode */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Consultation Mode</label>
                        <div className="space-y-3">
                          {["In-person", "Video Call", "Phone Call", "Chat"].map((mode) => (
                            <div key={mode} className="flex items-center space-x-2">
                              <Checkbox id={mode} />
                              <label htmlFor={mode} className="text-sm text-gray-700">
                                {mode}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={handleSpecializedSearch}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        Search Lawyers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Results */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">All Lawyers ({mockLawyers.length})</h3>
                    <p className="text-gray-600">Your search for "Property lawyers" has {mockLawyers.length} results</p>
                  </div>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Sort by Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="experience">Most Experienced</SelectItem>
                      <SelectItem value="fee-low">Lowest Fee</SelectItem>
                      <SelectItem value="fee-high">Highest Fee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  {mockLawyers.map((lawyer) => (
                    <LawyerCardDetailed key={lawyer.id} lawyer={lawyer} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">Real experiences from people who found their perfect legal match</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-blue-500 mb-4" />
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.case}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Legal Expert?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied clients who found the perfect lawyer for their needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
            >
              <Zap className="h-5 w-5 mr-2" />
              Try Quick Connect
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Browse All Lawyers
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LawyerCard({ lawyer, isQuickConnect }: { lawyer: any; isQuickConnect: boolean }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-blue-100">
            <AvatarImage src={lawyer.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
              {lawyer.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-gray-900">{lawyer.name}</h4>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{lawyer.rating}</span>
              </div>
            </div>
            <p className="text-blue-600 font-semibold text-sm">{lawyer.specialization}</p>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Award className="h-3 w-3" />
                <span>{lawyer.experience} years</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{lawyer.location}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lawyer.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {lawyer.languages.slice(0, 3).map((lang: string) => (
            <Badge key={lang} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
              {lang}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-bold text-gray-900">₹{lawyer.consultationFee}</span>
            <span className="text-sm text-gray-500">/consultation</span>
          </div>
          {isQuickConnect && (
            <Badge className="bg-green-100 text-green-800">
              <Clock className="h-3 w-3 mr-1" />
              Available now
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center space-x-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
          >
            <MessageCircle className="h-3 w-3" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center space-x-1 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span className="text-xs">Call</span>
          </Button>
          <Button
            size="sm"
            className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            <Calendar className="h-3 w-3" />
            <span className="text-xs">Book</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LawyerCardDetailed({ lawyer }: { lawyer: any }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          <Avatar className="h-20 w-20 border-2 border-blue-100">
            <AvatarImage src={lawyer.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg">
              {lawyer.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{lawyer.name}</h4>
                <p className="text-blue-600 font-semibold mb-2">{lawyer.specialization}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>{lawyer.experience} years experience</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{lawyer.rating}</span>
                    <span className="text-gray-500">({lawyer.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">₹{lawyer.consultationFee}</div>
                <div className="text-sm text-gray-500">per consultation</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{lawyer.bio}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {lawyer.languages.map((lang: string) => (
                  <Badge key={lang} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                    {lang}
                  </Badge>
                ))}
                {lawyer.specialties?.map((specialty: string) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-700">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-green-50 hover:text-green-700">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mock data and constants
const quickCategories = [
  "Property Dispute",
  "Divorce & Family",
  "Business Contract",
  "Criminal Defense",
  "Tax Issues",
  "Employment Law",
]

const stats = [
  { value: "50,000+", label: "Verified Lawyers" },
  { value: "2M+", label: "Cases Resolved" },
  { value: "500+", label: "Cities Covered" },
  { value: "4.8★", label: "Average Rating" },
]

const quickConnectBenefits = [
  {
    title: "Instant Matching",
    description: "Get connected with relevant lawyers in under 2 minutes",
  },
  {
    title: "Pre-screened Lawyers",
    description: "All lawyers are verified and background checked",
  },
  {
    title: "Best Price Guarantee",
    description: "Compare quotes and get the best rates",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance for urgent legal matters",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    case: "Property Dispute",
    content:
      "Quick Connect helped me find an excellent property lawyer within minutes. The whole process was seamless and professional.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Rajesh Kumar",
    case: "Business Contract",
    content:
      "I was amazed by how quickly I got responses from qualified lawyers. Found the perfect match for my business needs.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Anita Patel",
    case: "Family Law",
    content:
      "The platform made finding a compassionate family lawyer so easy. Highly recommend the Quick Connect feature.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockLawyers = [
  {
    id: 1,
    name: "Advocate Priya Sharma",
    specialization: "Corporate Law",
    experience: 12,
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    reviews: 156,
    consultationFee: 2500,
    bio: "Experienced corporate lawyer specializing in mergers, acquisitions, and business compliance. Helped 500+ companies with legal matters including IPOs, joint ventures, and regulatory compliance.",
    languages: ["English", "Hindi", "Marathi"],
    specialties: ["M&A", "IPO", "Compliance"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Advocate Rajesh Kumar",
    specialization: "Criminal Law",
    experience: 15,
    location: "Delhi, NCR",
    rating: 4.9,
    reviews: 203,
    consultationFee: 3000,
    bio: "Senior criminal defense attorney with extensive experience in high-profile cases. Known for strategic defense planning and has successfully defended clients in complex criminal matters.",
    languages: ["English", "Hindi", "Punjabi"],
    specialties: ["White Collar Crime", "Cyber Crime", "Appeals"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Advocate Meera Patel",
    specialization: "Family Law",
    experience: 8,
    location: "Ahmedabad, Gujarat",
    rating: 4.7,
    reviews: 89,
    consultationFee: 1800,
    bio: "Compassionate family law attorney specializing in divorce, custody, and domestic relations. Focuses on amicable resolutions and has helped hundreds of families navigate difficult times.",
    languages: ["English", "Hindi", "Gujarati"],
    specialties: ["Divorce", "Child Custody", "Domestic Violence"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Advocate Vikram Singh",
    specialization: "Property Law",
    experience: 10,
    location: "Bangalore, Karnataka",
    rating: 4.6,
    reviews: 134,
    consultationFee: 2200,
    bio: "Property law expert with deep knowledge of real estate transactions, property disputes, and land acquisition matters. Specializes in both residential and commercial property issues.",
    languages: ["English", "Hindi", "Kannada"],
    specialties: ["Real Estate", "Land Disputes", "RERA"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Advocate Anita Reddy",
    specialization: "Tax Law",
    experience: 14,
    location: "Hyderabad, Telangana",
    rating: 4.8,
    reviews: 167,
    consultationFee: 2800,
    bio: "Tax law specialist with expertise in GST, income tax, and corporate taxation. Helped numerous businesses with tax compliance, audits, and dispute resolution with tax authorities.",
    languages: ["English", "Hindi", "Telugu"],
    specialties: ["GST", "Income Tax", "Tax Planning"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Advocate Suresh Nair",
    specialization: "Civil Law",
    experience: 18,
    location: "Kochi, Kerala",
    rating: 4.9,
    reviews: 245,
    consultationFee: 3200,
    bio: "Veteran civil litigation attorney with extensive courtroom experience. Specializes in contract disputes, civil rights cases, and has appeared before High Courts and Supreme Court.",
    languages: ["English", "Hindi", "Malayalam"],
    specialties: ["Contract Law", "Civil Rights", "Litigation"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
]
