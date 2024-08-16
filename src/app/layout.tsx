import type { Metadata } from "next";
import { Source_Code_Pro, Jersey_10 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sus",
  description: "Really?",
};

const jersey = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-jersey',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: '--font-source-code-pro',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceCodePro.variable} ${jersey.variable} font-source-code-pro`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
