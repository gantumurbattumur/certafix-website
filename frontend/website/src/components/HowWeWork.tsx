import { MousePointerClick, Sparkles, Coffee } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        icon: <MousePointerClick size={32} />,
        title: "1. Book Online",
        description:
            "Select your service, choose a date and time, and get instant pricing. It takes less than 60 seconds.",
    },
    {
        icon: <Sparkles size={32} />,
        title: "2. We Work",
        description:
            "Our vetted, professional team arrives fully equipped and transforms your space with meticulous care.",
    },
    {
        icon: <Coffee size={32} />,
        title: "3. You Relax",
        description:
            "Come home to a perfect result. Enjoy your free time and the peace of mind you deserve.",
    },
];

export default function HowWeWork() {
    return (
        <section
            className="py-24 bg-cream-dark/30 border-y border-forest/5"
            id="how-it-works"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
                        How We Work
                    </h2>
                    <p className="text-lg text-charcoal-light">
                        We&apos;ve streamlined the process so you can get back to what matters
                        most. Simple booking, transparent pricing, and exceptional results.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 bg-forest/20 -z-10"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-cream text-forest mb-8 transform transition-transform group-hover:scale-110 group-hover:border-amber/20 group-hover:text-amber duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                                {step.title}
                            </h3>
                            <p className="text-charcoal-light leading-relaxed max-w-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/booking"
                        className="bg-forest hover:bg-forest-dark text-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    >
                        Start Booking Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
