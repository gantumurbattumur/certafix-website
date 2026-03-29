export default function AboutPage() {
    return (
        <>
            {/* Page Hero */}
            <div className="bg-forest py-16 px-4">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-serif font-bold text-charcoal">About CertaFix</h1>
                    <p className="mt-3 text-lg text-charcoal/70">
                        Your trusted local home services company — professional, reliable, and dedicated.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="space-y-6 text-lg text-charcoal-light leading-relaxed">
                    <p>
                        CertaFix is your trusted local home services company, providing
                        professional solutions for every home need. We specialize in
                        HVAC, electrical, plumbing, bathroom remodeling, and general
                        maintenance.
                    </p>

                    <p>
                        Our team of licensed and insured professionals is committed to
                        delivering quality workmanship on every job — big or small. From a
                        simple fix to a full remodel, we treat every project with the same
                        attention to detail.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 py-8">
                        <div className="text-center bg-cream-dark rounded-2xl py-8 px-4">
                            <div className="text-4xl font-serif font-bold text-forest">10+</div>
                            <div className="mt-2 text-sm font-medium text-charcoal-light">Years Experience</div>
                        </div>
                        <div className="text-center bg-forest rounded-2xl py-8 px-4">
                            <div className="text-4xl font-serif font-bold text-charcoal">500+</div>
                            <div className="mt-2 text-sm font-medium text-charcoal/70">Projects Completed</div>
                        </div>
                        <div className="text-center bg-cream-dark rounded-2xl py-8 px-4">
                            <div className="text-4xl font-serif font-bold text-forest">100%</div>
                            <div className="mt-2 text-sm font-medium text-charcoal-light">Satisfaction Guarantee</div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-charcoal pt-4">Why Choose Us?</h2>
                    <ul className="space-y-3">
                        {[
                            "Licensed, bonded, and insured professionals",
                            "Transparent pricing with no hidden fees",
                            "Same-day and emergency services available",
                            "Quality workmanship guaranteed",
                            "Free estimates for larger projects",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-forest shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
