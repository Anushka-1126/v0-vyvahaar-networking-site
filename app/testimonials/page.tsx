"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, ThumbsUp, MessageSquare, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function TestimonialsPage() {
  const [filterRating, setFilterRating] = useState("all")
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [user, setUser] = useState({ role: "user" })
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const authStatus = localStorage.getItem("vyvahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      setUser(userData)
    }
  }, [])

  const testimonials = [
    {
      id: "1",
      name: "Rajesh Kumar",
      age: 68,
      location: "Delhi",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Vyvahaar has completely transformed my retirement years. I have made so many wonderful friends through this platform. The voice assistant feature is particularly helpful for someone like me who is not very tech-savvy. The events are well-organized and the community is very supportive.",
      helpful: 24,
      category: "Overall Experience",
    },
    {
      id: "2",
      name: "Sunita Sharma",
      age: 72,
      location: "Mumbai",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      date: "2024-01-08",
      comment:
        "The voice assistant feature is amazing! I can navigate the entire website just by speaking. My children are so happy that I can stay connected with people my age. The video calling quality is excellent and I feel less lonely now.",
      helpful: 18,
      category: "Voice Assistant",
    },
    {
      id: "3",
      name: "Mohan Patel",
      age: 65,
      location: "Ahmedabad",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Great platform for connecting with people. The events feature is my favorite! I have attended yoga sessions, cultural programs, and health camps. The cab booking integration makes it so convenient to attend events.",
      helpful: 31,
      category: "Events",
    },
    {
      id: "4",
      name: "Lakshmi Iyer",
      age: 70,
      location: "Chennai",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      date: "2024-01-03",
      comment:
        "Very user-friendly platform. The language support is excellent - I can use it in Tamil which makes me very comfortable. The community is warm and welcoming. Only suggestion would be to add more local events in smaller cities.",
      helpful: 15,
      category: "Language Support",
    },
    {
      id: "5",
      name: "Anil Desai",
      age: 67,
      location: "Pune",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      date: "2024-01-01",
      comment:
        "Excellent platform! The location-based connections helped me find people in my neighborhood. We now have a regular walking group and play cards together. This has brought so much joy to my life.",
      helpful: 22,
      category: "Location Features",
    },
    {
      id: "6",
      name: "Priya Banerjee",
      age: 69,
      location: "Kolkata",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      date: "2023-12-28",
      comment:
        "Good platform with nice features. The video calling works well and I enjoy the cultural events. The interface could be a bit simpler for senior citizens, but overall it's a great initiative.",
      helpful: 12,
      category: "Video Calling",
    },
  ]

  const categories = [
    "all",
    "Overall Experience",
    "Voice Assistant",
    "Events",
    "Language Support",
    "Location Features",
    "Video Calling",
    "Community Support",
    "Health Features",
  ]

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filterRating === "all") return true
    return testimonial.rating === Number.parseInt(filterRating)
  })

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: testimonials.filter((t) => t.rating === rating).length,
    percentage: (testimonials.filter((t) => t.rating === rating).length / testimonials.length) * 100,
  }))

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (user.role === "admin") {
      toast({
        title: "Admin Access",
        description: "Admins cannot submit reviews. Only users can provide testimonials.",
        variant: "destructive",
      })
      return
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Review Required",
        description: "Please write a review before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! Your review will be published after moderation.",
    })

    setNewReview({ rating: 5, comment: "" })
    setShowReviewForm(false)
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community Reviews</h1>
            <p className="text-gray-600 dark:text-gray-300">See what our community members are saying about Vyvahaar</p>
          </div>

          {/* What Our Community Says Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Real experiences from our valued community members
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>
                          Age {testimonial.age} • {testimonial.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{testimonial.comment.substring(0, 150)}..."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Rating Overview */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-orange-600">{averageRating.toFixed(1)}</div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Based on {testimonials.length} reviews</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>
                  {user.role === "admin"
                    ? "Admins can view reviews but cannot submit them"
                    : "Share your experience with the Vyvahaar community"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.role === "admin" ? (
                  <div className="p-4 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg text-center">
                    <span className="text-sm">Admin accounts cannot submit reviews</span>
                  </div>
                ) : (
                  <>
                    {!showReviewForm ? (
                      <Button
                        onClick={() => setShowReviewForm(true)}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        Write a Review
                      </Button>
                    ) : (
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <Label>Rating</Label>
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                className="p-1"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="comment">Your Review</Label>
                          <Textarea
                            id="comment"
                            placeholder="Share your experience with Vyvahaar..."
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            rows={4}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                            Submit Review
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Community Reviews</h2>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-orange-200 text-orange-700">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>
                          Age {testimonial.age} • {testimonial.location}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(testimonial.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {testimonial.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{testimonial.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({testimonial.helpful})</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
