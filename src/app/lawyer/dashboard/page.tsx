"use client";

import {
  MousePointerClick,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

interface SelectServiceProps {
  onSelectService?: (service: string) => void;
}

export default function SelectService({ onSelectService }: SelectServiceProps) {
  const popularServices = [
    {
      name: "Xegality AI",
      description: "AI-powered legal assistant and document analysis",
      icon: Sparkles,
      value: "xegality-ai",
    },
    {
      name: "Case Management",
      description: "Organize, track, and manage all your legal cases",
      icon: LayoutDashboard,
      value: "cases",
    },
    {
      name: "Appointments",
      description: "Schedule, track, and manage meetings efficiently",
      icon: Clock,
      value: "appointments",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20">
            <MousePointerClick className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Welcome to Your Legal Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose a service below to start managing your legal practice more
          effectively.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
        {popularServices.map((service, index) => (
          <motion.div
            key={service.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            whileHover={{ scale: 1.03 }}
          >
            <Card
              onClick={() => onSelectService?.(service.value)}
              className="group cursor-pointer hover:shadow-xl transition-all border border-muted bg-background rounded-2xl"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {service.description}
                </p>
                <Button
                  variant="ghost"
                  className="justify-start p-0 hover:text-primary"
                  asChild
                >
                  <Link href={`dashboard/${service.value}`}>
                    Open <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-center"
      >
        <div className="p-3 rounded-full bg-primary/5 mb-3 inline-flex">
          <Sparkles className="h-5 w-5 text-primary/70" />
        </div>
        <h3 className="text-lg font-medium mb-1 text-foreground">
          Need Assistance?
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Use <strong>Xegality AI</strong> for smart legal help or visit{" "}
          <strong>Help & Support</strong> for guidance.
        </p>
      </motion.div>
    </div>
  );
}
