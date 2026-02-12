import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/Animations/MotionWrapper";
import LenisScroll from "@/components/Animations/LenisScroll";
import GoogleAnalytics from "../components/googleAnalytics"
// app/layout.js
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
    "app and web design"
  ],
  authors: [{ name: "Aurora Software House" }],
  openGraph: {
    title: "Aurora Software House",
    description:
      "Complete web and mobile solutions including responsive websites, mobile apps, and UI/UX design for businesses and startups.",
    url: "https://aurorasoftwarehouse.com",
    siteName: "Aurora Software House",
    images: [
      {
        url: "/Black.png", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Software House",
    description:
      "Complete web and mobile solutions including responsive websites, mobile apps, and UI/UX design for businesses and startups.",
    images: ["/Black.png"],
  },
};


export default function RootLayout({ children }) {
        const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
  return (
    <html lang="en">
        <head>
{/* <!-- نسخة SVG --> */}
{/* <link rel="icon" href="/logo/aurora.svg" sizes="32x32" type="image/svg+xml" /> */}

{/* <!-- نسخ PNG لأحجام مختلفة --> */}
{/* <link rel="icon" type="image/png" sizes="16x16" href="/logo/aurora-16.png" /> */}
{/* <link rel="icon" type="image/png" sizes="32x32" href="/logo/aurora-32.png" /> */}
{/* <link rel="icon" type="image/png" sizes="48x48" href="/logo/aurora-48.png" /> */}
{/* <link rel="icon" type="image/png" sizes="64x64" href="/logo/aurora-64.png" /> */}
{/* <link rel="icon" type="image/png" sizes="128x128" href="/logo/aurora-128.png" /> */}
<link rel="icon" type="image/png" sizes="256x256" href="/logo/aurora-256.png" />

        <GoogleAnalytics trackingId={GA_TRACKING_ID} />
        </head>
      <body className="bg-black text-white flex flex-col min-h-screen">
        {/* ✅ استدعاء مكتبة التمرير السلس */}
        <LenisScroll />

        <Navbar />

        <MotionWrapper>
          <main className="flex-1 min-h-[1000px]">
            {children}
          </main>
        </MotionWrapper>

        <Footer />
      </body>
    </html>
  );
}
