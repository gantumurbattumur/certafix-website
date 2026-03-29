import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "CertaFix — Professional Home Services",
    description:
        "Trusted, professional, and reliable home care. From deep cleaning to move-in prep, we handle the dirty work so you can enjoy your home.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap"
                />
            </head>
            <body className="min-h-screen flex flex-col font-sans bg-cream selection:bg-amber/30">
                <AnnouncementBar />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
