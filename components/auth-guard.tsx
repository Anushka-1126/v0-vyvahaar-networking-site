"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const publicRoutes = ["/auth/login", "/auth/signup", "/legal"]

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("vyvahaar_auth")

      if (!authStatus && !publicRoutes.includes(pathname)) {
        router.push("/auth/login")
        return
      }

      if (authStatus) {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null
  }

  return <>{children}</>
}
