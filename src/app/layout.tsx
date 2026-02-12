import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/analytics/gtm";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerRoute | IT Logistics & Asset Management",
  description: "Enterprise IT logistics, data center relocation, ITAD, and white glove IT asset transport. Get instant estimates from certified R2 and NAID AAA vendor partners.",
  keywords: [
    "IT logistics",
    "data center relocation",
    "ITAD",
    "IT asset disposition",
    "IT asset recovery",
    "white glove IT delivery",
    "server rack transport",
    "office IT decommission",
    "chain of custody",
    "data destruction",
    "e-waste recycling",
    "R2 certified",
  ],
};

// Inline script to set data-theme before paint, preventing FOUC
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('powerroute-theme');
      if (theme && ['light', 'dark', 'corporate'].includes(theme)) {
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
