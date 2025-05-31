import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/sistema/toggle"
import Link from "next/link"


export default function Home() {
  return (
    <div>
      <div>
        <ModeToggle />
      </div>
      <div className=" min-h-screen flex justify-center items-center">
        <Link href={'/dashboard'}>Dashboard</Link>

      </div>
    </div>

  )
}