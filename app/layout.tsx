import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Portfolio",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`{inter.className} bg-[#030014] `}
      >
        <div className="relative z-[10] w-full h-auto fixed inset-0">
          <StarsCanvas />
        </div>
        <div className="relative z-[30]">
          <Navbar />
          <main className="w-full h-full">{children}</main>
        </div>

      </body>
    </html>
  );
}
