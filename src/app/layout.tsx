import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/redux/provider";

const font = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Links",
  description: "Link Sharing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="./solar_link-circle-bold.svg" sizes="any" />
      </head>
      <body className={`${font.className} bg-Light-Grey`}>
        <ReduxProvider> {children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
