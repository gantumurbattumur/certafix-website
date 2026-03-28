"use client";

import { useParams, useRouter } from "next/navigation";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        ← Back to Catalog
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
      <p className="mt-1 text-sm text-gray-500">Service ID: {params.id}</p>

      <div className="mt-6 rounded-lg bg-white p-6 shadow-sm border">
        <p className="text-sm text-gray-500">
          Service edit form with price management will be loaded from the API.
        </p>

        {/* Service Details Form */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Price Tiers */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Price Tiers</h2>
            <button className="text-sm font-medium text-blue-700 hover:text-blue-800">
              + Add Price
            </button>
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
            Price tiers will be loaded and managed here
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            Save Changes
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
