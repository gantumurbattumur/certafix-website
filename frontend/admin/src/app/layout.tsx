import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertaFix Admin",
  description: "CertaFix Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
