import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-[#3B82F6]/10 rounded-3xl"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Professional tennis player serving on court"
                className="rounded-2xl shadow-2xl w-full h-64 object-cover border-2 border-[#E5E7EB]"
              />
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Tennis coaching session with multiple players"
                className="rounded-2xl shadow-xl w-full h-48 object-cover border-2 border-[#E5E7EB]"
              />
            </div>
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Modern tennis facility with multiple courts"
                className="rounded-2xl shadow-xl w-full h-48 object-cover border-2 border-[#E5E7EB]"
              />
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Tennis players celebrating after a great match"
                className="rounded-2xl shadow-2xl w-full h-64 object-cover border-2 border-[#E5E7EB]"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1F2937] mb-6">Book Your Tennis Session Today</h1>
          <p className="text-xl text-[#4B5563] mb-8 max-w-2xl mx-auto">
            Connect with professional tennis coaches and book your perfect session. Whether you're a beginner or
            advanced player, we have the right coach for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3 bg-[#10B981] hover:bg-[#10B981]/90 text-white">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white"
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1F2937]">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardHeader>
              <div className="mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                  alt="Tennis player browsing sessions on mobile app"
                  className="w-full h-32 object-cover rounded-lg border border-[#E5E7EB]"
                />
              </div>
              <CardTitle className="text-[#1F2937]">1. Choose Your Session</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#4B5563]">
                Browse available sessions and select the perfect time slot with your preferred coach and court type.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardHeader>
              <div className="mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                  alt="Quick booking confirmation on smartphone"
                  className="w-full h-32 object-cover rounded-lg border border-[#E5E7EB]"
                />
              </div>
              <CardTitle className="text-[#1F2937]">2. Book Instantly</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#4B5563]">
                Secure your spot with just a few clicks. Choose private or group sessions based on your preference.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardHeader>
              <div className="mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                  alt="Tennis player improving skills with professional coach"
                  className="w-full h-32 object-cover rounded-lg border border-[#E5E7EB]"
                />
              </div>
              <CardTitle className="text-[#1F2937]">3. Play & Improve</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#4B5563]">
                Show up and enjoy your session with professional coaching to improve your game.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Coach Spotlight Section */}
      <section className="container mx-auto px-4 py-16 bg-[#F9FAFB]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1F2937]">Meet Our Professional Coaches</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Coach Sarah Johnson"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#10B981]"
              />
              <h3 className="font-semibold text-[#1F2937] mb-1">Sarah Johnson</h3>
              <p className="text-sm text-[#4B5563] mb-2">Former Pro Player</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs text-[#4B5563]">10+ years experience</p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Coach Mike Chen"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#10B981]"
              />
              <h3 className="font-semibold text-[#1F2937] mb-1">Mike Chen</h3>
              <p className="text-sm text-[#4B5563] mb-2">Youth Specialist</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs text-[#4B5563]">8+ years experience</p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Coach Emma Davis"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#10B981]"
              />
              <h3 className="font-semibold text-[#1F2937] mb-1">Emma Davis</h3>
              <p className="text-sm text-[#4B5563] mb-2">Technical Expert</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs text-[#4B5563]">12+ years experience</p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow border-[#E5E7EB] bg-white">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Coach Alex Rodriguez"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#10B981]"
              />
              <h3 className="font-semibold text-[#1F2937] mb-1">Alex Rodriguez</h3>
              <p className="text-sm text-[#4B5563] mb-2">Fitness & Strategy</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs text-[#4B5563]">9+ years experience</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1F2937]">Why Choose TennisBook?</h2>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#10B981] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#1F2937]">Professional Coaches</h3>
                  <p className="text-[#4B5563]">
                    All our coaches are certified professionals with years of experience teaching players of all levels.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#10B981] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#1F2937]">Premium Facilities</h3>
                  <p className="text-[#4B5563]">
                    Train on professional-grade courts with the latest equipment and perfect playing conditions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#10B981] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#1F2937]">Flexible Scheduling</h3>
                  <p className="text-[#4B5563]">
                    Book sessions that fit your schedule with our easy-to-use calendar system.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#10B981] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#1F2937]">Private & Group Options</h3>
                  <p className="text-[#4B5563]">
                    Choose between one-on-one private sessions or join group sessions to meet other players.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:order-first space-y-4">
              <img
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                alt="Happy tennis players celebrating on court"
                className="w-full h-64 object-cover rounded-2xl shadow-xl border-2 border-[#E5E7EB]"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                  alt="Tennis equipment and accessories"
                  className="w-full h-32 object-cover rounded-lg shadow-lg border border-[#E5E7EB]"
                />
                <img
                  src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
                  alt="Tennis court aerial view"
                  className="w-full h-32 object-cover rounded-lg shadow-lg border border-[#E5E7EB]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16 text-center bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
              alt="Tennis academy with multiple courts and facilities"
              className="mx-auto rounded-2xl shadow-lg w-full h-48 object-cover border-2 border-[#E5E7EB]"
            />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-[#1F2937]">Ready to Get Started?</h2>
          <p className="text-xl text-[#4B5563] mb-8 max-w-2xl mx-auto">
            Join thousands of players who have improved their game with our professional coaching sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3 bg-[#10B981] hover:bg-[#10B981]/90 text-white">
              <Link href="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
