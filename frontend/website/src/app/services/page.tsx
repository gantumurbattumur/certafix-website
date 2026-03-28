import Link from "next/link";

// This will be fetched from the API in production
const serviceCategories = [
  {
    name: "HVAC",
    slug: "hvac",
    description: "Heating, ventilation, and air conditioning installation, repair, and maintenance.",
    services: [
      { name: "AC Repair", slug: "ac-repair", shortDescription: "Fix your AC fast — same-day service available." },
      { name: "AC Tune-Up", slug: "ac-tune-up", shortDescription: "Preventive maintenance to avoid costly repairs." },
      { name: "Furnace Repair", slug: "furnace-repair", shortDescription: "Stay warm — expert furnace repair services." },
    ],
  },
  {
    name: "Electrical",
    slug: "electrical",
    description: "Electrical wiring, outlet installation, panel upgrades, and lighting.",
    services: [
      { name: "Outlet Installation", slug: "outlet-installation", shortDescription: "New outlets installed safely and to code." },
      { name: "Electrical Panel Upgrade", slug: "panel-upgrade", shortDescription: "Upgrade to a modern, safe electrical panel." },
      { name: "Lighting Installation", slug: "lighting-installation", shortDescription: "Brighten your space with professional lighting." },
    ],
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "Pipe repair, drain cleaning, water heater installation, and fixture replacement.",
    services: [
      { name: "Drain Cleaning", slug: "drain-cleaning", shortDescription: "Clear stubborn clogs for good." },
      { name: "Water Heater Service", slug: "water-heater-service", shortDescription: "Hot water problems solved fast." },
    ],
  },
  {
    name: "Bathroom Remodeling",
    slug: "bathroom",
    description: "Full and partial bathroom renovations, tile work, vanity installation.",
    services: [
      { name: "Full Bathroom Remodel", slug: "full-bathroom-remodel", shortDescription: "Transform your bathroom from start to finish." },
      { name: "Tile Installation", slug: "tile-installation", shortDescription: "Expert tile work for lasting results." },
    ],
  },
  {
    name: "General Maintenance",
    slug: "general-maintenance",
    description: "Drywall repair, painting, door/window installation, and general handyman tasks.",
    services: [
      { name: "Drywall Repair", slug: "drywall-repair", shortDescription: "Seamless drywall patching and repair." },
      { name: "Interior Painting", slug: "interior-painting", shortDescription: "Fresh paint, professional results." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
        <p className="mt-4 text-lg text-gray-600">
          Browse our full range of professional handyman services
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {serviceCategories.map((category) => (
          <section key={category.slug} id={category.slug}>
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
              <p className="mt-1 text-gray-600">{category.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{service.shortDescription}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-blue-700">
                    View Pricing →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
