"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Phone, Mail, Globe, Users, Calendar, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function AdminOrganizationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const [orgData, setOrgData] = useState({
    name: "Senior Care Foundation",
    type: "NGO",
    description: "Dedicated to improving the lives of senior citizens through community programs and support services.",
    address: "123 Community Street, Delhi, India",
    phone: "+91 11 2345 6789",
    email: "info@seniorcare.org",
    website: "www.seniorcare.org",
    established: "2015",
    license: "NGO/2015/DEL/001234",
    logo: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useTranslation()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Organization Updated",
        description: "Your organization profile has been updated successfully.",
      })
    }, 1000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setOrgData({ ...orgData, logo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const stats = [
    { label: "Events Created", value: "89", icon: Calendar, color: "text-blue-600" },
    { label: "Total Participants", value: "2,456", icon: Users, color: "text-green-600" },
    { label: "Years Active", value: "9", icon: Award, color: "text-orange-600" },
    { label: "Community Rating", value: "4.8/5", icon: Award, color: "text-purple-600" },
  ]

  if (!isAuthenticated || user.role !== "admin") {
    return null
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Organization Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your organization information and settings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Organization Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Organization Details
                  </CardTitle>
                  <CardDescription>Update your organization information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="logo">Organization Logo</Label>
                      <div className="flex items-center gap-4">
                        <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} />
                        {orgData.logo && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden border">
                            <img
                              src={orgData.logo || "/placeholder.svg"}
                              alt="Organization logo"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Organization Name</Label>
                        <Input
                          id="name"
                          value={orgData.name}
                          onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Organization Type</Label>
                        <Input
                          id="type"
                          value={orgData.type}
                          onChange={(e) => setOrgData({ ...orgData, type: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={orgData.description}
                        onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Contact Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={orgData.address}
                          onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                          rows={2}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={orgData.phone}
                            onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={orgData.email}
                            onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={orgData.website}
                          onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Legal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Legal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="established">Year Established</Label>
                          <Input
                            id="established"
                            value={orgData.established}
                            onChange={(e) => setOrgData({ ...orgData, established: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license">License Number</Label>
                          <Input
                            id="license"
                            value={orgData.license}
                            onChange={(e) => setOrgData({ ...orgData, license: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Organization Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Preview</CardTitle>
                  <CardDescription>How your organization appears to users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    {orgData.logo ? (
                      <img
                        src={orgData.logo || "/placeholder.svg"}
                        alt="Organization logo"
                        className="w-20 h-20 rounded-lg mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Building className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <h3 className="font-semibold text-lg">{orgData.name}</h3>
                    <Badge variant="outline" className="mt-2">
                      {orgData.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{orgData.description}</p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{orgData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{orgData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{orgData.email}</span>
                    </div>
                    {orgData.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{orgData.website}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Organization Verified</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">License Verified</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contact Verified</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
