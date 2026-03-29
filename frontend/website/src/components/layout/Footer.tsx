import Link from "next/link";
import { Home, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-charcoal text-cream/80 pt-20 pb-10 border-t-4 border-forest">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Home className="h-8 w-8 text-amber" />
                            <span className="font-serif font-bold text-2xl text-white tracking-tight">
                                CertaFix
                            </span>
                        </div>
                        <p className="leading-relaxed">
                            Professional home services for your home. Trusted, reliable,
                            and dedicated to making your home shine.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Globe size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Globe size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Globe size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-xl mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="hover:text-amber transition-colors">Home</Link>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-amber transition-colors">Our Services</a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="hover:text-amber transition-colors">How It Works</a>
                            </li>
                            <li>
                                <a href="#reviews" className="hover:text-amber transition-colors">Testimonials</a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-amber transition-colors">FAQ</a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-xl mb-6">
                            Services
                        </h4>
                        <ul className="space-y-4">
                            <li><Link href="/services" className="hover:text-amber transition-colors">Standard Cleaning</Link></li>
                            <li><Link href="/services" className="hover:text-amber transition-colors">Deep Cleaning</Link></li>
                            <li><Link href="/services" className="hover:text-amber transition-colors">Move In / Move Out</Link></li>
                            <li><Link href="/services" className="hover:text-amber transition-colors">Post-Construction</Link></li>
                            <li><Link href="/services" className="hover:text-amber transition-colors">Airbnb Turnover</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-xl mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-amber shrink-0 mt-1" />
                                <span>123 Main St, Suite 400<br />Your City, ST 00000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-amber shrink-0" />
                                <span>(555) 555-0123</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-amber shrink-0" />
                                <span>hello@certafix.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} CertaFix. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
