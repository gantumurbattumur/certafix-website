"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, type QuoteListItem } from "@/lib/api";

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    QUOTED: "bg-blue-100 text-blue-800",
    ACCEPTED: "bg-green-100 text-green-800",
    DECLINED: "bg-red-100 text-red-800",
    EXPIRED: "bg-gray-100 text-gray-800",
};

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<QuoteListItem[]>([]);
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        adminApi.quotes
            .list(statusFilter || undefined)
            .then(setQuotes)
            .catch(console.error);
    }, [statusFilter]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Review and respond to customer quote requests
                    </p>
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="QUOTED">Quoted</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="DECLINED">Declined</option>
                    <option value="EXPIRED">Expired</option>
                </select>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                                Quoted
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Date
                            </th>
                            <th className="px-6 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {quotes.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                                    No quote requests found
                                </td>
                            </tr>
                        ) : (
                            quotes.map((quote) => (
                                <tr key={quote.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {quote.customer_name}
                                        </div>
                                        <div className="text-sm text-gray-500">{quote.customer_email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                        {quote.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[quote.status] || "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {quote.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                                        {quote.quoted_amount
                                            ? `$${Number(quote.quoted_amount).toFixed(2)}`
                                            : "–"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(quote.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/quotes/${quote.id}`}
                                            className="text-sm font-medium text-blue-700 hover:text-blue-800"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
