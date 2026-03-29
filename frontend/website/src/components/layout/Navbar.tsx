"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";

const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Areas", href: "#areas" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Reviews", href: "#reviews" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-cream sticky top-0 z-40 border-b border-forest/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        <Home className="h-8 w-8 text-forest" />
                        <span className="font-serif font-bold text-2xl text-charcoal tracking-tight">
                            CertaFix
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-charcoal hover:text-forest font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            href="/quote"
                            className="bg-forest hover:bg-forest-dark text-charcoal px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm"
                        >
                            Get Free Quote
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-charcoal hover:text-forest p-2"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-cream border-t border-forest/10 px-4 pt-2 pb-6 space-y-1 shadow-lg absolute w-full">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block px-3 py-3 text-base font-medium text-charcoal hover:text-forest hover:bg-cream-dark rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="mt-4 px-3">
                        <Link
                            href="/quote"
                            className="block w-full text-center bg-forest text-charcoal px-6 py-3 rounded-md font-medium shadow-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Free Quote
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
