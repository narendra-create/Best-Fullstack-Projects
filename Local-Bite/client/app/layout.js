import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers/CachingProvider";
// import Navbar from "./components/Navbar/page";
import { AuthProvider } from "./contexts/AuthContext";
import Drawrwrapper from "./components/Drawrwrapper/page";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* <Navbar /> */}
          <Drawrwrapper></Drawrwrapper>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
