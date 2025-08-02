import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

const OpenSan = Open_Sans({ weight: "400", subsets: ["latin"] });
export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--raleway-font",
});

export const metadata: Metadata = {
  title: "ThoughtTrace",
  description: "Keep track of your thoughts; you might need them soon!",
};
//
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={``} lang="en">
      <body
        className={`${OpenSan.className} ${raleway.variable} bg-primary-main text-neutral-main h-screen overflow-hidden`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>  
    </html>
  );
}  
  