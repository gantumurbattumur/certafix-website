import { PrismaClient, PriceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Service Categories ──────────────────────────────────

  const hvac = await prisma.serviceCategory.upsert({
    where: { slug: "hvac" },
    update: {},
    create: {
      name: "HVAC",
      slug: "hvac",
      description:
        "Heating, ventilation, and air conditioning installation, repair, and maintenance.",
      sortOrder: 1,
    },
  });

  const electrical = await prisma.serviceCategory.upsert({
    where: { slug: "electrical" },
    update: {},
    create: {
      name: "Electrical",
      slug: "electrical",
      description:
        "Electrical wiring, outlet installation, panel upgrades, and lighting.",
      sortOrder: 2,
    },
  });

  const plumbing = await prisma.serviceCategory.upsert({
    where: { slug: "plumbing" },
    update: {},
    create: {
      name: "Plumbing",
      slug: "plumbing",
      description:
        "Pipe repair, drain cleaning, water heater installation, and fixture replacement.",
      sortOrder: 3,
    },
  });

  const bathroom = await prisma.serviceCategory.upsert({
    where: { slug: "bathroom" },
    update: {},
    create: {
      name: "Bathroom Remodeling",
      slug: "bathroom",
      description:
        "Full and partial bathroom renovations, tile work, vanity installation.",
      sortOrder: 4,
    },
  });

  const general = await prisma.serviceCategory.upsert({
    where: { slug: "general-maintenance" },
    update: {},
    create: {
      name: "General Maintenance",
      slug: "general-maintenance",
      description:
        "Drywall repair, painting, door/window installation, and general handyman tasks.",
      sortOrder: 5,
    },
  });

  // ── HVAC Services ───────────────────────────────────────

  const acRepair = await prisma.service.upsert({
    where: { slug: "ac-repair" },
    update: {},
    create: {
      categoryId: hvac.id,
      name: "AC Repair",
      slug: "ac-repair",
      description:
        "Diagnose and repair air conditioning issues including refrigerant leaks, compressor failures, and thermostat problems.",
      shortDescription: "Fix your AC fast — same-day service available.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: acRepair.id,
        name: "Diagnostic Fee",
        priceType: PriceType.FIXED,
        price: 89.0,
        description: "On-site inspection and diagnosis",
      },
      {
        serviceId: acRepair.id,
        name: "Standard Repair",
        priceType: PriceType.RANGE,
        price: 150.0,
        priceMax: 450.0,
        description: "Parts and labor for common AC repairs",
      },
      {
        serviceId: acRepair.id,
        name: "Emergency Repair",
        priceType: PriceType.STARTING_AT,
        price: 250.0,
        description: "After-hours and weekend emergency service",
      },
    ],
  });

  const acTuneup = await prisma.service.upsert({
    where: { slug: "ac-tune-up" },
    update: {},
    create: {
      categoryId: hvac.id,
      name: "AC Tune-Up",
      slug: "ac-tune-up",
      description:
        "Seasonal maintenance to keep your AC running efficiently. Includes filter replacement, coil cleaning, and refrigerant check.",
      shortDescription: "Preventive maintenance to avoid costly repairs.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: acTuneup.id,
        name: "Single Unit Tune-Up",
        priceType: PriceType.FIXED,
        price: 129.0,
      },
      {
        serviceId: acTuneup.id,
        name: "Dual Unit Tune-Up",
        priceType: PriceType.FIXED,
        price: 219.0,
      },
    ],
  });

  const furnaceRepair = await prisma.service.upsert({
    where: { slug: "furnace-repair" },
    update: {},
    create: {
      categoryId: hvac.id,
      name: "Furnace Repair",
      slug: "furnace-repair",
      description:
        "Gas and electric furnace troubleshooting and repair. We handle ignition issues, blower problems, and heat exchanger repairs.",
      shortDescription: "Stay warm — expert furnace repair services.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: furnaceRepair.id,
        name: "Diagnostic Fee",
        priceType: PriceType.FIXED,
        price: 89.0,
      },
      {
        serviceId: furnaceRepair.id,
        name: "Standard Repair",
        priceType: PriceType.RANGE,
        price: 175.0,
        priceMax: 500.0,
      },
    ],
  });

  // ── Electrical Services ─────────────────────────────────

  const outletInstall = await prisma.service.upsert({
    where: { slug: "outlet-installation" },
    update: {},
    create: {
      categoryId: electrical.id,
      name: "Outlet Installation",
      slug: "outlet-installation",
      description:
        "Install new electrical outlets, GFCI outlets, USB outlets, and 240V outlets for appliances.",
      shortDescription: "New outlets installed safely and to code.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: outletInstall.id,
        name: "Standard Outlet",
        priceType: PriceType.FIXED,
        price: 150.0,
        unit: "per outlet",
      },
      {
        serviceId: outletInstall.id,
        name: "GFCI Outlet",
        priceType: PriceType.FIXED,
        price: 185.0,
        unit: "per outlet",
      },
      {
        serviceId: outletInstall.id,
        name: "240V Outlet",
        priceType: PriceType.FIXED,
        price: 350.0,
        unit: "per outlet",
      },
    ],
  });

  const panelUpgrade = await prisma.service.upsert({
    where: { slug: "panel-upgrade" },
    update: {},
    create: {
      categoryId: electrical.id,
      name: "Electrical Panel Upgrade",
      slug: "panel-upgrade",
      description:
        "Upgrade your electrical panel for more capacity. Essential for older homes and EV charger installations.",
      shortDescription: "Upgrade to a modern, safe electrical panel.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: panelUpgrade.id,
        name: "100 Amp to 200 Amp Upgrade",
        priceType: PriceType.RANGE,
        price: 1800.0,
        priceMax: 3000.0,
      },
      {
        serviceId: panelUpgrade.id,
        name: "Sub-Panel Installation",
        priceType: PriceType.STARTING_AT,
        price: 1200.0,
      },
    ],
  });

  const lightingInstall = await prisma.service.upsert({
    where: { slug: "lighting-installation" },
    update: {},
    create: {
      categoryId: electrical.id,
      name: "Lighting Installation",
      slug: "lighting-installation",
      description:
        "Install ceiling lights, recessed lighting, chandeliers, and outdoor lighting fixtures.",
      shortDescription: "Brighten your space with professional lighting.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: lightingInstall.id,
        name: "Single Fixture Install",
        priceType: PriceType.FIXED,
        price: 125.0,
        unit: "per fixture",
      },
      {
        serviceId: lightingInstall.id,
        name: "Recessed Lighting (6-pack)",
        priceType: PriceType.STARTING_AT,
        price: 800.0,
      },
    ],
  });

  // ── Plumbing Services ───────────────────────────────────

  const drainCleaning = await prisma.service.upsert({
    where: { slug: "drain-cleaning" },
    update: {},
    create: {
      categoryId: plumbing.id,
      name: "Drain Cleaning",
      slug: "drain-cleaning",
      description:
        "Professional drain cleaning using snaking and hydro-jetting for kitchen, bathroom, and main line drains.",
      shortDescription: "Clear stubborn clogs for good.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: drainCleaning.id,
        name: "Single Drain Clearing",
        priceType: PriceType.FIXED,
        price: 175.0,
      },
      {
        serviceId: drainCleaning.id,
        name: "Main Line Cleaning",
        priceType: PriceType.RANGE,
        price: 250.0,
        priceMax: 500.0,
      },
    ],
  });

  const waterHeater = await prisma.service.upsert({
    where: { slug: "water-heater-service" },
    update: {},
    create: {
      categoryId: plumbing.id,
      name: "Water Heater Service",
      slug: "water-heater-service",
      description:
        "Water heater installation, repair, and replacement. We work with tank and tankless systems.",
      shortDescription: "Hot water problems solved fast.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: waterHeater.id,
        name: "Repair / Troubleshooting",
        priceType: PriceType.HOURLY,
        price: 95.0,
        unit: "per hour",
      },
      {
        serviceId: waterHeater.id,
        name: "Tank Water Heater Install",
        priceType: PriceType.RANGE,
        price: 1200.0,
        priceMax: 2000.0,
      },
      {
        serviceId: waterHeater.id,
        name: "Tankless Water Heater Install",
        priceType: PriceType.RANGE,
        price: 2500.0,
        priceMax: 4000.0,
      },
    ],
  });

  // ── Bathroom Services ───────────────────────────────────

  const bathroomFull = await prisma.service.upsert({
    where: { slug: "full-bathroom-remodel" },
    update: {},
    create: {
      categoryId: bathroom.id,
      name: "Full Bathroom Remodel",
      slug: "full-bathroom-remodel",
      description:
        "Complete bathroom renovation including demo, plumbing, tile, vanity, toilet, and fixtures.",
      shortDescription: "Transform your bathroom from start to finish.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: bathroomFull.id,
        name: "Standard Remodel",
        priceType: PriceType.RANGE,
        price: 8000.0,
        priceMax: 15000.0,
        description: "Standard fixtures and finishes",
      },
      {
        serviceId: bathroomFull.id,
        name: "Premium Remodel",
        priceType: PriceType.STARTING_AT,
        price: 15000.0,
        description: "High-end fixtures and custom tile work",
      },
    ],
  });

  const tileWork = await prisma.service.upsert({
    where: { slug: "tile-installation" },
    update: {},
    create: {
      categoryId: bathroom.id,
      name: "Tile Installation",
      slug: "tile-installation",
      description:
        "Floor and wall tile installation for bathrooms, showers, and backsplashes.",
      shortDescription: "Expert tile work for lasting results.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: tileWork.id,
        name: "Floor Tile",
        priceType: PriceType.STARTING_AT,
        price: 12.0,
        unit: "per sq ft",
      },
      {
        serviceId: tileWork.id,
        name: "Shower/Tub Surround",
        priceType: PriceType.RANGE,
        price: 1500.0,
        priceMax: 3500.0,
      },
    ],
  });

  // ── General Maintenance Services ────────────────────────

  const drywallRepair = await prisma.service.upsert({
    where: { slug: "drywall-repair" },
    update: {},
    create: {
      categoryId: general.id,
      name: "Drywall Repair",
      slug: "drywall-repair",
      description:
        "Patch holes, fix cracks, and repair water-damaged drywall. Includes texturing and priming.",
      shortDescription: "Seamless drywall patching and repair.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: drywallRepair.id,
        name: "Small Patch (up to 6\")",
        priceType: PriceType.FIXED,
        price: 95.0,
      },
      {
        serviceId: drywallRepair.id,
        name: "Large Repair",
        priceType: PriceType.HOURLY,
        price: 75.0,
        unit: "per hour",
      },
    ],
  });

  const painting = await prisma.service.upsert({
    where: { slug: "interior-painting" },
    update: {},
    create: {
      categoryId: general.id,
      name: "Interior Painting",
      slug: "interior-painting",
      description:
        "Professional interior painting for rooms, trim, ceilings, and accent walls.",
      shortDescription: "Fresh paint, professional results.",
    },
  });

  await prisma.servicePrice.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceId: painting.id,
        name: "Single Room",
        priceType: PriceType.RANGE,
        price: 300.0,
        priceMax: 600.0,
        description: "Standard room up to 12x12",
      },
      {
        serviceId: painting.id,
        name: "Trim / Baseboard Painting",
        priceType: PriceType.HOURLY,
        price: 65.0,
        unit: "per hour",
      },
    ],
  });

  console.log("✅ Seed data created successfully!");
  console.log(
    `   Categories: ${[hvac, electrical, plumbing, bathroom, general].length}`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
