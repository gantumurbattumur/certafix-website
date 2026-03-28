import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-white">CertaFix</span>
                        <p className="mt-3 text-sm text-gray-400 max-w-md">
                            Professional handyman services for your home. HVAC, electrical,
                            plumbing, bathroom remodeling, and general maintenance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Services
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
                            <li><Link href="/booking" className="hover:text-white transition-colors">Book a Service</Link></li>
                            <li><Link href="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} CertaFix. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
