"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  Clock,
  MapPin,
  User,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Video,
  Phone,
  X,
  Check,
} from "lucide-react";
import SiriWave from "@/components/ui/ai";

interface Appointment {
  id: string;
  title: string;
  client: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: "in-person" | "video" | "phone";
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");

  // Sample appointments data
  const appointments: Appointment[] = [
    {
      id: "apt-1",
      title: "Initial Consultation",
      client: "Sarah Johnson",
      date: new Date(2023, 5, 15, 10, 0),
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      location: "Office 302, Law Building",
      type: "in-person",
      status: "upcoming",
      notes:
        "Client wants to discuss merger documents and potential legal implications.",
    },
    {
      id: "apt-2",
      title: "Contract Review",
      client: "Michael Chen",
      date: new Date(2023, 5, 15, 13, 0),
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      location: "Zoom Meeting",
      type: "video",
      status: "upcoming",
    },
    {
      id: "apt-3",
      title: "Case Strategy Discussion",
      client: "Emily Rodriguez",
      date: new Date(2023, 5, 15, 15, 30),
      startTime: "3:30 PM",
      endTime: "4:30 PM",
      location: "Phone Call",
      type: "phone",
      status: "upcoming",
      notes:
        "Prepare summary of recent court filings and potential next steps.",
    },
    {
      id: "apt-4",
      title: "Document Signing",
      client: "David Wilson",
      date: new Date(2023, 5, 16, 11, 0),
      startTime: "11:00 AM",
      endTime: "11:30 AM",
      location: "Office 302, Law Building",
      type: "in-person",
      status: "upcoming",
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.title.toLowerCase().includes(searchQuery.toLowerCase());

    // For day view, only show appointments on the selected date
    if (viewMode === "day") {
      const sameDate = apt.date.toDateString() === selectedDate.toDateString();
      return matchesSearch && sameDate;
    }

    // For week view, show appointments within the week
    if (viewMode === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const isInWeek = apt.date >= startOfWeek && apt.date <= endOfWeek;
      return matchesSearch && isInWeek;
    }

    // For month view, show appointments within the month
    const sameMonth =
      apt.date.getMonth() === selectedDate.getMonth() &&
      apt.date.getFullYear() === selectedDate.getFullYear();
    return matchesSearch && sameMonth;
  });

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "in-person":
        return <User className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "completed":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const changeDate = (amount: number) => {
    const newDate = new Date(selectedDate);

    if (viewMode === "day") {
      newDate.setDate(selectedDate.getDate() + amount);
    } else if (viewMode === "week") {
      newDate.setDate(selectedDate.getDate() + amount * 7);
    } else if (viewMode === "month") {
      newDate.setMonth(selectedDate.getMonth() + amount);
    }

    setSelectedDate(newDate);
  };

