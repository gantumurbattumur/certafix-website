import Link from "next/link";

export default function QuoteConfirmationPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
            <div className="text-5xl">📩</div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Quote Request Submitted!</h1>
            <p className="mt-4 text-lg text-gray-600">
                Thank you! We&apos;ve received your quote request and will get back to
                you with a detailed estimate.
            </p>
            <div className="mt-4 rounded-lg bg-blue-50 p-6 text-left text-sm text-gray-700">
                <p className="font-semibold">What happens next?</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Our team will review your project details</li>
                    <li>We may reach out for additional information if needed</li>
                    <li>You&apos;ll receive a detailed quote via email within 24-48 hours</li>
                </ul>
            </div>
            <div className="mt-8">
                <Link
                    href="/"
                    className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
