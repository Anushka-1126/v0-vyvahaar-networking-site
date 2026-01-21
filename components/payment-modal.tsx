"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Smartphone, Building, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  description: string
}

export function PaymentModal({ isOpen, onClose, amount, description }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [upiId, setUpiId] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const { toast } = useToast()
  const { t } = useTranslation()

  const handlePayment = () => {
    // Simulate payment processing
    toast({
      title: "Payment Successful",
      description: `Payment of ₹${amount} completed successfully!`,
    })
    onClose()
  }

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Display */}
          <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold">₹{amount}</div>
              <div className="text-orange-100">Total Amount</div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="card" className="text-xs">
                <CreditCard className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="upi" className="text-xs">
                <Smartphone className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="netbanking" className="text-xs">
                <Building className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="wallet" className="text-xs">
                Wallet
              </TabsTrigger>
            </TabsList>

            {/* Credit/Debit Card */}
            <TabsContent value="card" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">{t("expiryDate")}</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">{t("cvv")}</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* UPI */}
            <TabsContent value="upi" className="space-y-4">
              <div>
                <Label htmlFor="upiId">{t("upiId")}</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Or scan QR code</p>
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-gray-500">QR Code</span>
                </div>
              </div>
            </TabsContent>

            {/* Net Banking */}
            <TabsContent value="netbanking" className="space-y-4">
              <div>
                <Label>Select Your Bank</Label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* Wallet */}
            <TabsContent value="wallet" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col">
                  <span className="font-semibold">Paytm</span>
                  <span className="text-xs">Wallet</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <span className="font-semibold">PhonePe</span>
                  <span className="text-xs">Wallet</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <span className="font-semibold">Google Pay</span>
                  <span className="text-xs">Wallet</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <span className="font-semibold">Amazon Pay</span>
                  <span className="text-xs">Wallet</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Security Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Shield className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Payment Button */}
          <Button onClick={handlePayment} className="w-full bg-orange-600 hover:bg-orange-700">
            Pay ₹{amount}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
