"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Users,
  Search,
  Plus,
  FileText,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Download,
  Upload,
  Filter,
  Grid3X3,
  List
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Demo data for clients
const clients = [
  {
    id: "1",
    type: "company",
    companyName: "TechFlow Solutions Ltd",
    firstName: "John",
    lastName: "Thompson",
    email: "john@techflow.gy",
    phone: "+592-123-4567",
    tinNumber: "TIN123456789",
    nisNumber: "NIS987654321",
    vatNumber: "VAT555666777",
    businessRegNumber: "BRG20250001",
    companyRegNumber: "CR20250001",
    nationalId: "ID123456789",
    passportNumber: "GP1234567",
    businessSector: "Technology",
    businessCategory: "Software Development",
    dateOfIncorporation: "2023-03-15",
    status: "active",
    riskLevel: "low",
    complianceScore: 98,
    address: {
      street: "123 Main Street",
      city: "Georgetown",
      region: "Demerara-Mahaica",
      postalCode: "10001",
      country: "Guyana"
    }
  },
  {
    id: "2",
    type: "individual",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@gmail.com",
    phone: "+592-234-5678",
    tinNumber: "TIN987654321",
    nisNumber: "NIS123456789",
    nationalId: "ID987654321",
    passportNumber: "GP7654321",
    dateOfBirth: "1985-07-22",
    status: "active",
    riskLevel: "low",
    complianceScore: 95,
    businessSector: "Consulting",
    businessCategory: "Financial Advisory",
    address: {
      street: "456 Charlotte Street",
      city: "Georgetown",
      region: "Demerara-Mahaica",
      postalCode: "10002",
      country: "Guyana"
    }
  },
  {
    id: "3",
    type: "company",
    companyName: "Caribbean Imports & Exports",
    firstName: "Michael",
    lastName: "Roberts",
    email: "michael@caribbean-imports.gy",
    phone: "+592-345-6789",
    tinNumber: "TIN456789123",
    nisNumber: "NIS654321987",
    vatNumber: "VAT111222333",
    businessRegNumber: "BRG20240089",
    companyRegNumber: "CR20240089",
    nationalId: "ID456789123",
    businessSector: "Import/Export",
    businessCategory: "International Trade",
    dateOfIncorporation: "2022-11-08",
    status: "active",
    riskLevel: "medium",
    complianceScore: 87,
    address: {
      street: "789 Water Street",
      city: "Georgetown",
      region: "Demerara-Mahaica",
      postalCode: "10003",
      country: "Guyana"
    }
  }
]

const recentDocuments = [
  { type: "Business License", client: "TechFlow Solutions", uploaded: "2 hours ago", status: "verified" },
  { type: "Tax Return", client: "Sarah Johnson", uploaded: "5 hours ago", status: "pending" },
  { type: "VAT Certificate", client: "Caribbean Imports", uploaded: "1 day ago", status: "verified" },
  { type: "NIS Certificate", client: "TechFlow Solutions", uploaded: "2 days ago", status: "verified" }
]

const upcomingDeadlines = [
  { client: "TechFlow Solutions", task: "VAT Return Filing", due: "Tomorrow", priority: "high" },
  { client: "Caribbean Imports", task: "Business License Renewal", due: "3 days", priority: "medium" },
  { client: "Sarah Johnson", task: "Income Tax Return", due: "1 week", priority: "medium" }
]

export default function ClientsPage() {
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
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button className="btn-gradient">
                <Plus className="w-4 h-4 mr-2" />
                New Client
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
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="w-8 h-8 mr-3 text-primary" />
              Client Management
            </h1>
            <p className="text-muted-foreground">
              Manage client profiles, documents, and compliance requirements for GCMC and KAJ Financial Services
            </p>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={fadeInUp} className="mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 flex gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search clients by name, TIN, or company..."
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Clients Grid */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {clients.map((client) => (
                <motion.div key={client.id} variants={fadeInUp}>
                  <Card className="card-hover h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.firstName}-${client.lastName}`} />
                            <AvatarFallback>
                              {client.type === 'company' ?
                                client.companyName?.substring(0, 2).toUpperCase() :
                                `${client.firstName?.[0]}${client.lastName?.[0]}`
                              }
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">
                              {client.type === 'company' ? client.companyName : `${client.firstName} ${client.lastName}`}
                            </h3>
                            <p className="text-sm text-muted-foreground">{client.businessSector}</p>
                          </div>
                        </div>
                        <Badge variant={
                          client.riskLevel === 'low' ? 'secondary' :
                          client.riskLevel === 'medium' ? 'warning' : 'destructive'
                        }>
                          {client.riskLevel} risk
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Compliance Score</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                                style={{ width: `${client.complianceScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{client.complianceScore}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">TIN:</span>
                            <p className="font-mono">{client.tinNumber}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">NIS:</span>
                            <p className="font-mono">{client.nisNumber}</p>
                          </div>
                        </div>

                        {client.type === 'company' && (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">VAT:</span>
                              <p className="font-mono">{client.vatNumber}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Reg:</span>
                              <p className="font-mono">{client.businessRegNumber}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-3 border-t border-border">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <Badge variant={client.status === 'active' ? 'secondary' : 'destructive'}>
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Documents */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Recent Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        {doc.status === 'verified' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {doc.status === 'pending' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                        <div>
                          <p className="font-medium text-sm">{doc.type}</p>
                          <p className="text-xs text-muted-foreground">{doc.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{doc.uploaded}</p>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          deadline.priority === 'high' ? 'bg-red-500' :
                          deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{deadline.task}</p>
                          <p className="text-xs text-muted-foreground">{deadline.client}</p>
                        </div>
                      </div>
                      <Badge variant={
                        deadline.priority === 'high' ? 'destructive' :
                        deadline.priority === 'medium' ? 'warning' : 'secondary'
                      }>
                        {deadline.due}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Forms
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Compliance Check
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}