import type { Metadata } from "next";
import "./globals.css";
import { Cormorant, Montserrat, Dancing_Script } from 'next/font/google';

const cormorant = Cormorant({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  title: "Hotel Prakash and Sons",
  description: "Savor the Flavors of Tradition",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${dancingScript.variable}`}>
      <body className={`bg-amber-50 font-montserrat`}>
        {children}
      </body>
    </html>
  );
}
