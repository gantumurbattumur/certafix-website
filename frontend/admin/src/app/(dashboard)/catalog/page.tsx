"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, type CatalogCategory } from "@/lib/api";

export default function CatalogPage() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);

  useEffect(() => {
    adminApi.catalog.listCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Catalog</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your service categories, services, and pricing
          </p>
        </div>
        <Link
          href="/catalog/new"
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          + Add Service
        </Link>
      </div>

      <div className="mt-8 space-y-8">
        {categories.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-400">
            No categories yet. Create your first service to get started.
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="rounded-lg bg-white shadow-sm border">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    category.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="divide-y">
                {category.services.length === 0 ? (
                  <div className="px-6 py-4 text-sm text-gray-400">
                    No services in this category
                  </div>
                ) : (
                  category.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.prices.length} price tier
                          {service.prices.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <Link
                        href={`/catalog/${service.id}/edit`}
                        className="text-sm font-medium text-blue-700 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
