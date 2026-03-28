"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi, type QuoteDetail } from "@/lib/api";

export default function QuoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [quote, setQuote] = useState<QuoteDetail | null>(null);
    const [quotedAmount, setQuotedAmount] = useState("");
    const [adminNotes, setAdminNotes] = useState("");
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        if (params.id) {
            adminApi.quotes
                .get(params.id as string)
                .then((q) => {
                    setQuote(q);
                    setNewStatus(q.status);
                    setAdminNotes(q.admin_notes || "");
                    setQuotedAmount(q.quoted_amount ? String(q.quoted_amount) : "");
                })
                .catch(console.error);
        }
    }, [params.id]);

    async function handleRespond() {
        if (!quote) return;
        const updated = await adminApi.quotes.respond(quote.id, {
            status: newStatus || undefined,
            admin_notes: adminNotes || undefined,
            quoted_amount: quotedAmount ? Number(quotedAmount) : undefined,
        });
        setQuote(updated);
    }

    if (!quote) {
        return <div className="text-gray-400">Loading...</div>;
    }

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
                ← Back to Quotes
            </button>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-sm border">
                        <h1 className="text-xl font-bold text-gray-900">Quote Request</h1>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Customer</span>
                                <p className="font-medium">{quote.customer_name}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Email</span>
                                <p className="font-medium">{quote.customer_email}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Phone</span>
                                <p className="font-medium">{quote.customer_phone}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Address</span>
                                <p className="font-medium">
                                    {quote.address}, {quote.city} {quote.zip_code}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-gray-500">Project Description</span>
                            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                                {quote.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Response Panel */}
                <div className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-sm border">
                        <h2 className="text-lg font-semibold text-gray-900">Respond</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="QUOTED">Quoted</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="DECLINED">Declined</option>
                                    <option value="EXPIRED">Expired</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Quoted Amount ($)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={quotedAmount}
                                    onChange={(e) => setQuotedAmount(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Admin Notes
                                </label>
                                <textarea
                                    rows={3}
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                />
                            </div>
                            <button
                                onClick={handleRespond}
                                className="w-full rounded-lg bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                            >
                                Save Response
                            </button>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm border text-sm">
                        <p className="text-gray-500">Submitted</p>
                        <p className="font-medium">
                            {new Date(quote.created_at).toLocaleString()}
                        </p>
                        {quote.quoted_at && (
                            <>
                                <p className="mt-3 text-gray-500">Quoted At</p>
                                <p className="font-medium">
                                    {new Date(quote.quoted_at).toLocaleString()}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
