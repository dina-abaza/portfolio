import "./globals.css";
import Navbar        from "@/components/Navbar";
import Footer        from "@/components/Footer";
import MotionWrapper from "@/components/Animations/MotionWrapper";
import LenisScroll   from "@/components/Animations/LenisScroll";
import CursorGlow      from "@/components/CursorGlow";
import WhatsAppFloat   from "@/components/WhatsAppFloat";
import DirController   from "@/components/DirController";
import { LangProvider } from "@/context/LangContext";
import GoogleAnalytics from "../components/googleAnalytics";

export const metadata = {
  title: "Aurora Software House | Web & Mobile Development",
  description:
    "Aurora Software House provides complete web and mobile solutions including responsive websites, custom web applications, mobile apps, and UI/UX design for businesses and startups.",
  keywords: [
    "Aurora Software House",
    "software house",
    "web development",
    "mobile app development",
    "UI UX design",
    "full-stack development",
    "responsive websites",
    "business websites",
    "corporate websites",
    "Next.js developer",
    "React developer",
    "mobile application development",
    "digital solutions",
    "custom web applications",
    "app and web design",
  ],
  authors: [{ name: "Aurora Software House" }],
  openGraph: {
    title: "Aurora Software House",
    description:
      "Complete web and mobile solutions including responsive websites, mobile apps, and UI/UX design for businesses and startups.",
    url: "https://aurorasoftwarehouse.com",
    siteName: "Aurora Software House",
    images: [{ url: "/Black.webp", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Software House",
    description:
      "Complete web and mobile solutions including responsive websites, mobile apps, and UI/UX design for businesses and startups.",
    images: ["/Black.webp"],
  },
};

export default function RootLayout({ children }) {
  const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/aurora.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo/aurora.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`html[lang="ar"] body, html[lang="ar"] * { font-family: 'Cairo', sans-serif !important; letter-spacing: 0 !important; }`}</style>
        <GoogleAnalytics trackingId={GA_TRACKING_ID} />
      </head>
      <body
        className="flex flex-col min-h-screen"
        style={{ background: "#FFFFFF", color: "#0F172A" }}
      >
        <LangProvider>
        <DirController />
        <LenisScroll />
        <CursorGlow />
        <WhatsAppFloat />

        {/* Fixed navbar — sits above everything */}
        <Navbar />

        <MotionWrapper>
          {/* No top padding — hero starts at top-0, navbar overlays it */}
          <main className="flex-1">
            {children}
          </main>
        </MotionWrapper>

        <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
