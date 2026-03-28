import Link from "next/link";

const featuredServices = [
  {
    name: "HVAC",
    description: "Heating, cooling, and ventilation repair & installation.",
    icon: "🌡️",
    href: "/services#hvac",
  },
  {
    name: "Electrical",
    description: "Wiring, outlets, panels, and lighting installation.",
    icon: "⚡",
    href: "/services#electrical",
  },
  {
    name: "Plumbing",
    description: "Drain cleaning, water heaters, and pipe repair.",
    icon: "🔧",
    href: "/services#plumbing",
  },
  {
    name: "Bathroom",
    description: "Full and partial bathroom remodeling.",
    icon: "🛁",
    href: "/services#bathroom",
  },
  {
    name: "General Maintenance",
    description: "Drywall, painting, doors, windows, and more.",
    icon: "🏠",
    href: "/services#general-maintenance",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Your Trusted Local
            <span className="block text-amber-400">Handyman Service</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            From HVAC and electrical to plumbing and bathroom remodeling — we
            handle it all. Licensed, insured, and backed by quality guarantees.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/booking"
              className="rounded-lg bg-amber-500 px-8 py-3 text-lg font-semibold text-gray-900 shadow hover:bg-amber-400 transition"
            >
              Book a Service
            </Link>
            <Link
              href="/quote"
              className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Professional solutions for every home improvement need
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group rounded-xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl">{service.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="text-blue-700 font-semibold hover:text-blue-800 transition-colors"
            >
              View All Services & Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Book online in minutes or request a free estimate. No obligation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/booking"
              className="rounded-lg bg-amber-500 px-8 py-3 text-lg font-semibold text-gray-900 shadow hover:bg-amber-400 transition"
            >
              Book Now
            </Link>
            <Link
              href="/quote"
              className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
