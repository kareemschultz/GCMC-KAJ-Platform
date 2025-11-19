import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "ComplianceFlow | Modern Business Compliance Platform",
    template: "%s | ComplianceFlow",
  },
  description: "Next-generation business compliance platform with AI-first approach for seamless regulatory management.",
  keywords: [
    "compliance",
    "business",
    "regulatory",
    "AI",
    "automation",
    "dashboard",
    "tax",
    "filing",
  ],
  authors: [
    {
      name: "ComplianceFlow Team",
    },
  ],
  creator: "ComplianceFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "ComplianceFlow",
    description: "Modern Business Compliance Platform",
    siteName: "ComplianceFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComplianceFlow",
    description: "Modern Business Compliance Platform",
    creator: "@complianceflow",
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