"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Navigation,
  Clock,
  Gift,
  Shield,
  QrCode,
  Camera,
  Smartphone,
  Star,
  Award,
  Heart,
  Activity,
  Bell,
  User,
  Wallet,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const nearbyRequests = [
  {
    id: 1,
    hospital: "City General Hospital",
    bloodType: "A+",
    urgency: "Critical",
    distance: 0.8,
    waitTime: 5,
    incentive: "Free coffee + $10 voucher",
    address: "123 Medical Center Dr",
    needed: 15,
    color: "#dc2626",
  },
  {
    id: 2,
    hospital: "St. Mary's Medical Center",
    bloodType: "O-",
    urgency: "High",
    distance: 1.2,
    waitTime: 12,
    incentive: "Priority parking + Badge",
    address: "456 Healthcare Ave",
    needed: 8,
    color: "#ea580c",
  },
  {
    id: 3,
    hospital: "University Hospital",
    bloodType: "B+",
    urgency: "Medium",
    distance: 2.1,
    waitTime: 8,
    incentive: "Health screening + Points",
    address: "789 Campus Blvd",
    needed: 12,
    color: "#ca8a04",
  },
]

const donorProfile = {
  name: "Sarah Johnson",
  bloodType: "A+",
  totalDonations: 23,
  lastDonation: "2024-11-15",
  nextEligible: "2024-12-29",
  points: 2340,
  badges: ["Regular Donor", "Life Saver", "Community Hero"],
  blockchainId: "0x742d35Cc6634C0532925a3b8D4C0d8b3f8e8f8e8",
  verificationStatus: "Verified",
}

export default function DonorApp() {
  const [mounted, setMounted] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(nearbyRequests[0])
  const [arMode, setArMode] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-red-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BloodFlow Donor</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Critical Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">🚨 Critical Blood Shortage Alert</h3>
              <p className="text-sm opacity-90">A+ blood urgently needed at City General Hospital (0.8km away)</p>
            </div>
            <Button className="bg-white text-red-600 hover:bg-gray-100">Respond Now</Button>
          </div>
        </motion.div>

        <Tabs defaultValue="nearby" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="blockchain">Wallet</TabsTrigger>
            <TabsTrigger value="ar">AR Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Blood Requests Near You
                </CardTitle>
                <CardDescription>AI-powered geofenced alerts based on your location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nearbyRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: request.id * 0.1 }}
                    className={`p-4 border-l-4 rounded-lg cursor-pointer transition-all ${
                      selectedRequest.id === request.id ? "bg-blue-50 border-blue-500" : "bg-white border-gray-200"
                    }`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.hospital}</h4>
                        <p className="text-sm text-gray-600">{request.address}</p>
                      </div>
                      <div className="text-right">
                        <Badge style={{ backgroundColor: request.color }} className="text-white mb-1">
                          {request.bloodType}
                        </Badge>
                        <div className="text-xs text-gray-500">{request.needed} units needed</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{request.distance}km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{request.waitTime} min wait</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            request.urgency === "Critical"
                              ? "border-red-500 text-red-700"
                              : request.urgency === "High"
                                ? "border-orange-500 text-orange-700"
                                : "border-yellow-500 text-yellow-700"
                          }`}
                        >
                          {request.urgency}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center gap-2 text-green-800">
                        <Gift className="w-4 h-4" />
                        <span className="text-sm font-medium">Incentive: {request.incentive}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => setArMode(true)}
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        AR Navigate
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Clock className="w-3 h-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Donor Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {donorProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{donorProfile.name}</h3>
                    <p className="text-gray-600">Blood Type: {donorProfile.bloodType}</p>
                    <Badge className="mt-1 bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      {donorProfile.verificationStatus}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{donorProfile.totalDonations}</div>
                    <div className="text-sm text-gray-600">Total Donations</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{donorProfile.points}</div>
                    <div className="text-sm text-gray-600">Reward Points</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Achievement Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {donorProfile.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Last Donation:</span>
                    <span className="font-medium">{donorProfile.lastDonation}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Eligible:</span>
                    <span className="font-medium text-green-600">{donorProfile.nextEligible}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-purple-600" />
                  Blockchain Health Wallet
                </CardTitle>
                <CardDescription>Cryptographic health profile and credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Health Credential NFT</h3>
                      <p className="text-sm opacity-90">Verified Blood Donor Profile</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-xs opacity-75 font-mono break-all">{donorProfile.blockchainId}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <QrCode className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-medium">Instant Verify</div>
                    <div className="text-xs text-gray-600">2.3s avg time</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-sm font-medium">Network Rating</div>
                    <div className="text-xs text-gray-600">4.9/5.0 stars</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Verified Credentials</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Blood Type Verification</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Health Screening</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Donation History</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">23 donations</Badge>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <QrCode className="w-4 h-4 mr-2" />
                  Share Credential QR
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-600" />
                  AR Navigation Guide
                </CardTitle>
                <CardDescription>Augmented reality directions to donation centers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {arMode ? (
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <Navigation className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">AR Camera Active</h3>
                        <p className="text-sm opacity-90">Follow the blue path to City General Hospital</p>
                      </div>

                      {/* AR Overlay Elements */}
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        0.8km → City General
                      </div>
                      <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        5 min wait
                      </div>
                      <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        $10 voucher
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">City General Hospital</h4>
                          <p className="text-sm text-gray-600">123 Medical Center Dr</p>
                        </div>
                      </div>
                      <Progress value={75} className="mb-2" />
                      <p className="text-sm text-gray-600">3 minutes remaining • Turn right in 100m</p>
                    </div>

                    <Button onClick={() => setArMode(false)} variant="outline" className="w-full">
                      Exit AR Mode
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Smartphone className="w-12 h-12 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">AR Navigation Ready</h3>
                      <p className="text-gray-600 mb-4">
                        Use your camera to get real-time directions to the nearest donation center with live wait times
                        and incentives.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Navigation className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">Turn-by-turn AR directions</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Live wait times and capacity</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Gift className="w-5 h-5 text-purple-600" />
                        <span className="text-sm">Real-time incentives and rewards</span>
                      </div>
                    </div>

                    <Button onClick={() => setArMode(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Camera className="w-4 h-4 mr-2" />
                      Start AR Navigation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
