"use client"

import { motion } from "framer-motion"
import {
  Building2,
  ArrowLeft,
  User,
  FileText,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Download,
  Upload,
  Edit,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Hash,
  Globe,
  Building,
  Users,
  Briefcase,
  Eye,
  Settings,
  Clock,
  TrendingUp,
  DollarSign,
  Target,
  BookOpen
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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

// Demo client data
const client = {
  id: "1",
  type: "company",
  companyName: "TechFlow Solutions Ltd",
  firstName: "John",
  lastName: "Thompson",
  middleName: "David",
  businessName: "TechFlow Solutions",
  email: "john@techflow.gy",
  phone: "+592-123-4567",
  alternatePhone: "+592-123-4568",

  // Government IDs
  nationalId: "ID123456789",
  passportNumber: "GP1234567",
  drivingLicense: "DL987654321",

  // Tax and Business Numbers
  tinNumber: "TIN123456789",
  nisNumber: "NIS987654321",
  vatNumber: "VAT555666777",
  businessRegNumber: "BRG20250001",
  companyRegNumber: "CR20250001",

  // Business Details
  businessSector: "Technology",
  businessCategory: "Software Development",
  dateOfIncorporation: "2023-03-15",
  dateOfBirth: null,

  // Addresses
  address: {
    street: "123 Main Street",
    city: "Georgetown",
    region: "Demerara-Mahaica",
    postalCode: "10001",
    country: "Guyana"
  },
  registeredOfficeAddress: {
    street: "123 Main Street, Suite 100",
    city: "Georgetown",
    region: "Demerara-Mahaica",
    postalCode: "10001",
    country: "Guyana"
  },

  // Status and Risk
  status: "active",
  riskLevel: "low",
  complianceScore: 98,

  notes: "Excellent compliance history. Regular monthly VAT returns filed on time.",
  tags: ["tech", "software", "high-value", "compliant"],

  emergencyContact: {
    name: "Jane Thompson",
    relationship: "Director",
    phone: "+592-234-5678",
    email: "jane@techflow.gy"
  }
}

// Client documents
const documents = [
  {
    id: "1",
    type: "Business License",
    title: "Business Registration Certificate",
    fileName: "business_license_2023.pdf",
    uploadDate: "2023-03-20",
    expiryDate: "2025-03-20",
    status: "valid",
    issuingAuthority: "DCRA",
    size: "2.3 MB"
  },
  {
    id: "2",
    type: "Tax Certificate",
    title: "Tax Identification Number Certificate",
    fileName: "tin_certificate.pdf",
    uploadDate: "2023-03-18",
    expiryDate: null,
    status: "valid",
    issuingAuthority: "GRA",
    size: "1.1 MB"
  },
  {
    id: "3",
    type: "VAT Certificate",
    title: "VAT Registration Certificate",
    fileName: "vat_certificate.pdf",
    uploadDate: "2023-03-25",
    expiryDate: "2025-03-25",
    status: "valid",
    issuingAuthority: "GRA",
    size: "1.8 MB"
  },
  {
    id: "4",
    type: "National ID",
    title: "Director National ID Copy",
    fileName: "national_id_john_thompson.pdf",
    uploadDate: "2023-03-15",
    expiryDate: "2028-07-15",
    status: "valid",
    issuingAuthority: "GECOM",
    size: "0.9 MB"
  },
  {
    id: "5",
    type: "Passport",
    title: "Director Passport Copy",
    fileName: "passport_john_thompson.pdf",
    uploadDate: "2023-03-15",
    expiryDate: "2028-11-30",
    status: "expiring_soon",
    issuingAuthority: "Immigration Office",
    size: "1.2 MB"
  }
]

// Forms available for this client
const availableForms = [
  {
    id: "gra_vat_return",
    agency: "GRA",
    title: "VAT Return Form",
    formCode: "VAT-3",
    frequency: "Monthly",
    dueDate: "21st of each month",
    nextDue: "2025-12-21",
    fee: "No fee",
    status: "available"
  },
  {
    id: "gra_income_tax",
    agency: "GRA",
    title: "Corporate Income Tax Return",
    formCode: "CIT-1",
    frequency: "Annually",
    dueDate: "31st March",
    nextDue: "2026-03-31",
    fee: "No fee",
    status: "not_due"
  },
  {
    id: "dcra_annual_return",
    agency: "DCRA",
    title: "Annual Return",
    formCode: "AR-1",
    frequency: "Annually",
    dueDate: "Anniversary of incorporation",
    nextDue: "2025-03-15",
    fee: "GYD 2,500",
    status: "due_soon"
  },
  {
    id: "nis_contribution",
    agency: "NIS",
    title: "Employee Contribution Schedule",
    formCode: "CS-3",
    frequency: "Monthly",
    dueDate: "15th of each month",
    nextDue: "2025-12-15",
    fee: "No fee",
    status: "available"
  }
]

// Filing history
const filingHistory = [
  {
    id: "1",
    formTitle: "VAT Return - November 2025",
    agency: "GRA",
    submittedDate: "2025-11-18",
    status: "approved",
    amount: "GYD 45,670",
    reference: "VAT202511001"
  },
  {
    id: "2",
    formTitle: "NIS Contribution - November 2025",
    agency: "NIS",
    submittedDate: "2025-11-14",
    status: "approved",
    amount: "GYD 12,340",
    reference: "NIS202511001"
  },
  {
    id: "3",
    formTitle: "VAT Return - October 2025",
    agency: "GRA",
    submittedDate: "2025-10-19",
    status: "approved",
    amount: "GYD 38,920",
    reference: "VAT202510001"
  }
]

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/clients" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Clients</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">GCMC-KAJ Platform</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Client
              </Button>
              <Button className="btn-gradient">
                <FileText className="w-4 h-4 mr-2" />
                New Form
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.firstName}-${client.lastName}`} />
                      <AvatarFallback className="text-lg">
                        {client.type === 'company' ?
                          client.companyName?.substring(0, 2).toUpperCase() :
                          `${client.firstName?.[0]}${client.lastName?.[0]}`
                        }
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-3xl font-bold">
                        {client.type === 'company' ? client.companyName : `${client.firstName} ${client.lastName}`}
                      </h1>
                      <p className="text-lg text-muted-foreground">{client.businessSector} • {client.businessCategory}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant={client.status === 'active' ? 'secondary' : 'destructive'}>
                          {client.status}
                        </Badge>
                        <Badge variant={
                          client.riskLevel === 'low' ? 'secondary' :
                          client.riskLevel === 'medium' ? 'warning' : 'destructive'
                        }>
                          {client.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-muted-foreground">Compliance Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                            style={{ width: `${client.complianceScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-lg">{client.complianceScore}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Client ID: {client.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Client Details Tabs */}
        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="filings">Filing History</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Type</label>
                        <p className="font-medium capitalize">{client.type}</p>
                      </div>
                      {client.type === 'company' && (
                        <>
                          <div>
                            <label className="text-sm text-muted-foreground">Company Name</label>
                            <p className="font-medium">{client.companyName}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Business Name</label>
                            <p className="font-medium">{client.businessName}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Date of Incorporation</label>
                            <p className="font-medium">{new Date(client.dateOfIncorporation).toLocaleDateString()}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <label className="text-sm text-muted-foreground">First Name</label>
                        <p className="font-medium">{client.firstName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Last Name</label>
                        <p className="font-medium">{client.lastName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{client.email}</p>
                        <p className="text-sm text-muted-foreground">Primary Email</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{client.phone}</p>
                        <p className="text-sm text-muted-foreground">Primary Phone</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{client.alternatePhone}</p>
                        <p className="text-sm text-muted-foreground">Alternate Phone</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Government IDs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Government IDs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">National ID:</span>
                        <span className="font-mono">{client.nationalId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Passport:</span>
                        <span className="font-mono">{client.passportNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Driving License:</span>
                        <span className="font-mono">{client.drivingLicense}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tax & Business Numbers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Hash className="w-5 h-5 mr-2" />
                      Tax & Business Numbers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">TIN:</span>
                        <span className="font-mono">{client.tinNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">NIS:</span>
                        <span className="font-mono">{client.nisNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">VAT:</span>
                        <span className="font-mono">{client.vatNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Business Reg:</span>
                        <span className="font-mono">{client.businessRegNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Company Reg:</span>
                        <span className="font-mono">{client.companyRegNumber}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Client Documents</h3>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <Badge variant={doc.status === 'valid' ? 'secondary' : 'warning'}>
                            {doc.status === 'valid' ? 'Valid' : 'Expiring Soon'}
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                      <h4 className="font-medium mb-2">{doc.title}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Authority: {doc.issuingAuthority}</p>
                        <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        {doc.expiryDate && (
                          <p>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</p>
                        )}
                        <p>Size: {doc.size}</p>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Available Forms</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Custom Form
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableForms.map((form) => (
                  <Card key={form.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{form.title}</h4>
                          <p className="text-sm text-muted-foreground">{form.agency} • {form.formCode}</p>
                        </div>
                        <Badge variant={
                          form.status === 'available' ? 'secondary' :
                          form.status === 'due_soon' ? 'warning' : 'outline'
                        }>
                          {form.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frequency:</span>
                          <span>{form.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{form.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Due:</span>
                          <span>{new Date(form.nextDue).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fee:</span>
                          <span>{form.fee}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={form.status === 'not_due'}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          Fill Form
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3 mr-1" />
                          Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Filing History Tab */}
            <TabsContent value="filings" className="space-y-6">
              <h3 className="text-lg font-semibold">Filing History</h3>
              <div className="space-y-4">
                {filingHistory.map((filing) => (
                  <Card key={filing.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <div>
                              <h4 className="font-medium">{filing.formTitle}</h4>
                              <p className="text-sm text-muted-foreground">{filing.agency} • Ref: {filing.reference}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{filing.amount}</p>
                          <p className="text-sm text-muted-foreground">
                            Submitted: {new Date(filing.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold mb-1">Overall Score</h3>
                    <p className="text-3xl font-bold text-green-600">{client.complianceScore}%</p>
                    <p className="text-sm text-muted-foreground">Excellent compliance</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold mb-1">On-Time Filings</h3>
                    <p className="text-3xl font-bold text-blue-600">12/12</p>
                    <p className="text-sm text-muted-foreground">100% on-time rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <h3 className="font-semibold mb-1">Upcoming Deadlines</h3>
                    <p className="text-3xl font-bold text-yellow-600">2</p>
                    <p className="text-sm text-muted-foreground">Within 30 days</p>
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