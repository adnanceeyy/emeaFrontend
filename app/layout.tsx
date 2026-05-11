import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DialogProvider } from "@/context/DialogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: {
    default: "EMEA HSS Special Care Center | Specialized Education & Care",
    template: "%s | EMEA HSS"
  },
  description: "EMEA HSS Special Care Center in Kondotty, Kerala, provides dedicated education and holistic care for children with special needs. Empowering lives through expert support.",
  keywords: ["Special Care Center", "EMEA HSS", "Special Education Kerala", "Kondotty School", "Child Care Education", "Holistic Development"],
  authors: [{ name: "EMEA HSS" }],
  creator: "EMEA HSS",
  publisher: "EMEA HSS",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://emeahss.edu.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EMEA HSS Special Care Center | Specialized Education & Care",
    description: "Dedicated to providing specialized care and education for children, ensuring their holistic development and well-being.",
    url: "https://emeahss.edu.in",
    siteName: "EMEA HSS Special Care Center",
    images: [
      {
        url: "/assets/bg.png",
        width: 1200,
        height: 630,
        alt: "EMEA HSS Special Care Center",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMEA HSS Special Care Center",
    description: "Specialized care and education for children in Kondotty, Kerala.",
    images: ["/assets/bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'EMEA HSS Special Care Center',
    alternateName: 'EMEA HSS SCC',
    image: 'https://emeahss.edu.in/icon.png',
    description: 'EMEA HSS Special Care Center is a premier institution providing specialized education and care for children in Kondotty, Malappuram, Kerala.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kondotty',
      addressLocality: 'Malappuram',
      addressRegion: 'Kerala',
      postalCode: '673638',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '11.1444',
      longitude: '75.9525'
    },
    telephone: '+910000000000',
    url: 'https://emeahss.edu.in',
    openingHours: 'Mo-Fr 09:00-16:00',
    sameAs: [
      'https://www.facebook.com/emeahss',
      'https://www.instagram.com/emeahss'
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.className} min-h-screen flex flex-col bg-white text-gray-900`}>
        <DialogProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer position="bottom-right" />
          </AuthProvider>
        </DialogProvider>
      </body>
    </html>
  );
}
