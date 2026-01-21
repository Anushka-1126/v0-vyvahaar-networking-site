"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Edit, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    interests: [] as string[],
    phone: "",
    email: "",
    avatar: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    // Load user data from localStorage
    const authStatus = localStorage.getItem("vyvahaar_auth")
    const profileData = localStorage.getItem("vyvahaar_user_profile")

    if (authStatus) {
      const userData = JSON.parse(authStatus)
      let updatedProfile = {
        name: userData.name || "",
        age: "",
        location: "",
        bio: "",
        interests: [],
        phone: userData.phone || "",
        email: "",
        avatar: userData.avatar || "",
      }

      if (profileData) {
        const savedProfile = JSON.parse(profileData)
        updatedProfile = {
          ...updatedProfile,
          name: `${savedProfile.firstName} ${savedProfile.lastName}` || userData.name,
          age: savedProfile.age || "",
          location: savedProfile.city || "",
          bio: savedProfile.bio || "",
          interests: savedProfile.interests || [],
          email: savedProfile.email || "",
        }
      }

      setProfile(updatedProfile)
    }
  }, [])

  const handleSaveProfile = () => {
    setIsEditing(false)

    // Update localStorage with new profile data
    const authStatus = localStorage.getItem("vyvahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      const updatedUserData = {
        ...userData,
        name: profile.name,
        avatar: profile.avatar,
        initials: profile.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      }
      localStorage.setItem("vyvahaar_auth", JSON.stringify(updatedUserData))
    }

    // Save profile data
    const profileData = {
      firstName: profile.name.split(" ")[0] || "",
      lastName: profile.name.split(" ").slice(1).join(" ") || "",
      age: profile.age,
      city: profile.location,
      bio: profile.bio,
      interests: profile.interests,
      email: profile.email,
    }
    localStorage.setItem("vyvahaar_user_profile", JSON.stringify(profileData))

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully.",
      })
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-orange-200 text-orange-700 text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            value={profile.age}
                            onChange={(e) => setProfile((prev) => ({ ...prev, age: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} className="bg-orange-600 hover:bg-orange-700">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl">{profile.name || "Complete your profile"}</CardTitle>
                          <CardDescription className="text-lg">
                            {profile.age && profile.location
                              ? `Age ${profile.age} • ${profile.location}`
                              : "Add your details"}
                          </CardDescription>
                        </div>
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          <Edit className="w-4 h-4 mr-2" />
                          {t("edit")}
                        </Button>
                      </div>

                      {profile.bio && <p className="text-gray-700 dark:text-gray-300 mb-4">{profile.bio}</p>}

                      {profile.interests.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {profile.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="bg-orange-100 text-orange-700">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">0</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Posts</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">0</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Connections</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">0</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Events Attended</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="reels">Reels</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>

            <TabsContent value="posts">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
                <p className="text-gray-600 dark:text-gray-300">Share your first post to get started!</p>
              </div>
            </TabsContent>

            <TabsContent value="reels">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reels yet</h3>
                <p className="text-gray-600 dark:text-gray-300">Create your first reel to share with the community!</p>
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone</Label>
                      <p>{profile.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p>{profile.email || "Not provided"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Location</Label>
                      <p>{profile.location || "Not provided"}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interests & Hobbies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profile.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="border-orange-200 text-orange-700">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">No interests added yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
