"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { format } from "date-fns"
import { bookingsApi, paymentsApi, sessionsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { AuthGuard } from "@/components/auth-guard"
import { CreditCard, Wallet, Banknote } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card")

  const bookingId = searchParams.get("bookingId")
  const sessionId = searchParams.get("sessionId")

  // Fetch booking details
  const { data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => bookingsApi.getMyBookings().then(bookings => 
      bookings.find(b => b.id === Number(bookingId))
    ),
    enabled: !!bookingId,
  })

  // Fetch session details
  const { data: session } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => sessionsApi.getById(Number(sessionId!)),
    enabled: !!sessionId,
  })

  const paymentMutation = useMutation({
    mutationFn: (data: { bookingId: number; paymentMethod: string }) =>
      paymentsApi.create(data.bookingId, data.paymentMethod),
    onSuccess: () => {
      toast({
        title: "Payment successful",
        description: "Your session has been confirmed.",
      })
      router.push("/my-bookings")
    },
    onError: (error: any) => {
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const handlePayment = () => {
    if (bookingId) {
      paymentMutation.mutate({
        bookingId: Number(bookingId),
        paymentMethod,
      })
    }
  }

  if (!booking || !session) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Loading payment details...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-[#E5E7EB] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1F2937]">Payment Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Session Details */}
                <div className="space-y-4 p-4 bg-[#F9FAFB] rounded-lg">
                  <h3 className="font-semibold text-[#1F2937]">Session Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#4B5563]">Coach</p>
                      <p className="font-medium text-[#1F2937]">{session.coach.name}</p>
                    </div>
                    <div>
                      <p className="text-[#4B5563]">Date & Time</p>
                      <p className="font-medium text-[#1F2937]">
                        {format(new Date(session.date), "MMM d, yyyy")} at{" "}
                        {format(new Date(session.startTime), "h:mm a")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#4B5563]">Location</p>
                      <p className="font-medium text-[#1F2937]">{session.place}</p>
                    </div>
                    <div>
                      <p className="text-[#4B5563]">Total Amount</p>
                      <p className="font-medium text-[#10B981] text-lg">${booking.totalPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label className="text-[#1F2937]">Select Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="credit_card"
                        id="credit_card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="credit_card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-[#E5E7EB] bg-white p-4 hover:bg-[#F9FAFB] peer-data-[state=checked]:border-[#10B981] [&:has([data-state=checked])]:border-[#10B981] cursor-pointer"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-[#4B5563]" />
                        <span className="text-sm font-medium text-[#1F2937]">Credit Card</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="debit_card"
                        id="debit_card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="debit_card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-[#E5E7EB] bg-white p-4 hover:bg-[#F9FAFB] peer-data-[state=checked]:border-[#10B981] [&:has([data-state=checked])]:border-[#10B981] cursor-pointer"
                      >
                        <Banknote className="mb-2 h-6 w-6 text-[#4B5563]" />
                        <span className="text-sm font-medium text-[#1F2937]">Debit Card</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="e_wallet"
                        id="e_wallet"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="e_wallet"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-[#E5E7EB] bg-white p-4 hover:bg-[#F9FAFB] peer-data-[state=checked]:border-[#10B981] [&:has([data-state=checked])]:border-[#10B981] cursor-pointer"
                      >
                        <Wallet className="mb-2 h-6 w-6 text-[#4B5563]" />
                        <span className="text-sm font-medium text-[#1F2937]">E-Wallet</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Summary */}
                <div className="space-y-2 p-4 bg-[#F9FAFB] rounded-lg">
                  <h3 className="font-semibold text-[#1F2937]">Payment Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4B5563]">Session Price</span>
                    <span className="text-[#1F2937]">${session.pricePerPerson}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4B5563]">Number of Participants</span>
                    <span className="text-[#1F2937]">{booking.totalPrice / session.pricePerPerson}</span>
                  </div>
                  <div className="border-t border-[#E5E7EB] my-2"></div>
                  <div className="flex justify-between font-medium">
                    <span className="text-[#1F2937]">Total Amount</span>
                    <span className="text-[#10B981]">${booking.totalPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#1F2937]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={paymentMutation.isPending}
                    className="bg-[#10B981] hover:bg-[#10B981]/90 text-white"
                  >
                    {paymentMutation.isPending ? "Processing..." : "Confirm Payment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
} 