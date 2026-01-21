"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Edit, Eye, Trash2, Plus, Users, MapPin, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  status: "draft" | "published" | "cancelled"
  category: string
}

export default function ManageEventsPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Community Networking Meetup",
      description: "Join us for an evening of networking and community building.",
      date: "2024-01-15",
      time: "18:00",
      location: "Community Center, Downtown",
      attendees: 45,
      maxAttendees: 100,
      status: "published",
      category: "Networking",
    },
    {
      id: "2",
      title: "Youth Leadership Workshop",
      description: "Empowering young leaders in our community.",
      date: "2024-01-20",
      time: "14:00",
      location: "Youth Center",
      attendees: 23,
      maxAttendees: 50,
      status: "published",
      category: "Workshop",
    },
    {
      id: "3",
      title: "Cultural Festival Planning",
      description: "Planning meeting for the upcoming cultural festival.",
      date: "2024-01-25",
      time: "19:00",
      location: "City Hall",
      attendees: 12,
      maxAttendees: 30,
      status: "draft",
      category: "Planning",
    },
  ])

  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setIsEditDialogOpen(true)
  }

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(events.map((e) => (e.id === editingEvent.id ? editingEvent : e)))
      setIsEditDialogOpen(false)
      setEditingEvent(null)
      toast({
        title: "Event Updated",
        description: "Event has been successfully updated.",
      })
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId))
    toast({
      title: "Event Deleted",
      description: "Event has been successfully deleted.",
      variant: "destructive",
    })
  }

  const handleStatusChange = (eventId: string, newStatus: Event["status"]) => {
    setEvents(events.map((e) => (e.id === eventId ? { ...e, status: newStatus } : e)))
    toast({
      title: "Status Updated",
      description: `Event status changed to ${newStatus}.`,
    })
  }

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Manage Events</h1>
          <p className="text-muted-foreground">Create, edit, and manage your organization's events</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id} className="border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.maxAttendees}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{event.title}</DialogTitle>
                        <DialogDescription>Event Details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>
                          <strong>Description:</strong> {event.description}
                        </p>
                        <p>
                          <strong>Date:</strong> {event.date}
                        </p>
                        <p>
                          <strong>Time:</strong> {event.time}
                        </p>
                        <p>
                          <strong>Location:</strong> {event.location}
                        </p>
                        <p>
                          <strong>Attendees:</strong> {event.attendees}/{event.maxAttendees}
                        </p>
                        <p>
                          <strong>Category:</strong> {event.category}
                        </p>
                        <p>
                          <strong>Status:</strong> {event.status}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the event "{event.title}" and
                          remove all associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEvent(event.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Select
                  value={event.status}
                  onValueChange={(value: Event["status"]) => handleStatusChange(event.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Make changes to your event here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={editingEvent.maxAttendees}
                  onChange={(e) => setEditingEvent({ ...editingEvent, maxAttendees: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent} className="bg-orange-600 hover:bg-orange-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
