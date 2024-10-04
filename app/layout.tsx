import type { Metadata } from "next";
// Remove the following line
// import { Montserrat } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Hotel Prakash and Sons",
  description: "Savor the Flavors of Tradition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-amber-50`}
      >
        {children}
      </body>
    </html>
  );
}
