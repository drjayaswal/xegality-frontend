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

