"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Globe, Award, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export default function AboutPage() {
  const { t } = useTranslation()

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We believe in treating every member with kindness, empathy, and understanding.",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong, supportive communities where senior citizens can thrive together.",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: Shield,
      title: "Safety",
      description: "Ensuring a secure and trusted environment for all our community members.",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description: "Welcoming people from all backgrounds, cultures, and walks of life.",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ]

  const team = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200",
      description: "Former healthcare professional with 30+ years of experience in senior care.",
    },
    {
      name: "Priya Patel",
      role: "Head of Community",
      image: "/placeholder.svg?height=200&width=200",
      description: "Social worker dedicated to improving the lives of senior citizens.",
    },
    {
      name: "Amit Kumar",
      role: "Technology Director",
      image: "/placeholder.svg?height=200&width=200",
      description: "Tech expert focused on creating accessible technology for seniors.",
    },
  ]

  const milestones = [
    { year: "2023", title: "Vyvahaar Founded", description: "Started with a vision to connect senior citizens" },
    { year: "2023", title: "1,000 Members", description: "Reached our first thousand community members" },
    { year: "2024", title: "Multi-language Support", description: "Added Hindi and Punjabi language support" },
    { year: "2024", title: "10,000+ Connections", description: "Facilitated over 10,000 meaningful connections" },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">About Vyvahaar</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Connecting hearts, building communities, and enriching the lives of senior citizens across India.
            </p>
            <div className="flex justify-center">
              <Image src="/logo.png" alt="Vyvahaar Logo" width={120} height={120} className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Vyvahaar was born from a simple observation: senior citizens in India often face isolation and
                    loneliness, despite being surrounded by family and community. We recognized the need for a platform
                    specifically designed for their unique needs and preferences.
                  </p>
                  <p>
                    Our founder, Dr. Rajesh Sharma, spent decades working in healthcare and witnessed firsthand how
                    social connections directly impact the well-being of senior citizens. This inspired him to create
                    Vyvahaar - a platform where seniors can connect, share experiences, and build meaningful
                    relationships.
                  </p>
                  <p>
                    Today, Vyvahaar serves thousands of senior citizens across India, providing them with a safe,
                    accessible, and culturally relevant platform to connect with peers, participate in events, and
                    maintain an active social life.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Senior citizens connecting"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    To create a vibrant, inclusive community where senior citizens can connect, share experiences, and
                    live fulfilling lives. We strive to combat loneliness and isolation by providing accessible
                    technology that brings people together.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    To be India's leading platform for senior citizen networking, where every person aged 50+ has access
                    to meaningful connections, engaging activities, and a supportive community that celebrates their
                    wisdom and experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-orange-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200 dark:bg-orange-800"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8`}
                  >
                    <div className="flex-1">
                      <Card className={`${index % 2 === 0 ? "ml-auto" : "mr-auto"} max-w-md`}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                              {milestone.year}
                            </div>
                            <CardTitle className="text-lg">{milestone.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-orange-600 rounded-full relative z-10"></div>
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Our Community Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of a growing community of senior citizens who are living their best lives through meaningful
              connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 border-white text-white hover:bg-white hover:text-orange-600"
                >
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
