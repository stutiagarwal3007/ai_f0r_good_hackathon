"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Globe2,
  Calendar,
  AlertTriangle,
  Activity,
  TrendingUp,
  MapPin,
  Cloud,
  Users,
  Zap,
  BarChart3,
  LineChart,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion } from "framer-motion"

// Enhanced AI prediction data sources
const dataSourcesMetrics = [
  {
    source: "Historical Transfusion Data",
    accuracy: 0.94,
    dataPoints: 2500000,
    updateFreq: "Real-time",
    impact: "High",
    icon: Activity,
    color: "#ef4444",
  },
  {
    source: "Climate & Weather Data",
    accuracy: 0.87,
    dataPoints: 150000,
    updateFreq: "Hourly",
    impact: "High",
    icon: Cloud,
    color: "#3b82f6",
  },
  {
    source: "Social Events Calendar",
    accuracy: 0.91,
    dataPoints: 45000,
    updateFreq: "Daily",
    impact: "Medium",
    icon: Calendar,
    color: "#8b5cf6",
  },
  {
    source: "Demographics & Health Stats",
    accuracy: 0.89,
    dataPoints: 890000,
    updateFreq: "Weekly",
    impact: "High",
    icon: Users,
    color: "#10b981",
  },
  {
    source: "Emergency Services Data",
    accuracy: 0.96,
    dataPoints: 75000,
    updateFreq: "Real-time",
    impact: "Critical",
    icon: AlertTriangle,
    color: "#f59e0b",
  },
]

const multiSourcePredictions = [
  {
    date: "2024-12-26",
    baseline: 85,
    climate: 92,
    events: 78,
    demographics: 88,
    emergency: 95,
    combined: 89,
  },
  {
    date: "2024-12-27",
    baseline: 82,
    climate: 88,
    events: 85,
    demographics: 84,
    emergency: 90,
    combined: 86,
  },
  {
    date: "2024-12-28",
    baseline: 78,
    climate: 85,
    events: 95,
    demographics: 82,
    emergency: 88,
    combined: 91,
  },
  {
    date: "2024-12-29",
    baseline: 88,
    climate: 90,
    events: 72,
    demographics: 86,
    emergency: 85,
    combined: 84,
  },
]

const riskFactorAnalysis = [
  {
    factor: "Monsoon Season",
    probability: 0.85,
    impact: "High",
    bloodTypes: ["O+", "O-", "A+"],
    timeframe: "Next 7 days",
    description: "Heavy rainfall increases accident rates by 35%",
  },
  {
    factor: "Music Festival",
    probability: 0.72,
    impact: "Medium",
    bloodTypes: ["A+", "B+", "AB+"],
    timeframe: "This weekend",
    description: "50,000 attendees expected downtown",
  },
  {
    factor: "Dengue Outbreak",
    probability: 0.91,
    impact: "Critical",
    bloodTypes: ["A+", "AB+", "B+"],
    timeframe: "Ongoing",
    description: "Cases rising 40% in District 5",
  },
  {
    factor: "Surgery Backlog",
    probability: 0.88,
    impact: "High",
    bloodTypes: ["O-", "A-", "B-"],
    timeframe: "Next 14 days",
    description: "Cardiac surgery queue increased post-holiday",
  },
]

