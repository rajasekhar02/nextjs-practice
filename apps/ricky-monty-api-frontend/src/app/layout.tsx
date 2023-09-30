import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationElement from "./components/NavigationElement";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ricky Morty Character List",
  description: "Build using by create next app",
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <div className="bg-gray-100">
            <NavigationElement></NavigationElement>
            <div className="min-h-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
