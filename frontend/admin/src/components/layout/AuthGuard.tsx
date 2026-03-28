"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.replace("/login");
        } else {
            setIsAuthed(true);
        }
    }, [router]);

    if (!isAuthed) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
}
