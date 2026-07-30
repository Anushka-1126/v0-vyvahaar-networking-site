"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Users, Search, Filter, Car, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PaymentModal } from "@/components/payment-modal"
import { useTranslation } from "@/lib/translations"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [inviteStatus, setInviteStatus] = useState<{ [key: string]: "pending" | "accepted" | "rejected" }>({})
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const authStatus = localStorage.getItem("vyavahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      setUser(userData)
    }
  }, [])

  const events = [
    {
      id: "1",
      title: "Morning Yoga Session",
      description: "Join us for a peaceful morning yoga session in the park",
      date: "2024-01-15",
      time: "07:00 AM",
      location: "Central Park, Delhi",
      category: "Health & Wellness",
      attendees: 25,
      maxAttendees: 30,
      organizer: "Sunita Sharma",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: false,
      price: "Free",
    },
    {
      id: "2",
      title: "Cultural Music Evening",
      description: "An evening of classical Indian music and cultural performances",
      date: "2024-01-18",
      time: "06:00 PM",
      location: "Community Hall, Mumbai",
      category: "Arts & Culture",
      attendees: 45,
      maxAttendees: 50,
      organizer: "Rajesh Kumar",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: true,
      price: "Premium",
    },
    {
      id: "3",
      title: "Senior Citizens Health Camp",
      description: "Free health checkup and consultation with experienced doctors",
      date: "2024-01-20",
      time: "09:00 AM",
      location: "City Hospital, Bangalore",
      category: "Health & Wellness",
      attendees: 80,
      maxAttendees: 100,
      organizer: "Dr. Mohan Patel",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: false,
      price: "Free",
    },
  ]

  const categories = ["all", "Health & Wellness", "Arts & Culture", "Learning", "Outdoor", "Social"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || event.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleInviteResponse = (eventId: string, response: "accepted" | "rejected") => {
    if (user.role === "admin") {
      toast({
        title: "Admin Access",
        description: "Admins cannot join events. You can only create and manage events.",
        variant: "destructive",
      })
      return
    }

    setInviteStatus((prev) => ({ ...prev, [eventId]: response }))

    if (response === "accepted") {
      const event = events.find((e) => e.id === eventId)
      if (event) {
        // Add message to inbox
        const eventMessage = {
          id: Date.now().toString(),
          sender: "Vyvahaar Events",
          content: `🎉 ${t("eventJoined")}: ${event.title}

📅 Date: ${new Date(event.date).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
⏰ Time: ${event.time}
📍 Location: ${event.location}
👥 Organizer: ${event.organizer}

Thank you for joining! We look forward to seeing you at the event.`,
          timestamp: new Date().toLocaleTimeString(),
          isOwn: false,
          type: "event_confirmation",
        }

        const existingMessages = JSON.parse(localStorage.getItem("vyavahaar_messages") || "{}")
        existingMessages["event_notifications"] = existingMessages["event_notifications"] || []
        existingMessages["event_notifications"].push(eventMessage)
        localStorage.setItem("vyavahaar_messages", JSON.stringify(existingMessages))
      }

      toast({
        title: t("eventJoined"),
        description: "Event details have been sent to your inbox.",
      })
    } else {
      toast({
        title: "Event Declined",
        description: "You've declined the event invitation.",
      })
    }
  }

  const handleBookCab = (event: (typeof events)[0]) => {
    toast({
      title: "Booking Cab",
      description: `Redirecting to Ola for cab booking to ${event.location} on ${event.date} at ${event.time}`,
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Health & Wellness": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Arts & Culture": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Learning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Outdoor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Social: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("eventsTitle")}</h1>
            <p className="text-gray-600 dark:text-gray-300">{t("eventsDescription")}</p>
          </div>

          {/* Only show subscription banner for users */}
          {user.role === "user" && (
            <Card className="mb-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Vyvahaar Premium Events</h2>
                    <p className="text-orange-100">
                      Subscribe for just ₹99/month to attend all premium events and activities
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">₹99</div>
                      <div className="text-sm text-orange-100">per month</div>
                    </div>
                    <Button variant="secondary" size="lg" onClick={() => setShowPaymentModal(true)}>
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-video relative bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="text-sm">{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">Organized by {event.organizer}</div>

                  {/* Only show join buttons for users */}
                  {user.role === "user" && (
                    <>
                      {inviteStatus[event.id] ? (
                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg ${
                              inviteStatus[event.id] === "accepted"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                            }`}
                          >
                            {inviteStatus[event.id] === "accepted" ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span className="text-sm font-medium">Event Joined</span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4" />
                                <span className="text-sm font-medium">Event Declined</span>
                              </>
                            )}
                          </div>

                          {inviteStatus[event.id] === "accepted" && (
                            <Button variant="outline" size="sm" className="w-full" onClick={() => handleBookCab(event)}>
                              <Car className="w-4 h-4 mr-2" />
                              Book Cab with Ola
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleInviteResponse(event.id, "accepted")}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            {t("joinEvent")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleInviteResponse(event.id, "rejected")}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Show different message for admins */}
                  {user.role === "admin" && (
                    <div className="p-2 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg text-center">
                      <span className="text-sm">Admin View - Event Management</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={99}
          description="Vyvahaar Premium Subscription - Monthly"
        />
      </div>
    </MainLayout>
  )
}
