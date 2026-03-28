"use client";

import { useEffect, useState } from "react";
import { adminApi, type PaymentItem } from "@/lib/api";

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    SUCCEEDED: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    REFUNDED: "bg-purple-100 text-purple-800",
};

export default function PaymentsPage() {
    const [payments, setPayments] = useState<PaymentItem[]>([]);

    useEffect(() => {
        adminApi.payments.list().then(setPayments).catch(console.error);
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="mt-1 text-sm text-gray-500">Payment history and status</p>

            <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Booking
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Stripe ID
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                                    No payments yet
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                        {payment.booking_id.slice(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                        {payment.stripe_payment_intent_id.slice(0, 20)}...
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                                        ${Number(payment.amount).toFixed(2)} {payment.currency.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[payment.status] || "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(payment.created_at).toLocaleDateString()}
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
