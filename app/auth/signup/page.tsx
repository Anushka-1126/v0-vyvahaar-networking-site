"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Shield, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function SignUpPage() {
  const [step, setStep] = useState<"phone" | "otp" | "role" | "profile">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [role, setRole] = useState<"user" | "admin">("user")
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    bio: "",
    interests: [] as string[],
    organizationName: "",
    organizationType: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useTranslation()

  const interestOptions = [
    "Reading",
    "Gardening",
    "Cooking",
    "Music",
    "Dancing",
    "Yoga",
    "Walking",
    "Chess",
    "Cards",
    "Photography",
    "Travel",
    "Art",
  ]

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
      toast({
        title: t("otpSent"),
        description: `OTP sent to ${phoneNumber}`,
      })
    }, 1000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      if (otp === "1234") {
        setStep("role")
        toast({
          title: t("otpVerified"),
          description: "Please select your role to continue",
        })
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct OTP",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  const handleRoleSubmit = (selectedRole: "user" | "admin") => {
    setRole(selectedRole)
    setStep("profile")
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!profileData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account Created Successfully",
        description: "Welcome to Vyvahaar!",
      })

      // Store profile data for later use
      localStorage.setItem("vyavahaar_user_profile", JSON.stringify(profileData))

      const userData = {
        name: `${profileData.firstName} ${profileData.lastName}`,
        avatar: "",
        initials: `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`,
        phone: phoneNumber,
        role: role,
        ...profileData,
      }
      localStorage.setItem("vyavahaar_auth", JSON.stringify(userData))

      router.push(role === "admin" ? "/admin" : "/")
    }, 1000)
  }

  const resendOTP = () => {
    toast({
      title: t("otpSent"),
      description: `OTP resent to ${phoneNumber}`,
    })
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="Vyvahaar" width={60} height={60} className="rounded-lg" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-600">{t("joinVyvahaar")}</CardTitle>
            <CardDescription>
              {step === "phone" && t("enterPhone")}
              {step === "otp" && t("enterOTP")}
              {step === "role" && t("selectRole")}
              {step === "profile" && "Complete your profile"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Phone Number Step */}
            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Sending..." : t("continueBtn")}
                </Button>
              </form>
            )}

            {/* OTP Verification Step */}
            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">{t("otpCode")}</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="pl-10"
                      maxLength={4}
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-600">Demo OTP: 1234</p>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Verifying..." : t("verifyBtn")}
                </Button>

                <Button type="button" variant="outline" className="w-full" onClick={resendOTP}>
                  {t("resendOTP")}
                </Button>
              </form>
            )}

            {/* Role Selection Step */}
            {step === "role" && (
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 cursor-pointer"
                  onClick={() => handleRoleSubmit("user")}
                >
                  <User className="w-6 h-6 text-orange-600" />
                  <div className="flex-1">
                    <Label className="font-medium cursor-pointer">User</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t("userRole")}</p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 cursor-pointer"
                  onClick={() => handleRoleSubmit("admin")}
                >
                  <Shield className="w-6 h-6 text-orange-600" />
                  <div className="flex-1">
                    <Label className="font-medium cursor-pointer">Admin</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t("adminRole")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Step */}
            {step === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={profileData.age}
                      onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Your city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {role === "admin" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        placeholder="Your organization name"
                        value={profileData.organizationName}
                        onChange={(e) => setProfileData({ ...profileData, organizationName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type</Label>
                      <Input
                        id="orgType"
                        placeholder="NGO, Community Center, etc."
                        value={profileData.organizationType}
                        onChange={(e) => setProfileData({ ...profileData, organizationType: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                  />
                </div>

                {role === "user" && (
                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {interestOptions.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={profileData.interests.includes(interest)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setProfileData({
                                  ...profileData,
                                  interests: [...profileData.interests, interest],
                                })
                              } else {
                                setProfileData({
                                  ...profileData,
                                  interests: profileData.interests.filter((i) => i !== interest),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={interest} className="text-sm">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={profileData.agreeToTerms}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            )}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-orange-600 hover:underline font-medium">
                {t("login")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
