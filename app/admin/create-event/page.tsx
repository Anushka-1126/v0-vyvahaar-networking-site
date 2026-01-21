"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function CreateEventPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxAttendees: "",
    image: "",
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

  const categories = [
    "Health & Wellness",
    "Arts & Culture",
    "Learning",
    "Outdoor",
    "Social",
    "Spiritual",
    "Technology",
    "Sports",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate event creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Event Created Successfully",
        description: `${eventData.title} has been created and published.`,
      })
      router.push("/admin/events")
    }, 1000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEventData({ ...eventData, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isAuthenticated || user.role !== "admin") {
    return null
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("createEventTitle")}</h1>
            <p className="text-gray-600 dark:text-gray-300">Create and publish new events for the community</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Fill in the information for your new event</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">{t("eventTitle")}</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">{t("eventDescription")}</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">{t("eventDate")}</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="date"
                        type="date"
                        value={eventData.date}
                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">{t("eventTime")}</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="time"
                        type="time"
                        value={eventData.time}
                        onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">{t("eventLocation")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="location"
                      placeholder="Event location"
                      value={eventData.location}
                      onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Category and Max Attendees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t("eventCategory")}</Label>
                    <Select onValueChange={(value) => setEventData({ ...eventData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">{t("maxAttendees")}</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="maxAttendees"
                        type="number"
                        placeholder="Maximum attendees"
                        value={eventData.maxAttendees}
                        onChange={(e) => setEventData({ ...eventData, maxAttendees: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Event Image */}
                <div className="space-y-2">
                  <Label htmlFor="image">{t("eventImage")}</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="pl-10" />
                    </div>
                    {eventData.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border">
                        <img
                          src={eventData.image || "/placeholder.svg"}
                          alt="Event preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                    {isLoading ? "Creating..." : t("createEventBtn")}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
