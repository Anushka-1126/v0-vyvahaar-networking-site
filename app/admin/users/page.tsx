"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/translations"

export default function AdminUsersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("vyavahaar_auth")
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

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      age: 65,
      city: "Delhi",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sunita Sharma",
      email: "sunita@example.com",
      phone: "+91 87654 32109",
      age: 58,
      city: "Mumbai",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mohan Patel",
      email: "mohan@example.com",
      phone: "+91 76543 21098",
      age: 72,
      city: "Ahmedabad",
      status: "inactive",
      joinDate: "2023-12-20",
      lastActive: "2024-01-05",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Lakshmi Reddy",
      email: "lakshmi@example.com",
      phone: "+91 65432 10987",
      age: 61,
      city: "Hyderabad",
      status: "active",
      joinDate: "2024-01-08",
      lastActive: "2024-01-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Ramesh Singh",
      email: "ramesh@example.com",
      phone: "+91 54321 09876",
      age: 69,
      city: "Jaipur",
      status: "suspended",
      joinDate: "2023-11-15",
      lastActive: "2024-01-12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Suspended</Badge>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage and monitor user accounts</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">1,089</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">New This Month</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">145</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Suspended</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                  <UserX className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Search and filter user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users by name, email, or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-orange-200 text-orange-700">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>Age: {user.age}</span>
                          <span>City: {user.city}</span>
                          <span>Joined: {user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(user.status)}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
