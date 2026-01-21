"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Moon, Bell, Shield, Users, Globe, Volume2, Trash2, Plus, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState({
    notifications: {
      events: true,
      messages: true,
      calls: true,
      newsletter: false,
    },
    privacy: {
      showAge: true,
      showLocation: true,
      allowMessages: true,
      allowCalls: true,
    },
    accessibility: {
      voiceAssistant: true,
      largeText: false,
      highContrast: false,
      voiceNavigation: true,
    },
    language: "en",
    trustedContacts: [
      { id: "1", name: "Priya Sharma", phone: "+91 98765 43210", relation: "Daughter" },
      { id: "2", name: "Amit Kumar", phone: "+91 87654 32109", relation: "Son" },
      { id: "3", name: "Dr. Rajesh", phone: "+91 76543 21098", relation: "Doctor" },
    ],
  })

  useEffect(() => {
    setMounted(true)
    // Load user data
    const authStatus = localStorage.getItem("vyvahaar_auth")
    if (authStatus) {
      setUser(JSON.parse(authStatus))
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("vyvahaar_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("vyvahaar_auth")
    localStorage.removeItem("vyvahaar_settings")
    localStorage.removeItem("vyvahaar_subscription_popup_seen")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/auth/login")
  }

  const saveSettings = () => {
    localStorage.setItem("vyvahaar_settings", JSON.stringify(settings))
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  const updatePrivacySetting = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }))
  }

  const updateAccessibilitySetting = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      accessibility: { ...prev.accessibility, [key]: value },
    }))
  }

  const addTrustedContact = () => {
    const newContact = {
      id: Date.now().toString(),
      name: "",
      phone: "",
      relation: "",
    }
    setSettings((prev) => ({
      ...prev,
      trustedContacts: [...prev.trustedContacts, newContact],
    }))
  }

  const removeTrustedContact = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      trustedContacts: prev.trustedContacts.filter((contact) => contact.id !== id),
    }))
  }

  const updateTrustedContact = (id: string, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      trustedContacts: prev.trustedContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact,
      ),
    }))
  }

  if (!mounted) {
    return null
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Customize your Vyvahaar experience</p>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>Configure your basic preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Selection */}
                  <div className="space-y-3">
                    <Label>Theme Preference</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className="flex items-center gap-2"
                      >
                        <Sun className="w-4 h-4" />
                        Light
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className="flex items-center gap-2"
                      >
                        <Moon className="w-4 h-4" />
                        Dark
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("system")}
                        className="flex items-center gap-2"
                      >
                        Auto
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Language Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">
                          <div className="flex items-center gap-2">
                            <img src="/flags/us.jpg" alt="USA" className="w-5 h-4" />
                            <span>English</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="hi">
                          <div className="flex items-center gap-2">
                            <img src="/flags/in.png" alt="India" className="w-5 h-4" />
                            <span>हिंदी (Hindi)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="pa">
                          <div className="flex items-center gap-2">
                            <img src="/flags/ca.png" alt="Canada" className="w-5 h-4" />
                            <span>ਪੰਜਾਬੀ (Punjabi)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Logout Section */}
                  <div className="space-y-3">
                    <Label>Account Actions</Label>
                    <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>

                  <Button onClick={saveSettings} className="bg-orange-600 hover:bg-orange-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Event Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Get notified about upcoming events and activities
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.events}
                        onCheckedChange={(checked) => updateNotificationSetting("events", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Message Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.messages}
                        onCheckedChange={(checked) => updateNotificationSetting("messages", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Call Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Get notified about incoming calls</p>
                      </div>
                      <Switch
                        checked={settings.notifications.calls}
                        onCheckedChange={(checked) => updateNotificationSetting("calls", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Newsletter</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Receive weekly newsletter with community updates
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.newsletter}
                        onCheckedChange={(checked) => updateNotificationSetting("newsletter", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={saveSettings} className="bg-orange-600 hover:bg-orange-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>Control your privacy and who can contact you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Age in Profile</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Display your age on your public profile
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.showAge}
                        onCheckedChange={(checked) => updatePrivacySetting("showAge", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Location</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Display your city on your public profile
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.showLocation}
                        onCheckedChange={(checked) => updatePrivacySetting("showLocation", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Messages</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Allow other users to send you messages
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.allowMessages}
                        onCheckedChange={(checked) => updatePrivacySetting("allowMessages", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Calls</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Allow other users to call you</p>
                      </div>
                      <Switch
                        checked={settings.privacy.allowCalls}
                        onCheckedChange={(checked) => updatePrivacySetting("allowCalls", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={saveSettings} className="bg-orange-600 hover:bg-orange-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accessibility Settings */}
            <TabsContent value="accessibility">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Accessibility Options
                  </CardTitle>
                  <CardDescription>Configure accessibility features for better usability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Voice Assistant</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Enable voice commands for navigation</p>
                      </div>
                      <Switch
                        checked={settings.accessibility.voiceAssistant}
                        onCheckedChange={(checked) => updateAccessibilitySetting("voiceAssistant", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Large Text</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Increase text size for better readability
                        </p>
                      </div>
                      <Switch
                        checked={settings.accessibility.largeText}
                        onCheckedChange={(checked) => updateAccessibilitySetting("largeText", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>High Contrast</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Use high contrast colors for better visibility
                        </p>
                      </div>
                      <Switch
                        checked={settings.accessibility.highContrast}
                        onCheckedChange={(checked) => updateAccessibilitySetting("highContrast", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Voice Navigation</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Navigate the website using voice commands
                        </p>
                      </div>
                      <Switch
                        checked={settings.accessibility.voiceNavigation}
                        onCheckedChange={(checked) => updateAccessibilitySetting("voiceNavigation", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={saveSettings} className="bg-orange-600 hover:bg-orange-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trusted Contacts */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Trusted Contacts
                  </CardTitle>
                  <CardDescription>Add emergency contacts and trusted family members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {settings.trustedContacts.map((contact) => (
                      <div key={contact.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-orange-200 text-orange-700">
                            {contact.name
                              ? contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Input
                            placeholder="Name"
                            value={contact.name}
                            onChange={(e) => updateTrustedContact(contact.id, "name", e.target.value)}
                          />
                          <Input
                            placeholder="Phone number"
                            value={contact.phone}
                            onChange={(e) => updateTrustedContact(contact.id, "phone", e.target.value)}
                          />
                          <Input
                            placeholder="Relation"
                            value={contact.relation}
                            onChange={(e) => updateTrustedContact(contact.id, "relation", e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => removeTrustedContact(contact.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={addTrustedContact} className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Contact
                    </Button>
                    <Button onClick={saveSettings} className="bg-orange-600 hover:bg-orange-700">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
