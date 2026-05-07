import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "EMEA HSS Special Care Center",
  description: "Dedicated to providing specialized care and education for children, ensuring their holistic development and well-being.",
  icons: {
    icon: '/assets/emeaLogo.png',
  },
  openGraph: {
    title: "EMEA HSS Special Care Center",
    description: "Dedicated to providing specialized care and education for children.",
    url: "https://emeahss.edu.in",
    siteName: "EMEA HSS Special Care Center",
    images: [
      {
        url: "https://emeahss.edu.in/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
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
    image: 'https://emeahss.edu.in/og-image.jpg',
    description: 'Specialized care and education for children in Kondotty, Kerala.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kondotty',
      addressLocality: 'Malappuram',
      addressRegion: 'Kerala',
      addressCountry: 'IN'
    },
    telephone: '+910000000000',
    url: 'https://emeahss.edu.in'
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
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
