import { Calculator, CalendarClock, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServiceCards() {
    return (
        <section className="py-24 bg-cream relative z-20 -mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1: Free Quote */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-forest/5 flex flex-col h-full transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mb-6 text-forest">
                            <Calculator size={28} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                            Free Quote
                        </h3>
                        <p className="text-charcoal-light mb-8 flex-grow leading-relaxed">
                            Get an instant, transparent estimate for your home service needs.
                            No hidden fees, no surprises. Just honest pricing based on your space.
                        </p>
                        <Link
                            href="/quote"
                            className="block w-full py-3.5 px-6 rounded-lg font-semibold text-center text-charcoal border-2 border-forest hover:bg-forest hover:text-charcoal transition-colors"
                        >
                            Get Estimate
                        </Link>
                    </div>

                    {/* Card 2: Autobook Services */}
                    <div className="bg-forest text-charcoal rounded-2xl p-8 shadow-lg flex flex-col h-full transform transition-transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden">
                        {/* Decorative accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-forest-light rounded-bl-full opacity-50"></div>

                        <div className="w-14 h-14 bg-charcoal/10 rounded-xl flex items-center justify-center mb-6 text-amber relative z-10">
                            <CalendarClock size={28} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">
                            Autobook Services
                        </h3>
                        <p className="text-charcoal/70 mb-8 flex-grow leading-relaxed relative z-10">
                            Set it and forget it. Schedule weekly, bi-weekly, or monthly
                            services and enjoy a consistently perfect home without lifting a finger.
                        </p>
                        <Link
                            href="/booking"
                            className="block w-full py-3.5 px-6 rounded-lg font-semibold text-center bg-amber hover:bg-amber-hover text-white transition-colors relative z-10 shadow-md"
                        >
                            Setup Schedule
                        </Link>
                    </div>

                    {/* Card 3: Special Packages */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-forest/5 flex flex-col h-full transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="w-14 h-14 bg-amber/10 rounded-xl flex items-center justify-center mb-6 text-amber">
                            <Sparkles size={28} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                            Special Packages
                        </h3>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 size={20} className="text-forest shrink-0 mt-0.5" />
                                <span className="text-charcoal-light">New Construction Cleanup</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 size={20} className="text-forest shrink-0 mt-0.5" />
                                <span className="text-charcoal-light">Move In / Move Out</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 size={20} className="text-forest shrink-0 mt-0.5" />
                                <span className="text-charcoal-light">Landlords / PM / Real Estate</span>
                            </li>
                        </ul>

                        <Link
                            href="/services"
                            className="block w-full py-3.5 px-6 rounded-lg font-semibold text-center text-charcoal border-2 border-forest hover:bg-forest hover:text-charcoal transition-colors mt-auto"
                        >
                            View Packages
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
