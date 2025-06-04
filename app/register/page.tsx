"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { AuthForm } from "@/components/auth-form"
import { authApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { RegisterFormData } from "@/lib/validations"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => authApi.register(data.name, data.email, data.password),
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please sign in.",
      })
      router.push("/login")
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">🎾 TennisBook</h1>
        </div>

        <AuthForm type="register" onSubmit={handleSubmit} isLoading={registerMutation.isPending} />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
