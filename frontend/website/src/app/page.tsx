import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import ServiceAreas from "@/components/ServiceAreas";
import FAQ from "@/components/FAQ";
import HowWeWork from "@/components/HowWeWork";
import Reviews from "@/components/Reviews";

export default function HomePage() {
    return (
        <>
            <Hero />

            <div id="services">
                <ServiceCards />
            </div>

            <section className="py-24 bg-cream" id="areas">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
                        <ServiceAreas />
                        <div id="faq">
                            <FAQ />
                        </div>
                    </div>
                </div>
            </section>

            <HowWeWork />
            <Reviews />
        </>
    );
}
