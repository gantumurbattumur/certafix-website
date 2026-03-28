"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";

export default function NewServicePage() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [mode, setMode] = useState<"category" | "service">("service");

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();
    await adminApi.catalog.createCategory({
      name: categoryName,
      slug: categorySlug,
      description: categoryDescription || undefined,
    });
    router.push("/catalog");
  }

  async function handleCreateService(e: React.FormEvent) {
    e.preventDefault();
    // In production, category_id would be selected from a dropdown
    await adminApi.catalog.createService({
      category_id: "", // TODO: select from dropdown
      name: serviceName,
      slug: serviceSlug,
      description: serviceDescription,
    });
    router.push("/catalog");
  }

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        ← Back to Catalog
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Add New</h1>

      {/* Tab Toggle */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setMode("service")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "service"
              ? "bg-blue-700 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          New Service
        </button>
        <button
          onClick={() => setMode("category")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "category"
              ? "bg-blue-700 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          New Category
        </button>
      </div>

      {mode === "category" ? (
        <form onSubmit={handleCreateCategory} className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold">New Category</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. HVAC"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              required
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. hvac"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Create Category
          </button>
        </form>
      ) : (
        <form onSubmit={handleCreateService} className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold">New Service</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. AC Repair"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              required
              value={serviceSlug}
              onChange={(e) => setServiceSlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. ac-repair"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              required
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Create Service
          </button>
        </form>
      )}
    </div>
  );
}
