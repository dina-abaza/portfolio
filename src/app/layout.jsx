import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/Animations/MotionWrapper";
import LenisScroll from "@/components/Animations/LenisScroll";

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
  return (
    <html lang="en">
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
