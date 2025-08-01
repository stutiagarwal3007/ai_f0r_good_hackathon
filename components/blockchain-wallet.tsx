"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, Shield, QrCode, Star, Copy, ExternalLink, CheckCircle, Clock, Award, Zap } from "lucide-react"

interface BlockchainWalletProps {
  donorProfile: {
    name: string
    bloodType: string
    totalDonations: number
    blockchainId: string
    verificationStatus: string
  }
}

export function BlockchainWallet({ donorProfile }: BlockchainWalletProps) {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const credentials = [
    {
      type: "Blood Type Verification",
      status: "Verified",
      issuer: "Central Lab Network",
      date: "2024-01-15",
      hash: "0x8f2a...c4d9",
      icon: Shield,
    },
    {
      type: "Health Screening",
      status: "Valid",
      issuer: "Regional Health Authority",
      date: "2024-12-01",
      hash: "0x3b7e...f2a1",
      icon: CheckCircle,
    },
    {
      type: "Donation History",
      status: "23 donations",
      issuer: "BloodFlow Network",
      date: "2024-12-25",
      hash: "0x9c4f...e8b3",
      icon: Award,
    },
  ]

  const peerReviews = [
    {
      hospital: "City General Hospital",
      rating: 5,
      comment: "Excellent donor experience, professional staff",
      date: "2024-12-20",
    },
    {
      hospital: "St. Mary's Medical Center",
      rating: 5,
      comment: "Quick processing, clean facilities",
      date: "2024-12-10",
    },
    {
      hospital: "University Hospital",
      rating: 4,
      comment: "Good service, minor wait time",
      date: "2024-11-28",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Blockchain Credential Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            Blockchain Health Wallet
          </CardTitle>
          <CardDescription>Cryptographic health profile and instant verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* NFT-style Credential Display */}
          <div className="p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Health Credential NFT</h3>
                <p className="text-sm opacity-90">Verified Blood Donor Profile</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="opacity-75">Name:</span>
                <span className="font-semibold">{donorProfile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">Blood Type:</span>
                <span className="font-semibold">{donorProfile.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">Donations:</span>
                <span className="font-semibold">{donorProfile.totalDonations}</span>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-75 font-mono break-all">{donorProfile.blockchainId}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => copyToClipboard(donorProfile.blockchainId)}
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
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
            <div className="text-center p-4 border rounded-lg">
              <Zap className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-sm font-medium">Gas Optimized</div>
              <div className="text-xs text-gray-600">$0.02 per tx</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Dialog open={showQR} onOpenChange={setShowQR}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <QrCode className="w-4 h-4 mr-2" />
                  Share QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Blockchain Credential QR</DialogTitle>
                  <DialogDescription>Scan this QR code to instantly verify donor credentials</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-6">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm text-gray-600">QR Code</p>
                      <p className="text-xs text-gray-500 mt-1">Blockchain Credential</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => copyToClipboard(donorProfile.blockchainId)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Address
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex-1 bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              Blockchain Explorer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verified Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Verified Credentials</CardTitle>
          <CardDescription>Cryptographically signed health certificates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {credentials.map((credential, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <credential.icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">{credential.type}</h4>
                  <p className="text-sm text-gray-600">
                    Issued by {credential.issuer} • {credential.date}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">{credential.hash}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">{credential.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Peer Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Network Peer Reviews</CardTitle>
          <CardDescription>Anonymous feedback from healthcare institutions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {peerReviews.map((review, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{review.hospital}</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">"{review.comment}"</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {review.date}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
