import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const { itemCount } = useCart()

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-stone-600 hover:text-stone-900 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-stone-600 hover:text-stone-900 font-medium">
              Products
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-900 font-medium">
              About
            </Link>
          </nav>

          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

