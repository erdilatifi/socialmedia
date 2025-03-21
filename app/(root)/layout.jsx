import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";
import MainContainer from "@/components/layout/MainContainer";
import RightSideBar from "@/components/layout/RightSideBar";
import TopBar from "@/components/layout/TopBar";
import BottomBar from "@/components/layout/BottomBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1D1928] text-[#ffffff] `}
        >
          <main className="flex flex-row">
          <LeftSideBar/>
          <MainContainer>
            {children}
          </MainContainer>
          <RightSideBar/>
          </main>
          <BottomBar/>
        </body>
      </html>
    </ClerkProvider>
  );
}
