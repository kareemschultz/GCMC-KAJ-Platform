import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "GCMC-KAJ Platform | Green Crescent Management Consultancy & KAJ Financial Services",
    template: "%s | GCMC-KAJ Platform",
  },
  description: "GCMC-KAJ Platform - Comprehensive business services platform for Green Crescent Management Consultancy and KAJ Financial Services offering tax preparation, accounting, compliance management, and advisory services.",
  keywords: [
    "GCMC",
    "Green Crescent Management Consultancy",
    "KAJ Financial Services",
    "business services",
    "tax preparation",
    "accounting",
    "compliance management",
    "business registration",
    "advisory services",
    "document management",
    "professional services",
  ],
  authors: [
    {
      name: "GCMC-KAJ Platform Team",
    },
  ],
  creator: "Green Crescent Management Consultancy & KAJ Financial Services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "GCMC-KAJ Platform",
    description: "Business Services Platform for Green Crescent Management Consultancy & KAJ Financial Services",
    siteName: "GCMC-KAJ Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "GCMC-KAJ Platform",
    description: "Business Services Platform for Green Crescent Management Consultancy & KAJ Financial Services",
    creator: "@gcmc_kaj_platform",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}