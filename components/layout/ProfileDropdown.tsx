"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, ShoppingBag, LogOut } from "lucide-react"
import "./ProfileDropdown.css"

interface ProfileDropdownProps {
  userName: string
}

export default function ProfileDropdown({ userName }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      // Refresh the page to update auth state
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button className="profile-button" onClick={toggleDropdown}>
        <User size={20} />
        <span className="profile-name">{userName}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <span>Hello, {userName}</span>
          </div>

          <div className="dropdown-items">
            <Link href="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
              <User size={16} />
              <span>Profile</span>
            </Link>

            <Link href="/profile/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
              <ShoppingBag size={16} />
              <span>Order History</span>
            </Link>

            <button className="dropdown-item logout-button" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

