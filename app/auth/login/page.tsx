"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp" | "role">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [role, setRole] = useState<"user" | "admin">("user")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useTranslation()

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate OTP sending
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

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      if (otp === "1234") {
        // Demo OTP
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

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Successful",
        description: `Welcome back to Vyvahaar!`,
      })

      // Store auth data with actual user name from signup
      const existingUserData = localStorage.getItem("vyavahaar_user_profile")
      let userName = role === "admin" ? "Admin User" : "User"

      if (existingUserData) {
        const profileData = JSON.parse(existingUserData)
        userName = `${profileData.firstName} ${profileData.lastName}` || userName
      }

      const userData = {
        name: userName,
        avatar: "",
        initials: userName
          .split(" ")
          .map((n) => n[0])
          .join(""),
        phone: phoneNumber,
        role: role,
      }
      localStorage.setItem("vyavahaar_auth", JSON.stringify(userData))

      // Redirect based on role
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
            <CardTitle className="text-2xl font-bold text-orange-600">{t("welcomeBack")}</CardTitle>
            <CardDescription>
              {step === "phone" && t("enterPhone")}
              {step === "otp" && t("enterOTP")}
              {step === "role" && t("selectRole")}
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
              <form onSubmit={handleRoleSubmit} className="space-y-4">
                <RadioGroup value={role} onValueChange={(value: "user" | "admin") => setRole(value)}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20">
                    <RadioGroupItem value="user" id="user" />
                    <div className="flex-1">
                      <Label htmlFor="user" className="font-medium">
                        User
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t("userRole")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20">
                    <RadioGroupItem value="admin" id="admin" />
                    <div className="flex-1">
                      <Label htmlFor="admin" className="font-medium">
                        Admin
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t("adminRole")}</p>
                    </div>
                  </div>
                </RadioGroup>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Logging in..." : t("continueBtn")}
                </Button>
              </form>
            )}

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-orange-600 hover:underline font-medium">
                {t("signup")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
