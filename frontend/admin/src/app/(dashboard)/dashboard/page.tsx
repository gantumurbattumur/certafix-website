"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

interface DashboardStats {
    bookings: {
        total_bookings: number;
        pending: number;
        confirmed: number;
        completed: number;
        total_revenue: number;
    };
    quotes: {
        total_quotes: number;
        pending: number;
        quoted: number;
        accepted: number;
    };
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        adminApi.dashboard.getStats().then(setStats).catch(console.error);
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Overview of your business</p>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Bookings"
                    value={stats?.bookings.total_bookings ?? "–"}
                    color="blue"
                />
                <StatCard
                    title="Pending Bookings"
                    value={stats?.bookings.pending ?? "–"}
                    color="amber"
                />
                <StatCard
                    title="Pending Quotes"
                    value={stats?.quotes.pending ?? "–"}
                    color="purple"
                />
                <StatCard
                    title="Revenue"
                    value={
                        stats
                            ? `$${stats.bookings.total_revenue.toLocaleString()}`
                            : "–"
                    }
                    color="green"
                />
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900">Bookings Summary</h2>
                    <div className="mt-4 space-y-3">
                        <StatRow label="Confirmed" value={stats?.bookings.confirmed ?? 0} />
                        <StatRow label="Completed" value={stats?.bookings.completed ?? 0} />
                        <StatRow label="Total" value={stats?.bookings.total_bookings ?? 0} />
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900">Quotes Summary</h2>
                    <div className="mt-4 space-y-3">
                        <StatRow label="Quoted" value={stats?.quotes.quoted ?? 0} />
                        <StatRow label="Accepted" value={stats?.quotes.accepted ?? 0} />
                        <StatRow label="Total" value={stats?.quotes.total_quotes ?? 0} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    color,
}: {
    title: string;
    value: string | number;
    color: string;
}) {
    const colorMap: Record<string, string> = {
        blue: "bg-blue-50 text-blue-700",
        amber: "bg-amber-50 text-amber-700",
        purple: "bg-purple-50 text-purple-700",
        green: "bg-green-50 text-green-700",
    };

    return (
        <div className={`rounded-lg p-6 ${colorMap[color] || colorMap.blue}`}>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
    );
}

function StatRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
        </div>
    );
}
