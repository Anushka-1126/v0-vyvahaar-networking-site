"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { SubscriptionPopup } from "@/components/subscription-popup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Calendar, MapPin, Video, MessageCircle, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false)
  const { t } = useTranslation()

  const heroImages = [
    "/images/yoga.jpg",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    // Load user data
    const authStatus = localStorage.getItem("vyvahaar_auth")
    if (authStatus) {
      const userData = JSON.parse(authStatus)
      setUser(userData)

      // Show subscription popup for users after 2 seconds
      if (userData.role === "user") {
        const hasSeenPopup = localStorage.getItem("vyvahaar_subscription_popup_seen")
        if (!hasSeenPopup) {
          setTimeout(() => {
            setShowSubscriptionPopup(true)
            localStorage.setItem("vyvahaar_subscription_popup_seen", "true")
          }, 2000)
        }
      }
    }
  }, [])

  const features = [
    {
      icon: Users,
      title: t("connectPeers"),
      description: t("connectPeersDesc"),
      color: "text-orange-600",
    },
    {
      icon: Video,
      title: t("videoVoice"),
      description: t("videoVoiceDesc"),
      color: "text-blue-600",
    },
    {
      icon: Calendar,
      title: t("eventsActivities"),
      description: t("eventsActivitiesDesc"),
      color: "text-green-600",
    },
    {
      icon: MapPin,
      title: t("locationBased"),
      description: t("locationBasedDesc"),
      color: "text-purple-600",
    },
    {
      icon: MessageCircle,
      title: t("voiceAssistant"),
      description: t("voiceAssistantDesc"),
      color: "text-red-600",
    },
    {
      icon: Heart,
      title: t("safeTrusted"),
      description: t("safeTrustedDesc"),
      color: "text-pink-600",
    },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Subscription Popup */}
        <SubscriptionPopup isOpen={showSubscriptionPopup} onClose={() => setShowSubscriptionPopup(false)} />

        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-left fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <Image src="/logo.png" alt="Vyvahaar Logo" width={60} height={60} className="rounded-lg" />
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">Vyvahaar</h1>
                </div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  {t("welcomeTitle")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {t("welcomeDescription")}
                </p>
                <p className="text-xl font-medium text-orange-600 mb-8 italic">"आपके व्यवहार में ही हमारा प्यार है"</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {user?.role === "user" ? (
                    <>
                      <Link href="/connect">
                        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                          Start Connecting
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-3"
                        onClick={() => setShowSubscriptionPopup(true)}
                      >
                        Upgrade to Premium
                      </Button>
                    </>
                  ) : user?.role === "admin" ? (
                    <Link href="/admin">
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/signup">
                        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                          {t("joinToday")}
                        </Button>
                      </Link>
                      <Link href="/about">
                        <Button variant="outline" size="lg" className="px-8 py-3">
                          {t("learnMore")}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={heroImages[currentImageIndex] || "/placeholder.svg"}
                    alt="Happy Senior Citizens"
                    fill
                    className="object-cover transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Section - Only show for users */}
        {user?.role === "user" && (
          <section className="py-16 px-6 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-4">{t("premiumTitle")}</h2>
                      <p className="text-orange-100 text-lg">{t("premiumDesc")}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">₹99</div>
                        <div className="text-sm text-orange-100">{t("perMonth")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold">₹4999</div>
                        <div className="text-sm text-orange-100">{t("lifetime")}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="secondary" size="lg" onClick={() => setShowSubscriptionPopup(true)}>
                          {t("subscribeNow")}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-white text-white hover:bg-white hover:text-orange-600"
                          onClick={() => setShowSubscriptionPopup(true)}
                        >
                          {t("getLifetime")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t("featuresTitle")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 slide-in">
              How Vyvahaar Makes an Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Combat Loneliness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with peers who share similar interests and experiences, creating meaningful friendships that
                    last.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Build Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Join local groups, participate in events, and become part of a supportive community of senior
                    citizens.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Create Memories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Share stories, participate in activities, and create new memories that make every day special and
                    fulfilling.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
