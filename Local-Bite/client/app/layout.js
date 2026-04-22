import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers/CachingProvider";
import { Poppins } from "next/font/google";
// import Navbar from "./components/Navbar/page";
import { AuthProvider } from "./contexts/AuthContext";
import Drawrwrapper from "./components/Drawrwrapper/page";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // ✅ REQUIRED
  display: "swap"
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Local-Bites",
  description: "Food delivery app for indian street vendors",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased w-full`}
      >
        <AuthProvider>
          {/* <Navbar /> */}
          <Drawrwrapper></Drawrwrapper>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
