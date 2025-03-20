import type { FC } from "react"
import Link from "next/link"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link href="/" className={`block ${className}`}>
      <div className="flex items-center">
        <div className="bg-stone-800 text-white font-bold text-xl rounded-md px-3 py-2 mr-2 shadow-sm border border-stone-700">
          <span className="tracking-tighter">AAA</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-stone-900">Supplements</span>
      </div>
    </Link>
  )
}

export default Logo

