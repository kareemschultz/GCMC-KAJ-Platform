"use client"

import { motion } from "framer-motion"
import {
  Building2,
  FileCheck,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

// Demo data
const complianceMetrics = [
  { label: "Overall Score", value: "98.5%", icon: Building2, trend: "+2.3%" },
  { label: "Documents", value: "1,247", icon: FileCheck, trend: "+15" },
  { label: "Active Clients", value: "156", icon: Users, trend: "+8" },
  { label: "This Month", value: "$47.2k", icon: DollarSign, trend: "+12%" }
]

const recentActivities = [
  { type: "filing", client: "TechCorp Ltd", action: "GRA Filing Submitted", time: "2 hours ago", status: "success" },
  { type: "document", client: "StartupXYZ", action: "Business License Uploaded", time: "4 hours ago", status: "pending" },
  { type: "alert", client: "Global Services", action: "NIS Payment Due Soon", time: "1 day ago", status: "warning" },
  { type: "compliance", client: "LocalBiz Inc", action: "Compliance Score Updated", time: "2 days ago", status: "success" }
]

const upcomingTasks = [
  { task: "GRA Monthly Filing - TechCorp", due: "Tomorrow", priority: "high" },
  { task: "Business License Renewal", due: "3 days", priority: "medium" },
  { task: "Quarterly Tax Review", due: "1 week", priority: "low" },
  { task: "Compliance Audit - StartupXYZ", due: "2 weeks", priority: "medium" }
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">ProServe Enterprise</span>
              <Badge variant="secondary" className="ml-2">Demo</Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link href="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
              <Button className="btn-gradient">Start Free Trial</Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Demo Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="mb-8"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your business services today.</p>
          </motion.div>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {complianceMetrics.map((metric) => (
            <motion.div key={metric.label} variants={fadeInUp}>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.trend}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Latest business service activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {activity.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                      {activity.status === 'pending' && <Clock className="w-4 h-4 text-blue-500" />}
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.client}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Tasks
                </CardTitle>
                <CardDescription>
                  Important deadlines and tasks requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-muted-foreground">Due in {task.due}</p>
                      </div>
                    </div>
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'warning' : 'secondary'
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Compliance Chart Placeholder */}
        <motion.div variants={fadeInUp} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Compliance Trends
              </CardTitle>
              <CardDescription>
                Monthly business performance trends across all clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Chart Coming Soon</p>
                  <p className="text-sm text-muted-foreground">Real-time business analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={fadeInUp} className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Business Operations?</h3>
              <p className="text-muted-foreground mb-6">
                This is just a preview. The full platform includes AI-powered insights,
                automated workflows, and comprehensive business service management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-gradient">
                  Start Your Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}