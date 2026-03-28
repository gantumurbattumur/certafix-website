"use client";

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">
                Have a question? Get in touch and we&apos;ll be happy to help.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Get In Touch</h2>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">📞</span>
                                <div>
                                    <p className="font-medium text-gray-900">Phone</p>
                                    <p className="text-gray-600">(555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl">📧</span>
                                <div>
                                    <p className="font-medium text-gray-900">Email</p>
                                    <p className="text-gray-600">info@certafix.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl">📍</span>
                                <div>
                                    <p className="font-medium text-gray-900">Service Area</p>
                                    <p className="text-gray-600">Greater Metro Area and surrounding cities</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl">🕐</span>
                                <div>
                                    <p className="font-medium text-gray-900">Business Hours</p>
                                    <p className="text-gray-600">Mon–Fri: 8am – 6pm</p>
                                    <p className="text-gray-600">Sat: 9am – 3pm</p>
                                    <p className="text-gray-600">Emergency service available 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            rows={4}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
