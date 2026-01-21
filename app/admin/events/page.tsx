"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/translations"

export default function AdminEventsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("vyvahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      setUser(userData)
      setIsAuthenticated(true)

      if (userData.role !== "admin") {
        router.push("/")
        return
      }
    } else {
      router.push("/auth/login")
    }
  }, [router])

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Morning Yoga Session",
      description: "Start your day with peaceful yoga and meditation",
      date: "2024-01-25",
      time: "07:00",
      location: "Community Center, Delhi",
      category: "Health & Wellness",
      maxAttendees: 30,
      currentAttendees: 25,
      status: "published",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Cultural Music Evening",
      description: "Enjoy classical Indian music performances",
      date: "2024-01-26",
      time: "18:00",
      location: "Auditorium, Mumbai",
      category: "Arts & Culture",
      maxAttendees: 100,
      currentAttendees: 45,
      status: "published",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Health Awareness Camp",
      description: "Free health checkups and consultations",
      date: "2024-01-28",
      time: "09:00",
      location: "Medical Center, Bangalore",
      category: "Health & Wellness",
      maxAttendees: 80,
      currentAttendees: 12,
      status: "draft",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Cooking Workshop",
      description: "Learn traditional recipes and cooking techniques",
      date: "2024-01-30",
      time: "15:00",
      location: "Cooking Studio, Pune",
      category: "Learning",
      maxAttendees: 20,
      currentAttendees: 18,
      status: "published",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Published</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Draft</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!isAuthenticated || user.role !== "admin") {
    return null
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Management</h1>
              <p className="text-gray-600 dark:text-gray-300">Create and manage community events</p>
            </div>
            <Link href="/admin/create-event">
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Events</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{events.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Published</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {events.filter((e) => e.status === "published").length}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Attendees</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {events.reduce((sum, event) => sum + event.currentAttendees, 0)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Drafts</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {events.filter((e) => e.status === "draft").length}
                    </p>
                  </div>
                  <Edit className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">{getStatusBadge(event.status)}</div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.currentAttendees}/{event.maxAttendees} attendees
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <Badge variant="outline">{event.category}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
