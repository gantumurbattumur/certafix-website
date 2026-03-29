"use client";

export default function ContactPage() {
    return (
        <>
            {/* Page Hero */}
            <div className="bg-forest py-16 px-4">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-serif font-bold text-charcoal">Contact Us</h1>
                    <p className="mt-3 text-lg text-charcoal/70">
                        Have a question? Get in touch and we&apos;ll be happy to help.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-serif font-bold text-charcoal">Get In Touch</h2>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-4 bg-cream-dark rounded-xl">
                                <span className="text-2xl">📞</span>
                                <div>
                                    <p className="font-semibold text-charcoal">Phone</p>
                                    <p className="text-charcoal-light">(555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-cream-dark rounded-xl">
                                <span className="text-2xl">📧</span>
                                <div>
                                    <p className="font-semibold text-charcoal">Email</p>
                                    <p className="text-charcoal-light">info@certafix.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-cream-dark rounded-xl">
                                <span className="text-2xl">📍</span>
                                <div>
                                    <p className="font-semibold text-charcoal">Service Area</p>
                                    <p className="text-charcoal-light">Greater Metro Area and surrounding cities</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-cream-dark rounded-xl">
                                <span className="text-2xl">🕐</span>
                                <div>
                                    <p className="font-semibold text-charcoal">Business Hours</p>
                                    <p className="text-charcoal-light">Mon–Fri: 8am – 6pm</p>
                                    <p className="text-charcoal-light">Sat: 9am – 3pm</p>
                                    <p className="text-charcoal-light">Emergency service available 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-charcoal mb-1.5">Name</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-charcoal mb-1.5">Email</label>
                            <input
                                type="email"
                                required
                                className="mt-1 w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-charcoal mb-1.5">Phone</label>
                            <input
                                type="tel"
                                className="mt-1 w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-charcoal mb-1.5">Message</label>
                            <textarea
                                rows={4}
                                required
                                className="mt-1 w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-charcoal hover:bg-forest-dark transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
