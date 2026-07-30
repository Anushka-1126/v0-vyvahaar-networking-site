"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Star, TrendingUp, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("vyavahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      setUser(userData)
      setIsAuthenticated(true)

      // Redirect if not admin
      if (userData.role !== "admin") {
        router.push("/")
        return
      }
    } else {
      router.push("/auth/login")
    }
  }, [router])

  if (!isAuthenticated || user.role !== "admin") {
    return null
  }

  const stats = [
    {
      title: t("totalUsers"),
      value: "1,234",
      icon: Users,
      change: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: t("totalEvents"),
      value: "89",
      icon: Calendar,
      change: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: t("totalReviews"),
      value: "456",
      icon: Star,
      change: "+15%",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      title: t("activeUsers"),
      value: "892",
      icon: TrendingUp,
      change: "+5%",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ]

  const quickActions = [
    {
      title: t("createNewEvent"),
      description: "Create and publish new events for the community",
      icon: Plus,
      href: "/admin/create-event",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: t("manageUsers"),
      description: "View and manage user accounts and profiles",
      icon: Users,
      href: "/admin/users",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: t("viewReports"),
      description: "Access detailed analytics and reports",
      icon: BarChart3,
      href: "/admin/reports",
      color: "bg-green-600 hover:bg-green-700",
    },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("adminWelcome")}</h1>
            <p className="text-gray-600 dark:text-gray-300">{t("adminDescription")}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full text-white ${action.color}`}>
                          <action.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Latest events created by your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Morning Yoga Session", date: "Today", attendees: 25 },
                    { name: "Cultural Music Evening", date: "Tomorrow", attendees: 45 },
                    { name: "Health Camp", date: "Jan 20", attendees: 80 },
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{event.attendees}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">attendees</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Latest reviews from community members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Rajesh Kumar", rating: 5, comment: "Excellent yoga session!" },
                    { user: "Sunita Sharma", rating: 5, comment: "Great community events." },
                    { user: "Mohan Patel", rating: 4, comment: "Very well organized." },
                  ].map((review, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{review.user}</p>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
