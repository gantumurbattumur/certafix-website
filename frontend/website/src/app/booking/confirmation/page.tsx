import Link from "next/link";

export default function BookingConfirmationPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
            <div className="text-5xl">✅</div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="mt-4 text-lg text-gray-600">
                Thank you for your booking. We&apos;ll send a confirmation email with
                all the details shortly.
            </p>
            <div className="mt-4 rounded-lg bg-blue-50 p-6 text-left text-sm text-gray-700">
                <p className="font-semibold">What&apos;s next?</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>You&apos;ll receive a confirmation email</li>
                    <li>Our team will review your booking and confirm the appointment</li>
                    <li>We&apos;ll contact you if we need any additional information</li>
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
