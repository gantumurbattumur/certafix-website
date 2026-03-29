import { MapPin } from "lucide-react";

const areas = [
    "Downtown",
    "Midtown",
    "Uptown",
    "East Side",
    "West Side",
    "North End",
    "South End",
    "Suburbs",
    "Eastside",
    "Northgate",
    "Southgate",
    "Lakewood",
];

export default function ServiceAreas() {
    return (
        <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-forest/10 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center text-forest">
                    <MapPin size={24} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-charcoal">
                    Service Areas
                </h2>
            </div>

            <p className="text-charcoal-light mb-8 text-lg">
                We proudly serve your local area and surrounding neighborhoods. Don&apos;t see
                your neighborhood? Reach out to see if we can accommodate you.
            </p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {areas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 text-charcoal font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber shrink-0"></div>
                        {area}
                    </div>
                ))}
            </div>

            <div className="mt-10 p-6 bg-cream-dark/50 rounded-xl border border-forest/5">
                <p className="text-sm text-charcoal-light italic text-center">
                    &ldquo;The best service I&apos;ve used in the area. Always on time and incredibly thorough.&rdquo;
                    <br />— A happy customer
                </p>
            </div>
        </div>
    );
}
