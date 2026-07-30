"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageCircle, Clock, Send, HelpCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Support Request Submitted",
        description: "We'll get back to you within 24 hours. Thank you for contacting us!",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  const categories = [
    "Technical Support",
    "Account Issues",
    "Payment & Billing",
    "Feature Request",
    "Bug Report",
    "General Inquiry",
  ]

  return (
    <MainLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("support")}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              We're here to help! Contact our support team for any questions or assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Submit a Support Request
                </CardTitle>
                <CardDescription>Fill out the form below and we'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information & FAQ */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Get in touch with us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">+91 11 4567 8900</p>
                      <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">support@vyavahaar.com</p>
                      <p className="text-xs text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">How do I reset my password?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Go to the login page and click "Forgot Password". Enter your phone number and follow the OTP
                      verification process.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">How do I cancel my premium subscription?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can cancel your subscription anytime from Settings > Account > Subscription Management.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Is my personal information secure?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yes, we use industry-standard encryption and security measures to protect your data. Read our
                      Privacy Policy for more details.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">How do I use voice commands?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Click the microphone button in the top navigation and allow microphone access. You can then use
                      voice commands in English, Hindi, or Punjabi.
                    </p>
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
