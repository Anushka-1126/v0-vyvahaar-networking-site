"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  User,
  Sun,
  Moon,
  Plus,
  Building,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VoiceAssistant } from "@/components/voice-assistant"
import { LanguageSelector } from "@/components/language-selector"
import { useTheme } from "next-themes"
import { useTranslation } from "@/lib/translations"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [user, setUser] = useState({ name: "Guest User", avatar: "", initials: "GU", role: "user" })
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setMounted(true)
    // Load user data
    const authStatus = localStorage.getItem("vyavahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      setUser(userData)
    }
  }, [])

  // Different menu items for user and admin (removed logout, added support)
  const userMenuItems = [
    { icon: Home, label: t("home"), href: "/", badge: null },
    { icon: Users, label: t("connect"), href: "/connect", badge: "12" },
    { icon: Calendar, label: t("events"), href: "/events", badge: "3" },
    { icon: MessageSquare, label: t("messages"), href: "/messages", badge: "5" },
    { icon: Settings, label: t("settings"), href: "/settings", badge: null },
  ]

  const adminMenuItems = [
    { icon: Home, label: t("dashboard"), href: "/admin", badge: null },
    { icon: Plus, label: t("createEvent"), href: "/admin/create-event", badge: null },
    { icon: Calendar, label: t("manageEvents"), href: "/admin/events/manage", badge: "8" },
    { icon: Building, label: t("organization"), href: "/admin/organization", badge: null },
    { icon: Users, label: t("users"), href: "/admin/users", badge: "156" },
    { icon: Settings, label: t("settings"), href: "/settings", badge: null },
  ]

  const menuItems = user.role === "admin" ? adminMenuItems : userMenuItems

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-orange-200 dark:border-orange-800">
          <SidebarHeader className="p-6 border-b border-orange-200 dark:border-orange-800">
            <Link href={user.role === "admin" ? "/admin" : "/"} className="flex items-center gap-3">
              <Image src="/logo.png" alt="Vyavahaar" width={40} height={40} className="rounded-lg" />
              <div>
                <h2 className="text-xl font-bold text-orange-600">Vyavahaar</h2>
                {user.role === "admin" && <p className="text-xs text-orange-500 font-medium">Admin Panel</p>}
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start gap-3 p-3 hover:bg-orange-50 dark:hover:bg-orange-950/50"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-base">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-600">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-orange-200 dark:border-orange-800">
            <Link href="/profile">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/50 hover:bg-orange-100 dark:hover:bg-orange-950/70 transition-colors cursor-pointer">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-orange-200 text-orange-700">{user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                <User className="w-4 h-4 text-orange-600" />
              </div>
            </Link>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="hidden md:flex items-center gap-2">
                  <LanguageSelector />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/support">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("support")}</span>
                  </Button>
                </Link>
                <VoiceAssistant />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
