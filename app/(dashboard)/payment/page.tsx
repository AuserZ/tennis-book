"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { bookingsApi } from "@/lib/api/bookings"
import { useToast } from "@/hooks/use-toast"
import { Banknote } from "lucide-react"
import { formatTime } from "@/lib/utils"
import { paymentsApi } from "@/lib/api"
import { PaymentModal } from "@/components/payment-modal"

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const bookingId = searchParams.get("bookingid")

  const { data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => bookingsApi.getByID(Number(bookingId)),
    enabled: !!bookingId,
  })

  // Calculate total price based on session data and participants
  const totalPrice = booking ? booking.totalPrice : 0

  // Mutation to create DOKU payment and get redirect URL
  const dokuPaymentMutation = useMutation({
    mutationFn: async () => {
      if (!bookingId) {
        throw new Error("Missing session information")
      }
      // Call backend to create DOKU payment and get redirect URL
      const response = await paymentsApi.createDokuPayment(Number(bookingId))
      return response
    },
    onSuccess: (data) => {
      const url =
        (data && (data as any).redirectUrl) ||
        (data && (data as any).response?.payment?.url) ||
        (data && (data as any).payment?.url)

      if (url) {
        setPaymentUrl(url as string)
        setPaymentModalOpen(true)
        return
      }

      toast({
        title: "Payment Error",
        description: "Failed to get DOKU payment URL.",
        variant: "destructive",
      })
    },
    onError: (error) => {
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      await dokuPaymentMutation.mutateAsync()
    } catch (e) {
      console.log(e)
    }
  }

  if (!booking) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Invalid Booking</h1>
        <p>Please select a valid booking to book.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <div>
        <Card className="p-6 w-full">
          <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Session Summary</CardTitle>
            <Button variant="outline" className="text-sm px-3 py-1 h-auto" onClick={() => router.push(`/payment?bookingid=${booking.id}`)}>Edit</Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-4">
              {booking && (
                <div className="flex items-start space-x-4">
                  <img
                    src={
                      // session.tennisField.photoUrl || Temp since url is 404
                      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                    }
                    alt={`${booking.session.tennisField.name} tennis court`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{booking.session.coach.name} - {booking.session.tennisField.name}</h3>
                    <p className="text-sm text-gray-500">{format(new Date(booking.session.date), "PPP")} at {formatTime(booking.session.startTime)}</p>
                    <p className="text-sm text-gray-500">Participants: {booking.participants}</p>
                    <p className="text-lg font-semibold">Rp. {booking.session.pricePerPerson * Number(booking.participants)}</p>
                  </div>
                </div>
              )}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>Rp. {totalPrice}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button
          type="button"
          onClick={handlePayment}
          disabled={dokuPaymentMutation.isPending}
          className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white mt-8"
        >
          {dokuPaymentMutation.isPending ? "Processing..." : "Pay with DOKU"}
        </Button>
        <p className="text-xs text-gray-500 mt-4 text-center">100% secure payment via DOKU</p>
        {paymentUrl && (
          <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} paymentUrl={paymentUrl} />
        )}
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Loading payment details...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
} 
