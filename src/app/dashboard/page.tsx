"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Star,
  Briefcase,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Demo analytics data
const kpiData = [
  {
    title: "Total Clients",
    value: "156",
    change: "+12%",
    changeType: "increase",
    icon: Users,
    description: "Active business clients"
  },
  {
    title: "Monthly Revenue",
    value: "GYD 847K",
    change: "+8.2%",
    changeType: "increase",
    icon: DollarSign,
    description: "Revenue this month"
  },
  {
    title: "Forms Processed",
    value: "2,847",
    change: "+15%",
    changeType: "increase",
    icon: FileText,
    description: "Forms filed this month"
  },
  {
    title: "Compliance Score",
    value: "98.5%",
    change: "+0.3%",
    changeType: "increase",
    icon: Shield,
    description: "Average client compliance"
  }
]

const recentActivity = [
  {
    id: "1",
    type: "filing",
    client: "TechFlow Solutions",
    action: "VAT Return submitted to GRA",
    amount: "GYD 45,670",
    time: "2 hours ago",
    status: "completed",
    priority: "normal"
  },
  {
    id: "2",
    type: "document",
    client: "Caribbean Imports",
    action: "Business License uploaded",
    amount: null,
    time: "4 hours ago",
    status: "pending_review",
    priority: "medium"
  },
  {
    id: "3",
    type: "alert",
    client: "Sarah Johnson",
    action: "Income Tax deadline approaching",
    amount: null,
    time: "6 hours ago",
    status: "alert",
    priority: "high"
  },
  {
    id: "4",
    type: "payment",
    client: "Global Services Ltd",
    action: "Service fee payment received",
    amount: "GYD 15,500",
    time: "1 day ago",
    status: "completed",
    priority: "normal"
  },
  {
    id: "5",
    type: "filing",
    client: "Local Retail Co",
    action: "NIS contribution filed",
    amount: "GYD 8,230",
    time: "1 day ago",
    status: "completed",
    priority: "normal"
  }
]

const agencyStatus = [
  {
    agency: "GRA",
    name: "Guyana Revenue Authority",
    totalForms: 1247,
    pending: 23,
    approved: 1195,
    rejected: 29,
    successRate: 97.6,
    avgProcessingTime: "3.2 days"
  },
  {
    agency: "NIS",
    name: "National Insurance Scheme",
    totalForms: 856,
    pending: 12,
    approved: 831,
    rejected: 13,
    successRate: 98.5,
    avgProcessingTime: "1.8 days"
  },
  {
    agency: "DCRA",
    name: "Deeds & Commercial Registry",
    totalForms: 234,
    pending: 8,
    approved: 218,
    rejected: 8,
    successRate: 96.5,
    avgProcessingTime: "5.1 days"
  },
  {
    agency: "BOG",
    name: "Bank of Guyana",
    totalForms: 67,
    pending: 3,
    approved: 62,
    rejected: 2,
    successRate: 96.9,
    avgProcessingTime: "7.2 days"
  }
]

const complianceMetrics = [
  { category: "Tax Compliance", score: 98, trend: "+2.1%" },
  { category: "Business Registration", score: 95, trend: "+0.8%" },
  { category: "Employment Compliance", score: 96, trend: "+1.3%" },
  { category: "Environmental Compliance", score: 92, trend: "-0.5%" },
  { category: "Financial Reporting", score: 97, trend: "+1.8%" }
]

