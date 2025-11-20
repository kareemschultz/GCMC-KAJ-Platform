import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "ProServe Enterprise | Professional Business Services Platform",
    template: "%s | ProServe Enterprise",
  },
  description: "Comprehensive professional business services platform offering tax, accounting, compliance, advisory, and document management solutions for modern enterprises.",
  keywords: [
    "business services",
    "tax preparation",
    "accounting",
    "compliance management",
    "business registration",
    "advisory services",
    "document management",
    "professional services",
    "enterprise platform",
    "B2B SaaS",
  ],
  authors: [
    {
      name: "ProServe Enterprise Team",
    },
  ],
  creator: "ProServe Enterprise",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "ProServe Enterprise",
    description: "Professional Business Services Platform for Modern Enterprises",
    siteName: "ProServe Enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProServe Enterprise",
    description: "Professional Business Services Platform for Modern Enterprises",
    creator: "@proserve_enterprise",
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