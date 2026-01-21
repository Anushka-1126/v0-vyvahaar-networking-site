"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, X, Crown, Zap } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"
import { useTranslation } from "@/lib/translations"

interface SubscriptionPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionPopup({ isOpen, onClose }: SubscriptionPopupProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ amount: number; description: string } | null>(null)
  const { t } = useTranslation()

  const handleSubscribe = (amount: number, description: string) => {
    setSelectedPlan({ amount, description })
    setShowPaymentModal(true)
    onClose()
  }

  const features = [
    "Access to all premium events",
    "Priority customer support",
    "Advanced matching algorithms",
    "Video calling features",
    "Exclusive community groups",
    "Monthly wellness workshops",
  ]

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-orange-600" />
              Upgrade to Vyvahaar Premium
            </DialogTitle>
            <DialogDescription className="text-center">
              Unlock exclusive features and connect with more senior citizens
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Monthly Plan */}
            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <CardHeader className="text-center">
                <Badge className="w-fit mx-auto bg-orange-100 text-orange-700">Most Popular</Badge>
                <CardTitle className="text-xl">Monthly Plan</CardTitle>
                <div className="text-3xl font-bold text-orange-600">₹99</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => handleSubscribe(99, "Vyvahaar Premium - Monthly Subscription")}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {t("subscribeNow")}
                </Button>
              </CardContent>
            </Card>

            {/* Lifetime Plan */}
            <Card className="border-2 border-amber-200 hover:border-amber-400 transition-colors relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">Best Value</Badge>
              </div>
              <CardHeader className="text-center pt-6">
                <CardTitle className="text-xl">Lifetime Plan</CardTitle>
                <div className="text-3xl font-bold text-amber-600">₹4,999</div>
                <p className="text-gray-600">one-time payment</p>
                <p className="text-sm text-green-600 font-medium">Save ₹7,000+ annually</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium">Lifetime access guarantee</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={() => handleSubscribe(4999, "Vyvahaar Premium - Lifetime Access")}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  {t("getLifetime")}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="ghost" onClick={onClose} className="text-gray-500">
              <X className="w-4 h-4 mr-2" />
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedPlan.amount}
          description={selectedPlan.description}
        />
      )}
    </>
  )
}
