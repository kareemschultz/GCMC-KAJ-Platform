"use client"

import { motion } from "framer-motion"
import {
  Building2,
  FileText,
  ArrowLeft,
  Calendar,
  Calculator,
  DollarSign,
  Download,
  Printer,
  Save,
  Send,
  AlertCircle,
  CheckCircle,
  Info,
  Users,
  Building,
  Hash
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useState } from "react"

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

// Demo client data (would come from API)
const client = {
  id: "1",
  companyName: "TechFlow Solutions Ltd",
  tinNumber: "TIN123456789",
  vatNumber: "VAT555666777",
  nisNumber: "NIS987654321",
  address: {
    street: "123 Main Street",
    city: "Georgetown",
    region: "Demerara-Mahaica",
    postalCode: "10001",
    country: "Guyana"
  }
}

export default function FormsPage() {
  const [formData, setFormData] = useState({
    // Period Information
    period: "2025-11",
    dueDate: "2025-12-21",

    // Sales Information
    standardRateSales: "",
    zeroRatedSales: "",
    exemptSales: "",
    totalSales: "",

    // Input VAT
    inputVAT: "",
    capitalGoodsVAT: "",
    totalInputVAT: "",

    // Output VAT
    outputVAT: "",

    // Calculations (auto-calculated)
    vatPayable: "",

    // Additional Information
    adjustments: "",
    penalties: "",
    totalDue: "",

    // Declaration
    declarationName: client.companyName,
    declarationTitle: "Director",
    declarationDate: new Date().toISOString().split('T')[0]
  })

  // Auto-calculate fields when inputs change
  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value }

    // Calculate totals
    const standardRateSales = parseFloat(updatedData.standardRateSales) || 0
    const zeroRatedSales = parseFloat(updatedData.zeroRatedSales) || 0
    const exemptSales = parseFloat(updatedData.exemptSales) || 0
    const totalSales = standardRateSales + zeroRatedSales + exemptSales

    // Calculate VAT (14% on standard rate sales in Guyana)
    const outputVAT = standardRateSales * 0.14
    const inputVAT = parseFloat(updatedData.inputVAT) || 0
    const capitalGoodsVAT = parseFloat(updatedData.capitalGoodsVAT) || 0
    const totalInputVAT = inputVAT + capitalGoodsVAT

    const vatPayable = Math.max(0, outputVAT - totalInputVAT)
    const adjustments = parseFloat(updatedData.adjustments) || 0
    const penalties = parseFloat(updatedData.penalties) || 0
    const totalDue = vatPayable + adjustments + penalties

    setFormData({
      ...updatedData,
      totalSales: totalSales.toFixed(2),
      outputVAT: outputVAT.toFixed(2),
      totalInputVAT: totalInputVAT.toFixed(2),
      vatPayable: vatPayable.toFixed(2),
      totalDue: totalDue.toFixed(2)
    })
  }

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
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button className="btn-gradient">
                <Send className="w-4 h-4 mr-2" />
                Submit to GRA
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center">
                      <FileText className="w-8 h-8 mr-3 text-primary" />
                      GRA VAT Return Form (VAT-3)
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      Monthly Value Added Tax Return for {client.companyName}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge variant="secondary">Form VAT-3</Badge>
                      <Badge variant="outline">Period: {formData.period}</Badge>
                      <Badge variant="warning">Due: {formData.dueDate}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Client Details</p>
                      <p className="font-medium">{client.companyName}</p>
                      <p className="text-sm text-muted-foreground">TIN: {client.tinNumber}</p>
                      <p className="text-sm text-muted-foreground">VAT: {client.vatNumber}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Form Content */}
        <motion.div variants={fadeInUp}>
          <div className="space-y-8">
            {/* Client Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Taxpayer Information
                </CardTitle>
                <CardDescription>
                  Verify your business information before proceeding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company/Business Name</Label>
                    <Input
                      id="companyName"
                      value={client.companyName}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tinNumber">Tax Identification Number (TIN)</Label>
                    <Input
                      id="tinNumber"
                      value={client.tinNumber}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vatNumber">VAT Registration Number</Label>
                    <Input
                      id="vatNumber"
                      value={client.vatNumber}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="period">Return Period (YYYY-MM)</Label>
                    <Input
                      id="period"
                      value={formData.period}
                      onChange={(e) => handleInputChange('period', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={`${client.address.street}, ${client.address.city}, ${client.address.region}, ${client.address.country}`}
                    disabled
                    className="bg-muted"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sales Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Sales Information
                </CardTitle>
                <CardDescription>
                  Enter your sales figures for the return period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="standardRateSales">
                      Standard Rate Sales (14% VAT)
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="standardRateSales"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.standardRateSales}
                      onChange={(e) => handleInputChange('standardRateSales', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zeroRatedSales">Zero-Rated Sales (0% VAT)</Label>
                    <Input
                      id="zeroRatedSales"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.zeroRatedSales}
                      onChange={(e) => handleInputChange('zeroRatedSales', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="exemptSales">Exempt Sales</Label>
                    <Input
                      id="exemptSales"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.exemptSales}
                      onChange={(e) => handleInputChange('exemptSales', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalSales">Total Sales (Auto-calculated)</Label>
                    <Input
                      id="totalSales"
                      value={formData.totalSales}
                      disabled
                      className="bg-muted font-medium"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VAT Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  VAT Calculation
                </CardTitle>
                <CardDescription>
                  Calculate your VAT liability for the period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Output VAT */}
                <div>
                  <h4 className="font-medium mb-3">Output VAT (VAT on Sales)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="outputVAT">VAT on Standard Rate Sales (Auto-calculated)</Label>
                      <Input
                        id="outputVAT"
                        value={formData.outputVAT}
                        disabled
                        className="bg-muted font-medium"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Input VAT */}
                <div>
                  <h4 className="font-medium mb-3">Input VAT (VAT on Purchases)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inputVAT">
                        Input VAT on General Purchases
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="inputVAT"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.inputVAT}
                        onChange={(e) => handleInputChange('inputVAT', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capitalGoodsVAT">Input VAT on Capital Goods</Label>
                      <Input
                        id="capitalGoodsVAT"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.capitalGoodsVAT}
                        onChange={(e) => handleInputChange('capitalGoodsVAT', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalInputVAT">Total Input VAT (Auto-calculated)</Label>
                      <Input
                        id="totalInputVAT"
                        value={formData.totalInputVAT}
                        disabled
                        className="bg-muted font-medium"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Final Calculation */}
                <div>
                  <h4 className="font-medium mb-3">VAT Payable</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="vatPayable">Net VAT Payable (Auto-calculated)</Label>
                      <Input
                        id="vatPayable"
                        value={formData.vatPayable}
                        disabled
                        className="bg-green-50 dark:bg-green-950 font-bold text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adjustments">Adjustments (if any)</Label>
                      <Input
                        id="adjustments"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.adjustments}
                        onChange={(e) => handleInputChange('adjustments', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalDue">Total Amount Due (Auto-calculated)</Label>
                      <Input
                        id="totalDue"
                        value={formData.totalDue}
                        disabled
                        className="bg-blue-50 dark:bg-blue-950 font-bold text-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Declaration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Declaration
                </CardTitle>
                <CardDescription>
                  Complete the declaration to submit your return
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="declarationName">
                      Authorized Signatory Name
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="declarationName"
                      value={formData.declarationName}
                      onChange={(e) => handleInputChange('declarationName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="declarationTitle">
                      Title/Position
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="declarationTitle"
                      value={formData.declarationTitle}
                      onChange={(e) => handleInputChange('declarationTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="declarationDate">Date</Label>
                    <Input
                      id="declarationDate"
                      type="date"
                      value={formData.declarationDate}
                      onChange={(e) => handleInputChange('declarationDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Declaration:</strong> I declare that the information provided in this return is true, complete and accurate to the best of my knowledge and belief. I understand that providing false or misleading information may result in penalties under the Value Added Tax Act.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
              <Button size="lg" className="btn-gradient">
                <Send className="w-4 h-4 mr-2" />
                Submit to GRA
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}