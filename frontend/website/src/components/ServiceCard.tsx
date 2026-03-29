import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    name: string;
    description: string;
    Icon: LucideIcon;
    href: string;
}

export default function ServiceCard({ name, description, Icon, href }: ServiceCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Card Media — icon banner */}
            <div className="flex h-36 items-center justify-center bg-blue-50">
                <Icon size={64} strokeWidth={1.25} className="text-blue-700" />
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <p className="mt-2 flex-1 text-gray-600">{description}</p>

                {/* Card Actions */}
                <div className="mt-6">
                    <Link
                        href={href}
                        className="inline-block rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
}
