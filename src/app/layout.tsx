import type { Metadata } from "next";
import {
  Open_Sans,
  // Raleway
} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./providers";
import { QueryProvider } from "@/context";
import localFont from "next/font/local";

export const raleway = localFont({
  src: [
    {
      path: "../../public/fonts/raleway/Raleway-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/raleway/Raleway-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/raleway/Raleway-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-raleway", // optional if you want a CSS variable
  display: "swap",
});

const OpenSan = Open_Sans({ weight: "400", subsets: ["latin"] });
// export const raleway = Raleway({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--raleway-font",
// });

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
        className={`${OpenSan.className} ${raleway.variable} text-neutral-main h-[100dvh] overflow-hidden`}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