const upcomingDeadlines = [
  {
    client: "TechFlow Solutions",
    task: "VAT Return Filing",
    agency: "GRA",
    dueDate: "2025-12-21",
    daysLeft: 1,
    priority: "high",
    type: "monthly"
  },
  {
    client: "Caribbean Imports",
    task: "Business License Renewal",
    agency: "DCRA",
    dueDate: "2025-12-25",
    daysLeft: 5,
    priority: "medium",
    type: "annual"
  },
  {
    client: "Sarah Johnson",
    task: "Income Tax Return",
    agency: "GRA",
    dueDate: "2026-03-31",
    daysLeft: 101,
    priority: "normal",
    type: "annual"
  },
  {
    client: "Global Services",
    task: "NIS Contribution",
    agency: "NIS",
    dueDate: "2025-12-15",
    daysLeft: -5,
    priority: "overdue",
    type: "monthly"
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">GCMC-KAJ Platform</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/clients">
                <Button variant="ghost">Clients</Button>
              </Link>
              <Link href="/forms">
                <Button variant="ghost">Forms</Button>
              </Link>
              <Link href="/reports">
                <Button variant="ghost">Reports</Button>
              </Link>
              <Button className="btn-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Quick Action
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive business insights for GCMC and KAJ Financial Services
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpiData.map((kpi, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold mb-2">{kpi.value}</p>
                      <div className="flex items-center space-x-1">
                        {kpi.changeType === 'increase' ? (
                          <ArrowUpRight className="w-3 h-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs font-medium ${
                          kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <kpi.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest business activities and transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          {activity.type === 'filing' && <FileText className="w-4 h-4 text-primary" />}
                          {activity.type === 'document' && <CheckCircle className="w-4 h-4 text-blue-500" />}
                          {activity.type === 'alert' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                          {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-green-500" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xs text-muted-foreground">{activity.client}</p>
                            {activity.amount && (
                              <>
                                <span className="text-xs text-muted-foreground">•</span>
                                <p className="text-xs font-medium text-green-600">{activity.amount}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        <Badge variant={
                          activity.status === 'completed' ? 'secondary' :
                          activity.status === 'pending_review' ? 'warning' :
                          activity.status === 'alert' ? 'destructive' : 'outline'
                        }>
                          {activity.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Deadlines
                  </CardTitle>
                  <CardDescription>
                    Critical filing and compliance deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{deadline.task}</p>
                          <p className="text-xs text-muted-foreground">{deadline.client}</p>
                        </div>
                        <Badge variant={
                          deadline.priority === 'overdue' ? 'destructive' :
                          deadline.priority === 'high' ? 'destructive' :
                          deadline.priority === 'medium' ? 'warning' : 'secondary'
                        }>
                          {deadline.priority === 'overdue' ? `${Math.abs(deadline.daysLeft)}d overdue` :
                           deadline.daysLeft === 1 ? 'Tomorrow' :
                           `${deadline.daysLeft}d left`}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{deadline.agency}</span>
                        <span className="text-muted-foreground">
                          {new Date(deadline.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Agency Performance and Compliance Metrics */}
        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="agencies" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agencies">Agency Performance</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Metrics</TabsTrigger>
              <TabsTrigger value="financial">Financial Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="agencies" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agencyStatus.map((agency, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{agency.agency}</Badge>
                          <span className="font-medium text-sm">{agency.name}</span>
                        </div>
                        <Badge variant="secondary">{agency.successRate}%</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{agency.approved}</p>
                          <p className="text-xs text-muted-foreground">Approved</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-600">{agency.pending}</p>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">{agency.rejected}</p>
                          <p className="text-xs text-muted-foreground">Rejected</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Success Rate</span>
                          <span>{agency.successRate}%</span>
                        </div>
                        <Progress value={agency.successRate} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Avg. Processing Time</span>
                        <span>{agency.avgProcessingTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complianceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{metric.category}</h3>
                        <Badge variant={metric.score >= 95 ? 'secondary' : 'warning'}>
                          {metric.score}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={metric.score} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Trend</span>
                          <span className={`text-xs font-medium flex items-center ${
                            metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {metric.trend.startsWith('+') ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold mb-1">Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">GYD 847K</p>
                    <p className="text-sm text-muted-foreground">+8.2% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold mb-1">Target Achievement</h3>
                    <p className="text-3xl font-bold text-blue-600">94%</p>
                    <p className="text-sm text-muted-foreground">Monthly target progress</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <h3 className="font-semibold mb-1">Client Satisfaction</h3>
                    <p className="text-3xl font-bold text-yellow-600">4.8</p>
                    <p className="text-sm text-muted-foreground">Average rating (5.0)</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}