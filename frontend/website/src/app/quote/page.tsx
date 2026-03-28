"use client";

export default function QuotePage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Get a Free Quote</h1>
            <p className="mt-2 text-gray-600">
                Tell us about your project and we&apos;ll provide a detailed estimate.
            </p>

            <form className="mt-8 space-y-6">
                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="(555) 123-4567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="12345"
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Service Location</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="123 Main St"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Your City"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Describe what you need
                        </label>
                        <textarea
                            rows={5}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Please describe the work you need done, including any specific services, the scope of the project, and any relevant details..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-700 px-6 py-3 text-center font-semibold text-white hover:bg-blue-800 transition sm:w-auto"
                >
                    Submit Quote Request
                </button>
            </form>
        </div>
    );
}
