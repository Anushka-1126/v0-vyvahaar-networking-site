"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, MessageCircle, Phone, Video, UserPlus, Heart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function ConnectPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAge, setFilterAge] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [filterInterests, setFilterInterests] = useState("all")
  const [connections, setConnections] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()
  const { t } = useTranslation()

  const people = [
    {
      id: "1",
      name: "Rajesh Kumar",
      age: 68,
      location: "Delhi",
      distance: "2.5 km",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Retired teacher who loves reading and gardening. Looking for book club friends.",
      interests: ["Reading", "Gardening", "Teaching", "Classical Music"],
      isOnline: true,
      lastSeen: "Active now",
      mutualConnections: 3,
      phone: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Sunita Sharma",
      age: 72,
      location: "Mumbai",
      distance: "1.2 km",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Former nurse, passionate about yoga and cooking traditional recipes.",
      interests: ["Yoga", "Cooking", "Healthcare", "Spirituality"],
      isOnline: false,
      lastSeen: "2 hours ago",
      mutualConnections: 5,
      phone: "+91 87654 32109",
    },
    {
      id: "3",
      name: "Mohan Patel",
      age: 65,
      location: "Ahmedabad",
      distance: "800 m",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Retired engineer who enjoys chess and morning walks. Always ready for a good conversation.",
      interests: ["Chess", "Walking", "Engineering", "Politics"],
      isOnline: true,
      lastSeen: "Active now",
      mutualConnections: 2,
      phone: "+91 76543 21098",
    },
    {
      id: "4",
      name: "Lakshmi Iyer",
      age: 70,
      location: "Chennai",
      distance: "3.1 km",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Classical dancer and music enthusiast. Love sharing cultural stories and traditions.",
      interests: ["Classical Dance", "Music", "Culture", "Storytelling"],
      isOnline: false,
      lastSeen: "1 day ago",
      mutualConnections: 1,
      phone: "+91 65432 10987",
    },
    {
      id: "5",
      name: "Anil Desai",
      age: 67,
      location: "Pune",
      distance: "4.2 km",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Nature photographer and bird watcher. Organizing weekend nature walks.",
      interests: ["Photography", "Bird Watching", "Nature", "Travel"],
      isOnline: true,
      lastSeen: "Active now",
      mutualConnections: 4,
      phone: "+91 54321 09876",
    },
    {
      id: "6",
      name: "Priya Banerjee",
      age: 69,
      location: "Kolkata",
      distance: "2.8 km",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Former librarian who loves literature and poetry. Organizing book reading sessions.",
      interests: ["Literature", "Poetry", "Writing", "Education"],
      isOnline: false,
      lastSeen: "3 hours ago",
      mutualConnections: 6,
      phone: "+91 76543 21098",
    },
  ]

  const recentCalls = [
    {
      id: "1",
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=50&width=50",
      type: "incoming",
      status: "answered",
      duration: "12:34",
      timestamp: "2 hours ago",
      phone: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Sunita Sharma",
      avatar: "/placeholder.svg?height=50&width=50",
      type: "outgoing",
      status: "answered",
      duration: "8:45",
      timestamp: "5 hours ago",
      phone: "+91 87654 32109",
    },
    {
      id: "3",
      name: "Mohan Patel",
      avatar: "/placeholder.svg?height=50&width=50",
      type: "missed",
      status: "missed",
      duration: "0:00",
      timestamp: "1 day ago",
      phone: "+91 76543 21098",
    },
  ]

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAge =
      filterAge === "all" ||
      (filterAge === "60-65" && person.age >= 60 && person.age <= 65) ||
      (filterAge === "66-70" && person.age >= 66 && person.age <= 70) ||
      (filterAge === "71-75" && person.age >= 71 && person.age <= 75) ||
      (filterAge === "75+" && person.age > 75)

    const matchesLocation = filterLocation === "all" || person.location === filterLocation

    const matchesInterests =
      filterInterests === "all" || person.interests.some((interest) => interest === filterInterests)

    return matchesSearch && matchesAge && matchesLocation && matchesInterests
  })

  const handleConnect = (personId: string, personName: string) => {
    setConnections((prev) => ({ ...prev, [personId]: true }))
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${personName}`,
    })
  }

  const handleMessage = (personName: string) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${personName}`,
    })
  }

  const handleCall = (personName: string, phone: string) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${personName} at ${phone}...`,
    })
  }

  const handleVideoCall = (personName: string) => {
    toast({
      title: "Starting Video Call",
      description: `Video calling ${personName}...`,
    })
  }

  const locations = [...new Set(people.map((p) => p.location))]
  const interests = [...new Set(people.flatMap((p) => p.interests))]

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("connect")}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Find and connect with like-minded people in your community
            </p>
          </div>

          <Tabs defaultValue="people" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="calls">Recent Calls</TabsTrigger>
              <TabsTrigger value="video">Video Calls</TabsTrigger>
            </TabsList>

            {/* People Tab */}
            <TabsContent value="people">
              {/* Search and Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={`${t("search")} people, interests, or bio...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterAge} onValueChange={setFilterAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="60-65">60-65 years</SelectItem>
                    <SelectItem value="66-70">66-70 years</SelectItem>
                    <SelectItem value="71-75">71-75 years</SelectItem>
                    <SelectItem value="75+">75+ years</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* People Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPeople.map((person) => (
                  <Card key={person.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-orange-200 text-orange-700 text-lg">
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {person.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{person.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 text-sm">
                            <span>Age {person.age}</span>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{person.location}</span>
                          </CardDescription>
                          <p className="text-xs text-green-600 mt-1">
                            {person.isOnline ? "Active now" : person.lastSeen}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{person.bio}</p>

                      <div className="flex flex-wrap gap-1">
                        {person.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                            {interest}
                          </Badge>
                        ))}
                        {person.interests.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{person.interests.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {person.distance} away
                        </span>
                        <span>{person.mutualConnections} mutual connections</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {connections[person.id] ? (
                          <Badge className="flex-1 justify-center bg-green-100 text-green-700 hover:bg-green-100">
                            <Heart className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleConnect(person.id, person.name)}
                          >
                            <UserPlus className="w-3 h-3 mr-1" />
                            Connect
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Link href={`/messages?user=${person.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleMessage(person.name)}
                          >
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleCall(person.name, person.phone)}>
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleVideoCall(person.name)}>
                          <Video className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Calls Tab */}
            <TabsContent value="calls">
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <Card key={call.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={call.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-orange-200 text-orange-700">
                              {call.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{call.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{call.type} call</span>
                              <span>•</span>
                              <span>{call.timestamp}</span>
                            </div>
                            {call.status !== "missed" && (
                              <div className="text-sm text-gray-500">Duration: {call.duration}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleCall(call.name, call.phone)}>
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleVideoCall(call.name)}>
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Video Calls Tab */}
            <TabsContent value="video">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {people
                  .filter((person) => person.isOnline)
                  .map((person) => (
                    <Card key={person.id} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="relative inline-block mb-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-orange-200 text-orange-700 text-2xl">
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{person.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Available for video call</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleVideoCall(person.name)}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Start Video Call
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredPeople.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No people found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
