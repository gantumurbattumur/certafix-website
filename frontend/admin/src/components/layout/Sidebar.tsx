"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/bookings", label: "Bookings", icon: "📅" },
    { href: "/quotes", label: "Quotes", icon: "📩" },
    { href: "/catalog", label: "Catalog", icon: "📋" },
    { href: "/payments", label: "Payments", icon: "💳" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-slate-700">
                <span className="text-xl font-bold text-white">CertaFix</span>
                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Admin
                </span>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-slate-800 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                <button
                    onClick={() => {
                        localStorage.removeItem("admin_token");
                        window.location.href = "/login";
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <span className="text-lg">🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
