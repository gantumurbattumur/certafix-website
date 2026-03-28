"use client";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Admin</span>
        <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
