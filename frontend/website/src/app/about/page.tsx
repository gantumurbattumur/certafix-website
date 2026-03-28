export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900">About CertaFix</h1>

            <div className="mt-8 space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                    CertaFix is your trusted local handyman service, providing
                    professional home repair and improvement solutions. We specialize in
                    HVAC, electrical, plumbing, bathroom remodeling, and general
                    maintenance.
                </p>

                <p>
                    Our team of licensed and insured professionals is committed to
                    delivering quality workmanship on every job — big or small. From a
                    simple outlet installation to a full bathroom remodel, we treat every
                    project with the same attention to detail.
                </p>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 py-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-700">10+</div>
                        <div className="mt-1 text-sm text-gray-500">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-700">500+</div>
                        <div className="mt-1 text-sm text-gray-500">Projects Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-700">100%</div>
                        <div className="mt-1 text-sm text-gray-500">Satisfaction Guarantee</div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">Why Choose Us?</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Licensed, bonded, and insured professionals</li>
                    <li>Transparent pricing with no hidden fees</li>
                    <li>Same-day and emergency services available</li>
                    <li>Quality workmanship guaranteed</li>
                    <li>Free estimates for larger projects</li>
                </ul>
            </div>
        </div>
    );
}
