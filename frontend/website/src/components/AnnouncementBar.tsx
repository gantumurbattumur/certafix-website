"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-amber text-white px-4 py-2 flex justify-between items-center text-sm font-medium relative z-50">
            <div className="flex-1 text-center">
                Limited Time Offer: Get 20% off your first service!
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close announcement"
            >
                <X size={16} />
            </button>
        </div>
    );
}