const geospatialData = [
  { district: "Downtown", risk: 85, population: 250000, hospitals: 8, x: 45, y: 65 },
  { district: "Midtown", risk: 72, population: 180000, hospitals: 5, x: 65, y: 45 },
  { district: "Uptown", risk: 91, population: 320000, hospitals: 12, x: 25, y: 35 },
  { district: "Suburbs", risk: 58, population: 150000, hospitals: 3, x: 85, y: 75 },
  { district: "Industrial", risk: 76, population: 95000, hospitals: 2, x: 15, y: 85 },
]

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"]

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-red-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Analytics Hub</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            15 Data Sources Active
          </Badge>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
                <Brain className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">3.6M</div>
                <p className="text-xs text-muted-foreground">Processed this month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Factors</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">4</div>
                <p className="text-xs text-muted-foreground">Active high-impact factors</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Model Updates</CardTitle>
                <Zap className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Real-time</div>
                <p className="text-xs text-muted-foreground">Continuous learning active</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="data-sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="predictions">Multi-Source Predictions</TabsTrigger>
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="geospatial">Geospatial Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="data-sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-blue-600" />
                  AI Data Sources Performance
                </CardTitle>
                <CardDescription>Real-time monitoring of 15+ integrated data sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {dataSourcesMetrics.map((source, index) => (
                      <motion.div
                        key={source.source}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${source.color}20` }}
                            >
                              <source.icon className="w-5 h-5" style={{ color: source.color }} />
                            </div>
                            <div>
                              <h4 className="font-semibold">{source.source}</h4>
                              <p className="text-sm text-gray-600">{source.dataPoints.toLocaleString()} data points</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              source.impact === "Critical"
                                ? "destructive"
                                : source.impact === "High"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {source.impact}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Accuracy:</span>
                            <span className="font-medium">{Math.round(source.accuracy * 100)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Update Frequency:</span>
                            <span className="font-medium">{source.updateFreq}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Data Source Accuracy Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={dataSourcesMetrics}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="accuracy"
                          label={({ source, accuracy }) => `${source.split(" ")[0]}: ${Math.round(accuracy * 100)}%`}
                        >
                          {dataSourcesMetrics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-green-600" />
                  Multi-Source Prediction Models
                </CardTitle>
                <CardDescription>Comparing individual vs combined AI model performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsLineChart data={multiSourcePredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="baseline" stroke="#6b7280" strokeWidth={1} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="climate" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="events" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="demographics" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="emergency" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="combined" stroke="#ef4444" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-4 h-4 bg-gray-400 mx-auto mb-1"></div>
                    <div className="text-xs">Baseline</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-blue-500 mx-auto mb-1"></div>
                    <div className="text-xs">Climate</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-purple-500 mx-auto mb-1"></div>
                    <div className="text-xs">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-green-500 mx-auto mb-1"></div>
                    <div className="text-xs">Demographics</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-yellow-500 mx-auto mb-1"></div>
                    <div className="text-xs">Emergency</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-red-500 mx-auto mb-1"></div>
                    <div className="text-xs font-semibold">Combined AI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Risk Factor Analysis
                </CardTitle>
                <CardDescription>AI-identified factors influencing blood demand patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskFactorAnalysis.map((risk, index) => (
                  <motion.div
                    key={risk.factor}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{risk.factor}</h4>
                        <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            risk.impact === "Critical"
                              ? "destructive"
                              : risk.impact === "High"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {risk.impact} Impact
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">{risk.timeframe}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        {risk.bloodTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm font-medium">{Math.round(risk.probability * 100)}% probability</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          risk.probability > 0.8
                            ? "bg-red-500"
                            : risk.probability > 0.6
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${risk.probability * 100}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geospatial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Regional Risk Mapping
                  </CardTitle>
                  <CardDescription>AI-powered geospatial analysis of blood demand risk</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={geospatialData}>
                      <CartesianGrid />
                      <XAxis type="number" dataKey="x" name="longitude" />
                      <YAxis type="number" dataKey="y" name="latitude" />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-semibold">{data.district}</p>
                                <p className="text-sm">Risk Score: {data.risk}%</p>
                                <p className="text-sm">Population: {data.population.toLocaleString()}</p>
                                <p className="text-sm">Hospitals: {data.hospitals}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter
                        dataKey="risk"
                        fill="#ef4444"
                        shape={(props) => {
                          const { cx, cy, payload } = props
                          const size = Math.max(5, (payload.population / 50000) * 10)
                          return <circle cx={cx} cy={cy} r={size} fill="#ef4444" opacity={0.7} />
                        }}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>District Risk Summary</CardTitle>
                  <CardDescription>Population-weighted risk assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {geospatialData
                    .sort((a, b) => b.risk - a.risk)
                    .map((district, index) => (
                      <div key={district.district} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{district.district}</h4>
                          <p className="text-sm text-gray-600">
                            {district.population.toLocaleString()} residents • {district.hospitals} hospitals
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">{district.risk}%</div>
                          <Badge
                            variant={district.risk > 80 ? "destructive" : district.risk > 60 ? "secondary" : "outline"}
                          >
                            {district.risk > 80 ? "High Risk" : district.risk > 60 ? "Medium Risk" : "Low Risk"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