  const getDateRangeText = () => {
    if (viewMode === "day") {
      return formatDate(selectedDate);
    } else if (viewMode === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    } else {
      return selectedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div className=" h-full dark:bg-black bg-gray-50 shadow-lg border-[1.5px] rounded-lg">
      <div className="w-full h-full rounded-lg overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="relative h-24 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-fit flex items-center justify-center opacity-60">
              <SiriWave
                isWaveMode={false}
                colors={[
                  "#334155", // slate-700
                  "#1e293b", // slate-800
                  "#ca8a04", // amber-600
                  "#b45309", // amber-700
                ]}
              />
            </div>
          </div>
        </div>
        {/* Calendar Controls */}
        <div className=" border-b border-white/20 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => changeDate(-1)}
                className="h-8 w-8 rounded-full shadow-sm border-0"
              >
                <ChevronLeft className="h-10 w-10" />
              </Button>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white min-w-[200px] text-center">
                {getDateRangeText()}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => changeDate(1)}
                className="h-8 w-8 rounded-full shadow-sm border-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="ml-2 bg-gray-50 rounded-4xl border-transparent shadow-none"
              >
                Today
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-full overflow-hidden border-0">
                <Button
                  variant={viewMode === "day" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("day")}
                  className={cn(
                    "rounded-none text-amber-700 hover:bg-amber-700/40 hover:text-white",
                    viewMode === "day"
                      ? "text-white bg-amber-700 hover:bg-amber-700"
                      : ""
                  )}
                >
                  Day
                </Button>
                <Button
                  variant={viewMode === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                  className={cn(
                    "rounded-none text-amber-700 hover:bg-amber-700/40 hover:text-white",
                    viewMode === "week"
                      ? "text-white bg-amber-700 hover:bg-amber-700"
                      : ""
                  )}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("month")}
                  className={cn(
                    "rounded-none text-amber-700 hover:bg-amber-700/40 hover:text-white",
                    viewMode === "month"
                      ? "text-white bg-amber-700 hover:bg-amber-700"
                      : ""
                  )}
                >
                  Month
                </Button>
              </div>

              <Button className="text-amber-700 bg-amber-700/20 hover:bg-amber-700 shadow-none hover:text-white ml-2">
                <Plus className="h-4 w-4 mr-2" /> New Appointment
              </Button>
            </div>
          </div>

          <div className="mt-4 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 text-left focus-visible:ring-0 border-1 border-amber-700/40 focus-visible:border-amber-700/40 transition-all duration-150 dark:placeholder:text-white/40 placeholder:text-black/40"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="flex-1 p-6">
          <ScrollArea className="h-full">
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={cn(
                      "bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden opacity-0 transform translate-y-4 transition-all duration-300 ease-out",
                      selectedAppointment === appointment.id
                        ? "ring-2 ring-amber-700"
                        : "",
                      "animate-fade-in"
                    )}
                    onClick={() =>
                      setSelectedAppointment(
                        appointment.id === selectedAppointment
                          ? null
                          : appointment.id
                      )
                    }
                    style={{
                      animationDelay: `${
                        filteredAppointments.indexOf(appointment) * 100
                      }ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="p-4 cursor-pointer">
                      <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-700 dark:bg-amber-700/50 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-amber-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-white">
                              {appointment.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              with {appointment.client}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 ml-auto md:ml-0">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                            <Clock className="h-4 w-4" />
                            <span>
                              {appointment.startTime} - {appointment.endTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>

                          <div
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1",
                              getAppointmentStatusColor(appointment.status)
                            )}
                          >
                            {getAppointmentTypeIcon(appointment.type)}
                            <span className="capitalize">
                              {appointment.type}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 ml-auto"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {selectedAppointment === appointment.id &&
                        appointment.notes && (
                          <div
                            className="mt-4 pt-4 border-t border-white/20 overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                              maxHeight:
                                selectedAppointment === appointment.id
                                  ? "500px"
                                  : "0",
                              opacity:
                                selectedAppointment === appointment.id ? 1 : 0,
                            }}
                          >
                            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                              Notes
                            </h4>
                            <p className="text-gray-800 dark:text-white">
                              {appointment.notes}
                            </p>

                            <div className="flex gap-2 mt-4 justify-end">
                              <Button
                                variant="outline"
                                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <X className="h-4 w-4" /> Cancel
                              </Button>
                              <Button variant="outline" className="gap-2">
                                <Clock className="h-4 w-4" /> Reschedule
                              </Button>
                              <Button className="bg-amber-700 hover:bg-amber-700 gap-2">
                                <Check className="h-4 w-4" /> Confirm
                              </Button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : `You don't have any appointments ${
                        viewMode === "day" ? "today" : "scheduled"
                      }`}
                </p>
                <Button className="text-amber-700 bg-amber-700/20 hover:bg-amber-700 hover:text-white mt-4 shadow-none">
                  <Plus className="h-4 w-4 mr-2" /> Schedule Appointment
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
