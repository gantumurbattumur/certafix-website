import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Emily R.",
        location: "Local Customer",
        text: "CertaFix has been an absolute lifesaver. With two kids and a hectic schedule, keeping up at home felt impossible. Their team is thorough, professional, and always leaves things looking amazing.",
        rating: 5,
    },
    {
        name: "David T.",
        location: "Satisfied Client",
        text: "I hired them for a move-out job and was blown away. The attention to detail was incredible. Highly recommend their services to anyone looking for quality work.",
        rating: 5,
    },
    {
        name: "Sarah M.",
        location: "Regular Customer",
        text: "I've used several services in the area, and CertaFix is by far the best. The autobook feature is so convenient, and I love coming home to a perfectly maintained space.",
        rating: 5,
    },
];

export default function Reviews() {
    return (
        <section
            className="py-24 bg-forest text-charcoal relative overflow-hidden"
            id="reviews"
        >
            {/* Decorative background element */}
            <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-forest-light rounded-full opacity-20 blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
                        Loved by Our Customers
                    </h2>
                    <p className="text-lg text-charcoal/70">
                        Don&apos;t just take our word for it. See what your neighbors are saying
                        about our top-rated home services.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-8 hover:bg-white/35 transition-colors"
                        >
                            <div className="flex gap-1 mb-6 text-amber">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>

                            <Quote size={32} className="text-charcoal/20 mb-4" />

                            <p className="text-charcoal text-lg leading-relaxed mb-8 italic">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 bg-amber/20 rounded-full flex items-center justify-center text-amber font-serif font-bold text-xl">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-charcoal">{review.name}</h4>
                                    <p className="text-sm text-charcoal/60">{review.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
