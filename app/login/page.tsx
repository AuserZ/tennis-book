"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { AuthForm } from "@/components/auth-form"
import { authApi } from "@/lib/api/auth"
import { setToken } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import type { LoginFormData } from "@/lib/validations"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data.email, data.password),
    onSuccess: (response) => {
      if (response && response.token) {
        setToken(response.token)
        toast({
          title: "Login successful",
          description: "Welcome back! Redirecting to dashboard...",
        })
        router.push("/")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid response from server",
          variant: "destructive",
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (data: LoginFormData) => {
    console.log(data)
    loginMutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">🎾 TennisBook</h1>
        </div>

        <AuthForm type="login" onSubmit={handleSubmit} isLoading={loginMutation.isPending} />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
