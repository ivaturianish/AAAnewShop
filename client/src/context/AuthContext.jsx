"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on initial render
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // In a real application, this would verify the token with your backend
        // Example: const response = await fetch('/api/auth/verify');

        // For demonstration, we'll check localStorage
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        if (token && userData) {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Login user
  const login = async (email, password) => {
    try {
      // In a real application, this would be an API call to your backend
      // Example: const response = await fetch('/api/auth/login', {...});

      // For demonstration, we'll simulate a successful login
      const userData = {
        id: "123",
        name: "John Doe",
        email: email,
      }

      // Store token and user data
      localStorage.setItem("token", "sample-token")
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Invalid credentials" }
    }
  }

  // Register user
  const register = async (name, email, password) => {
    try {
      // In a real application, this would be an API call to your backend
      // Example: const response = await fetch('/api/auth/register', {...});

      // For demonstration, we'll simulate a successful registration
      const userData = {
        id: "123",
        name: name,
        email: email,
      }

      // Store token and user data
      localStorage.setItem("token", "sample-token")
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Registration failed" }
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

