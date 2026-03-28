import Link from "next/link";

// In production, this will be fetched from the API using the slug param
export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-gray-500">
                <Link href="/services" className="hover:text-blue-700">
                    Services
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 capitalize">{slug.replace(/-/g, " ")}</span>
            </nav>

            {/* Service Header */}
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {slug.replace(/-/g, " ")}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
                Service details and pricing will be loaded from the API.
            </p>

            {/* Pricing Table Placeholder */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Service</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-500" colSpan={3}>
                                    Pricing data will be loaded from the API.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                    href="/booking"
                    className="rounded-lg bg-blue-700 px-6 py-3 text-center font-semibold text-white hover:bg-blue-800 transition"
                >
                    Book This Service
                </Link>
                <Link
                    href="/quote"
                    className="rounded-lg border-2 border-blue-700 px-6 py-3 text-center font-semibold text-blue-700 hover:bg-blue-50 transition"
                >
                    Get a Quote
                </Link>
            </div>
        </div>
    );
}
