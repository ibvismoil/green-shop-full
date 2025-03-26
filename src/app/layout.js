import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GreenShop | Jonli gullar va uy o‘simliklari do‘koni",
  description: "GreenShop – sifatli gul va o‘simliklar do‘koni! 🌿 Atirgullar, kaktuslar, орхидея...",
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Toaster position="top-right" richColors />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
