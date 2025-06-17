import { Button } from "@/components/ui/button"
import Link from "next/link"

const ADPage = () => {
  return (
    <div>
      you can't access this page, you must know your limits
      <Button className="ml-10" asChild><Link href="/">Go Home</Link></Button>
    </div>
  )
}

export default ADPage
