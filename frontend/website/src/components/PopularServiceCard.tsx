import Link from "next/link";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "https://placehold.co/400x400/6b7280/6b7280";

interface PopularServiceCardProps {
    id: string;
    name: string;
    discount: string;
    subtitle: string;
    image?: string;
    href: string;
    ctaLabel?: string;
}

export default function PopularServiceCard({
    id,
    name,
    discount,
    subtitle,
    image = PLACEHOLDER_IMAGE,
    href,
    ctaLabel = "Explore Now",
}: PopularServiceCardProps) {
    return (
        <div className="relative overflow-hidden w-full aspect-square group">
            {/* Background Image */}
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gray-900/60" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Heading */}
                <h3
                    className="text-2xl font-black uppercase leading-tight text-amber-400"
                    style={{ fontFamily: "inherit" }}
                >
                    {name}
                </h3>

                {/* Bottom block */}
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-extrabold uppercase text-white tracking-wide">
                        {discount}
                    </p>
                    <p className="text-sm text-gray-300 mb-4">{subtitle}</p>
                    <Link
                        href={href}
                        className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest text-center px-4 py-3 transition-colors"
                    >
                        {ctaLabel}
                    </Link>
                </div>
            </div>
        </div>
    );
}
