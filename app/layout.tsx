import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Prakash and Sons",
  description: "Savor the Flavors of Tradition",
};

// Add this new export for the viewport
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
    <html lang="en">
      <body
        className={`bg-amber-50`}
      >
        {children}
      </body>
    </html>
  );
}
