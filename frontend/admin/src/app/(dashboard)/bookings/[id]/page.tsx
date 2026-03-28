"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi, type BookingDetail } from "@/lib/api";

const statusOptions = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (params.id) {
      adminApi.bookings
        .get(params.id as string)
        .then((b) => {
          setBooking(b);
          setNewStatus(b.status);
        })
        .catch(console.error);
    }
  }, [params.id]);

  async function handleStatusUpdate() {
    if (!booking || newStatus === booking.status) return;
    const updated = await adminApi.bookings.updateStatus(booking.id, newStatus);
    setBooking(updated);
  }

  if (!booking) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        ← Back to Bookings
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm border">
            <h1 className="text-xl font-bold text-gray-900">Booking Details</h1>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Customer</span>
                <p className="font-medium">{booking.customer_name}</p>
              </div>
              <div>
                <span className="text-gray-500">Email</span>
                <p className="font-medium">{booking.customer_email}</p>
              </div>
              <div>
                <span className="text-gray-500">Phone</span>
                <p className="font-medium">{booking.customer_phone}</p>
              </div>
              <div>
                <span className="text-gray-500">Address</span>
                <p className="font-medium">
                  {booking.address}, {booking.city} {booking.zip_code}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Preferred Date</span>
                <p className="font-medium">
                  {new Date(booking.preferred_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Time Slot</span>
                <p className="font-medium capitalize">{booking.preferred_time_slot}</p>
              </div>
            </div>
            {booking.notes && (
              <div className="mt-4">
                <span className="text-sm text-gray-500">Notes</span>
                <p className="mt-1 text-sm text-gray-700">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="rounded-lg bg-white p-6 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900">Booked Services</h2>
            <div className="mt-4">
              {booking.items.length === 0 ? (
                <p className="text-sm text-gray-400">No items</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-2">Service</th>
                      <th className="pb-2">Qty</th>
                      <th className="pb-2 text-right">Unit Price</th>
                      <th className="pb-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {booking.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2">{item.service_price_id}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2 text-right">
                          ${Number(item.unit_price).toFixed(2)}
                        </td>
                        <td className="py-2 text-right font-medium">
                          ${Number(item.subtotal).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t font-semibold">
                      <td colSpan={3} className="py-2 text-right">
                        Total Estimate
                      </td>
                      <td className="py-2 text-right">
                        ${Number(booking.total_estimate ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900">Status</h2>
            <div className="mt-4 space-y-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={newStatus === booking.status}
                className="w-full rounded-lg bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
              >
                Update Status
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border text-sm">
            <p className="text-gray-500">Created</p>
            <p className="font-medium">
              {new Date(booking.created_at).toLocaleString()}
            </p>
            <p className="mt-3 text-gray-500">Last Updated</p>
            <p className="font-medium">
              {new Date(booking.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
