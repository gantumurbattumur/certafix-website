"use client";

import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const [zipCode, setZipCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Checking zip code:", zipCode);
    };

    return (
        <section className="relative bg-forest text-charcoal overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-forest-light rounded-full opacity-20 blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal/10 text-charcoal text-sm font-medium mb-6 border border-charcoal/20">
                            <MapPin size={14} />
                            <span>Proudly serving your local area</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                            Your #1 <br />
                            <span className="text-charcoal-light">Home Services</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-charcoal/80 mb-8 max-w-lg leading-relaxed">
                            Trusted, professional, and reliable home care. We handle
                            the hard work so you can enjoy your home.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-charcoal/70">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-amber"></div>
                                Fully Insured
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-amber"></div>
                                Vetted Professionals
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-amber"></div>
                                100% Satisfaction
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Form Card */}
                    <div className="lg:justify-self-end w-full max-w-md">
                        <div className="bg-cream rounded-2xl p-8 shadow-2xl text-charcoal border border-forest/10">
                            <h2 className="text-3xl font-serif font-bold mb-2 text-charcoal">
                                How can we help?
                            </h2>
                            <p className="text-charcoal-light mb-8">
                                Enter your zip code to see services and pricing in your neighborhood.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="zipCode"
                                        className="block text-sm font-medium text-charcoal mb-1.5"
                                    >
                                        Your Zip Code
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-charcoal-light" />
                                        </div>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            className="block w-full pl-10 pr-3 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-forest bg-white text-charcoal placeholder-gray-400 transition-shadow"
                                            placeholder="e.g. 98101"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            required
                                            pattern="[0-9]{5}"
                                            maxLength={5}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-hover text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                                >
                                    Check Availability
                                    <ArrowRight size={20} />
                                </button>
                            </form>

                            <p className="text-xs text-center text-charcoal-light mt-4">
                                No commitment required. Free instant quotes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
